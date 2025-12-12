"use client"

// Minimal Analytics Abstraction
// In the future, replace console.log with window.gtag() or posthog.capture()

type EventName =
    | "view_landing"
    | "click_cta_player"
    | "click_cta_venue"
    | "submit_waitlist_start"
    | "submit_waitlist_success"
    | "click_social_toggle"

export function trackEvent(name: EventName, properties?: Record<string, any>) {
    if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] ${name}`, properties)
    }

    // Example for GA4:
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', name, properties)
    // }
}
