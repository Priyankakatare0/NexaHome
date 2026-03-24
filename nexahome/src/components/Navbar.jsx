import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/[0.08] bg-[#06080f]/80 px-10 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4ff] text-base font-bold text-[#06080f]">N</div>
                <div className="text-2xl font-bold tracking-tight">Nexa<span className="text-[#00d4ff]">Home</span></div>
            </div>

            <ul className="hidden items-center gap-9 md:flex">
                <li><a href="#features" className="text-base text-[#9aa3be] hover:text-white">Features</a></li>
                <li><a href="#how" className="text-base text-[#9aa3be] hover:text-white">How it works</a></li>
                <li><a href="#devices" className="text-base text-[#9aa3be] hover:text-white">Devices</a></li>
                <li><a href="#schedule" className="text-base text-[#9aa3be] hover:text-white">Scheduler</a></li>
            </ul>

            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/login')} className="rounded-lg border border-white/[0.14] px-4 py-2 text-base text-[#9aa3be] hover:text-white">Log in</button>
                <button onClick={() => navigate('/register')} className="rounded-lg bg-[#00d4ff] px-4 py-2 text-base font-bold text-[#06080f] hover:opacity-90">Create account</button>
            </div>
        </nav>
    )
}

export default Navbar
