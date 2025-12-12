import { NextResponse } from "next/server"
import { waitlistSchema } from "@/lib/schemas"
import { getDb } from "@/lib/firebase-admin"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { headers } from "next/headers"

// Initialize Rate Limiter
// If env vars are missing, this might throw or fail gracefully depending on setup.
// We'll wrap in a try-catch or conditional.
let ratelimit: Ratelimit | null = null

try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        ratelimit = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per minute per IP
            analytics: true,
        })
    }
} catch (e) {
    console.warn("Rate limit setup failed", e)
}

export async function POST(req: Request) {
    try {
        // 1. Rate Check
        if (ratelimit) {
            const headersList = headers()
            const ip = (await headersList).get("x-forwarded-for") || "127.0.0.1"
            const { success } = await ratelimit.limit(ip)
            if (!success) {
                return NextResponse.json({ error: "Too many requests" }, { status: 429 })
            }
        }

        // 2. Parse & Validate
        const body = await req.json()
        const data = waitlistSchema.parse(body)

        // 3. Honeypot Check
        if (data._hp) {
            // Silently fail (pretend success) to fool bots
            return NextResponse.json({ success: true })
        }

        // Remove hp field from data to store
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _hp, ...leadData } = data

        // 4. Save to Firestore
        try {
            const db = getDb() // This throws if no keys
            await db.collection("waitlist_leads").add({
                ...leadData,
                createdAt: new Date(),
                userAgent: (await headers()).get("user-agent"),
                source: "landing_v1"
            })
        } catch (error) {
            console.error("Firestore error:", error)
            // If it fails because of missing keys in Dev, just log it.
            // In Prod, this is a 500.
            if (process.env.NODE_ENV === "development") {
                return NextResponse.json({ success: true, mock: true, message: "Mock saved (No DB keys)" })
            }
            return NextResponse.json({ error: "Database error" }, { status: 500 })
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Validation failed", details: (error as z.ZodError).errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
