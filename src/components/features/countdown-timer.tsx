"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Target date: 2 weeks from March 9th, 2026
const TARGET_DATE = new Date("2026-03-23T12:00:00-03:00").getTime()

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)

        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const difference = TARGET_DATE - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [])

    if (!isMounted) return null

    const timeUnits = [
        { label: "Días", value: timeLeft.days },
        { label: "Horas", value: timeLeft.hours },
        { label: "Minutos", value: timeLeft.minutes },
        { label: "Seg", value: timeLeft.seconds },
    ]

    return (
        <div className="flex flex-col gap-4 mt-8">
            <div className="text-sm font-bold text-primary uppercase tracking-widest">
                Gran lanzamiento en
            </div>
            <div className="flex gap-3 sm:gap-4">
                {timeUnits.map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-card border border-border rounded-2xl shadow-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <motion.div
                                key={unit.value}
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-2xl sm:text-4xl font-black font-mono text-foreground"
                            >
                                {unit.value.toString().padStart(2, "0")}
                            </motion.div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            {unit.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
