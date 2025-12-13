
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

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

    if (analytics) {
        logEvent(analytics, name, properties);
    }
}
