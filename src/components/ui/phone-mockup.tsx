"use client"

import { Bell, Search, Plus, MessageSquare, User, MapPin } from "lucide-react"

export function PhoneMockup() {
    return (
        <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

            {/* Content Container */}
            <div className="flex-1 bg-[#0f121a] text-white p-4 pt-10 flex flex-col font-sans relative overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-[10px] text-gray-400 font-semibold tracking-wider">UBICACIÓN ACTUAL</p>
                        <div className="flex items-center gap-1">
                            <h3 className="font-bold text-sm">Mendoza, AR</h3>
                            <MapPin className="w-3 h-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-full">
                        <Bell className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white whitespace-nowrap">Fútbol</span>
                    <span className="px-3 py-1 rounded-full bg-transparent border border-white/10 text-xs font-medium text-gray-400 whitespace-nowrap">Pádel</span>
                    <span className="px-3 py-1 rounded-full bg-transparent border border-white/10 text-xs font-medium text-gray-400 whitespace-nowrap">Tenis</span>
                </div>

                {/* Card 1: Padel */}
                <div className="bg-[#1a1f2e] p-3 rounded-2xl mb-3 relative group">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <span className="text-xs">🎾</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Pádel - Dobles</h4>
                                <p className="text-[10px] text-gray-400">Club El Muro • 1.2km</p>
                            </div>
                        </div>
                        <span className="bg-blue-500/20 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Amistoso</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex -space-x-1.5">
                            <div className="w-5 h-5 rounded-full bg-gray-600 border border-[#1a1f2e]"></div>
                            <div className="w-5 h-5 rounded-full bg-gray-500 border border-[#1a1f2e]"></div>
                            <div className="w-5 h-5 rounded-full bg-gray-700 border border-[#1a1f2e] flex items-center justify-center text-[8px] text-white font-medium">+1</div>
                        </div>
                        <button className="bg-primary text-black text-[10px] font-bold px-3 py-1 rounded-full hover:bg-primary/90">
                            Unirse
                        </button>
                    </div>
                </div>

                {/* Card 2: Futbol */}
                <div className="bg-[#1a1f2e] p-3 rounded-2xl mb-3 relative">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                                <span className="text-xs">⚽</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Fútbol 5</h4>
                                <p className="text-[10px] text-gray-400">Cancha Norte • 0.5km</p>
                            </div>
                        </div>
                        <span className="bg-yellow-500/20 text-yellow-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Mixto</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full w-3/4"></div>
                    </div>
                    <p className="text-[9px] text-gray-400 mt-1 text-right">8/10 Jugadores</p>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f121a] to-transparent pointer-events-none z-0"></div>

            </div>

            {/* Bottom Nav */}
            <div className="bg-[#141824] p-2 pb-4 flex justify-between items-center px-6 relative z-10">
                <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-500">
                    <div className="w-5 h-5 bg-current rounded-full" />
                    {/* Simplified Home Icon */}
                </div>
                <Search className="w-5 h-5 text-gray-500" />
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform -translate-y-2 border-4 border-[#0f121a]">
                    <Plus className="w-5 h-5 text-white" />
                </div>
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <User className="w-5 h-5 text-gray-500" />
            </div>

            {/* Screen Line */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20"></div>
        </div>
    )
}
