"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const screenshots = [
    "/images/mobile/Screenshot_20260408_201953.png",
    "/images/mobile/Screenshot_20260408_204711.png",
    "/images/mobile/Screenshot_20260408_204657.png",
    "/images/mobile/Screenshot_20260408_204638.png",
]

export function PhoneMockup() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % screenshots.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative mx-auto border-gray-800 bg-black border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

            <div className="relative flex-1 overflow-hidden bg-black">
                {screenshots.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Captura mobile ${index + 1}`}
                        fill
                        sizes="300px"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${current === index ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent z-10" />

                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                    {screenshots.map((_, index) => (
                        <span
                            key={`dot-${index}`}
                            className={`w-2 h-2 rounded-full transition-all ${current === index ? "bg-white w-4" : "bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Screen Line */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20"></div>
        </div>
    )
}
