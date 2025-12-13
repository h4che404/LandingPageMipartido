"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type Mode = "amistoso" | "competitivo"
type ColorScheme = "light" | "dark" | "system"

interface ThemeContextType {
    mode: Mode
    setMode: (mode: Mode) => void
    colorScheme: ColorScheme
    setColorScheme: (scheme: ColorScheme) => void
    resolvedColorScheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        // Return safe defaults for SSR/SSG
        return {
            mode: "amistoso" as Mode,
            setMode: () => { },
            colorScheme: "system" as ColorScheme,
            setColorScheme: () => { },
            resolvedColorScheme: "dark" as const
        }
    }
    return context
}

interface ThemeProviderProps {
    children: ReactNode
    defaultMode?: Mode
    defaultColorScheme?: ColorScheme
}

export function ThemeProvider({
    children,
    defaultMode = "amistoso",
    defaultColorScheme = "system"
}: ThemeProviderProps) {
    const [mode, setModeState] = useState<Mode>(defaultMode)
    const [colorScheme, setColorSchemeState] = useState<ColorScheme>(defaultColorScheme)
    const [resolvedColorScheme, setResolvedColorScheme] = useState<"light" | "dark">("dark")
    const [mounted, setMounted] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const storedMode = localStorage.getItem("theme-mode") as Mode | null
        const storedColorScheme = localStorage.getItem("theme-color-scheme") as ColorScheme | null

        if (storedMode) setModeState(storedMode)
        if (storedColorScheme) setColorSchemeState(storedColorScheme)

        setMounted(true)
    }, [])

    // Resolve system preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const updateResolvedScheme = () => {
            if (colorScheme === "system") {
                setResolvedColorScheme(mediaQuery.matches ? "dark" : "light")
            } else {
                setResolvedColorScheme(colorScheme)
            }
        }

        updateResolvedScheme()
        mediaQuery.addEventListener("change", updateResolvedScheme)

        return () => mediaQuery.removeEventListener("change", updateResolvedScheme)
    }, [colorScheme])

    // Apply classes to <html>
    useEffect(() => {
        if (!mounted) return

        const root = document.documentElement

        // Color scheme
        root.classList.remove("light", "dark")
        root.classList.add(resolvedColorScheme)
        root.style.colorScheme = resolvedColorScheme

        // Mode
        root.classList.remove("mode-amistoso", "mode-competitivo")
        if (mode === "competitivo") {
            root.classList.add("mode-competitivo")
        }
    }, [mode, resolvedColorScheme, mounted])

    const setMode = (newMode: Mode) => {
        setModeState(newMode)
        localStorage.setItem("theme-mode", newMode)
    }

    const setColorScheme = (newScheme: ColorScheme) => {
        setColorSchemeState(newScheme)
        localStorage.setItem("theme-color-scheme", newScheme)
    }

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div style={{ visibility: "hidden" }}>
                {children}
            </div>
        )
    }

    return (
        <ThemeContext.Provider value={{ mode, setMode, colorScheme, setColorScheme, resolvedColorScheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
