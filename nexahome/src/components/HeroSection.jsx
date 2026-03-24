import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative mx-auto w-full max-w-[1240px] overflow-hidden px-10 pb-20 pt-20 text-center lg:pt-28">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,black_40%,transparent_100%)]" />
            <div className="pointer-events-none absolute -top-24 left-[10%] h-[500px] w-[500px] rounded-full bg-[#00d4ff]/20 blur-[90px]" />
            <div className="pointer-events-none absolute right-[5%] top-0 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[90px]" />

            <div className="relative z-10 mb-8 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-4 py-1.5 text-xs uppercase tracking-[0.5px] text-[#00d4ff]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00d4ff]" />
                Your personal smart home cloud
            </div>

            <h1 className="relative z-10 mb-6 text-[clamp(42px,6vw,76px)] font-bold leading-[1.04] tracking-[-2px] text-white">
                Control every device
                <br />
                <span className="text-[#00d4ff]">from one place.</span>
            </h1>

            <p className="relative z-10 mx-auto mb-10 max-w-[620px] text-[clamp(16px,1.6vw,20px)] leading-relaxed text-[#9aa3be]">
                NexaHome lets you connect your smart switches, sensors, lights and motors to a single dashboard. Control them from your phone, schedule them automatically, and monitor everything in real time.
            </p>

            <div className="relative z-10 flex flex-wrap justify-center gap-3">
                <button onClick={() => navigate('/register')} className="rounded-[10px] bg-[#00d4ff] px-7 py-3 text-base font-bold text-[#06080f] hover:-translate-y-0.5">Open dashboard</button>
                <button onClick={() => navigate('/register')} className="rounded-[10px] border border-white/[0.14] px-7 py-3 text-base font-medium text-white hover:-translate-y-0.5">Add your first device</button>
            </div>

            <div className="relative z-10 mx-auto mt-14 max-w-[980px] overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#0d1120] shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
                <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#131929] px-5 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <div className="ml-3 rounded bg-[#1a2236] px-4 py-1 text-[11px] text-[#6b7a9e]">nexahome.app/dashboard</div>
                </div>

                <div className="grid h-[430px] grid-cols-1 lg:grid-cols-[220px_1fr]">
                    <aside className="hidden border-r border-white/[0.08] bg-[#131929] p-4 lg:flex lg:flex-col">
                        <div className="mb-6 flex items-center gap-2 px-2 text-base font-semibold text-white">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#00d4ff] text-xs font-bold text-[#06080f]">N</div>
                            NexaHome
                        </div>
                        <div className="space-y-1 text-sm text-[#6b7a9e]">
                            <div className="rounded-md bg-[#00d4ff]/10 px-3 py-2 text-[#00d4ff]">Dashboard</div>
                            <div className="rounded-md px-3 py-2">My Devices</div>
                            <div className="rounded-md px-3 py-2">Schedules</div>
                            <div className="rounded-md px-3 py-2">Activity Log</div>
                            <div className="rounded-md px-3 py-2">Live Signals</div>
                        </div>
                        <div className="mt-auto rounded-md px-3 py-2 text-sm text-[#6b7a9e]">Account</div>
                    </aside>

                    <div className="p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-white">Good evening, Arjun</h3>
                        <p className="mb-4 text-xs text-[#6b7a9e]">Saturday, 21 March 2026 - 3 devices currently active</p>

                        <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
                            {[
                                ['Devices', '12', '9 online'],
                                ['Active now', '3', 'Running'],
                                ['Schedules', '7', '2 today'],
                                ['Uptime', '99%', 'All good'],
                            ].map((card) => (
                                <div key={card[0]} className="rounded-lg border border-white/[0.08] bg-[#131929] p-3 text-left">
                                    <p className="text-xs text-[#6b7a9e]">{card[0]}</p>
                                    <p className="text-xl font-semibold text-white">{card[1]}</p>
                                    <span className="rounded-full bg-[#00d4ff]/10 px-2 py-0.5 text-xs font-semibold text-[#00d4ff]">{card[2]}</span>
                                </div>
                            ))}
                        </div>

                        <p className="mb-2 text-xs tracking-wide text-[#9aa3be]">QUICK CONTROLS</p>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                            {[
                                ['Living Room Light', true],
                                ['AC Bedroom', false],
                                ['Water Pump', true],
                            ].map((d) => (
                                <div key={d[0]} className={`rounded-lg border p-3 text-left ${d[1] ? 'border-[#00d4ff]/30 bg-[#1a2236]' : 'border-white/[0.08] bg-[#1a2236]'}`}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="h-7 w-7 rounded bg-[#00d4ff]/10" />
                                        <span className={`relative h-4 w-8 rounded-full ${d[1] ? 'bg-[#00d4ff]' : 'bg-[#131929]'}`}>
                                            <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white ${d[1] ? 'right-0.5' : 'left-0.5'}`} />
                                        </span>
                                    </div>
                                    <p className="text-xs text-white">{d[0]}</p>
                                    <p className="text-xs text-[#6b7a9e]">Online</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
