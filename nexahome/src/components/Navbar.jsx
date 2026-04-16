import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    // Smooth scroll handler
    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/[0.08] bg-[#06080f]/80 px-10 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4ff] text-base font-bold text-[#06080f]">N</div>
                <div className="text-2xl font-bold tracking-tight">Nexa<span className="text-[#00d4ff]">Home</span></div>
            </div>

            <ul className="hidden items-center gap-9 md:flex">
                <li><button onClick={() => handleScroll('features')} className="text-base text-[#9aa3be] hover:text-white bg-transparent border-none outline-none cursor-pointer">Features</button></li>
                <li><button onClick={() => handleScroll('how')} className="text-base text-[#9aa3be] hover:text-white bg-transparent border-none outline-none cursor-pointer">How it works</button></li>
                <li><button onClick={() => handleScroll('devices')} className="text-base text-[#9aa3be] hover:text-white bg-transparent border-none outline-none cursor-pointer">Devices</button></li>
                <li><button onClick={() => handleScroll('schedule')} className="text-base text-[#9aa3be] hover:text-white bg-transparent border-none outline-none cursor-pointer">Scheduler</button></li>
            </ul>

            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/login')} className="rounded-lg border border-white/[0.14] px-4 py-2 text-base text-[#9aa3be] hover:text-white">Log in</button>
                <button onClick={() => navigate('/register')} className="rounded-lg bg-[#00d4ff] px-4 py-2 text-base font-bold text-[#06080f] hover:opacity-90">Create account</button>
            </div>
        </nav>
    )
}

export default Navbar
