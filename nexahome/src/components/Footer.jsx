import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="border-t border-white/[0.08] px-10 py-16 lg:py-20">
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-14">
                <div>
                    <div className="mb-4 flex items-center gap-3 text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4ff] text-xs font-bold text-[#06080f]">N</span>
                        <span className="text-2xl font-semibold">Nexa</span>
                        <span className="text-2xl font-semibold text-[#00d4ff]">Home</span>
                    </div>
                    <p className="max-w-[360px] text-base leading-relaxed text-[#6b7a9e]">Connect your smart devices to one platform. Control them from anywhere, on any screen, at any time.</p>
                </div>

                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">Platform</h4>
                    <ul className="space-y-4 text-base text-[#6b7a9e]">
                        <li><Link to="/dashboard" className="hover:text-cyan-500 transition-colors">Dashboard</Link></li>
                        <li><Link to="/devices" className="hover:text-cyan-500 transition-colors">My Devices</Link></li>
                        <li><Link to="/schedules" className="hover:text-cyan-500 transition-colors">Schedules</Link></li>
                        <li><Link to="/logs" className="hover:text-cyan-500 transition-colors">Activity Log</Link></li>
                        <li><Link to="/credentials" className="hover:text-cyan-500 transition-colors">Live Signals</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">Developers</h4>
                    <ul className="space-y-4 text-base text-[#6b7a9e]">
                        <li>Documentation</li>
                        <li>Firmware guide</li>
                        <li>REST API</li>
                        <li>Device topics</li>
                        <li>GitHub</li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 text-lg font-semibold text-white">Support</h4>
                    <ul className="space-y-4 text-base text-[#6b7a9e]">
                        <li>Getting started</li>
                        <li>Connecting devices</li>
                        <li>Troubleshooting</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-6">
                <p className="text-sm text-[#6b7a9e]">© 2025 NexaHome - Smart home platform for everyone.</p>
                <div className="flex gap-2">
                    {['React', 'PHP 8', 'MySQL', 'MQTT'].map((t) => (
                        <span key={t} className="rounded-full border border-white/[0.12] px-2.5 py-1 text-xs text-[#6b7a9e]">{t}</span>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
