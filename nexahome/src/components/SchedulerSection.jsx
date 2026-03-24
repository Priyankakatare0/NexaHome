import React from 'react'

const SchedulerSection = ({ schedules }) => {
    return (
        <section id="schedule" className="mx-auto w-full max-w-[1240px] px-10 py-20 lg:py-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#00d4ff]">Smart scheduler</p>
            <h2 className="mb-4 text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.05] tracking-tight text-white">Set it once.<br />Let NexaHome handle the rest.</h2>
            <p className="mb-10 max-w-[680px] text-base leading-relaxed text-[#9aa3be]">
                Create time-based rules for any device. Pick the days, set the time, choose ON or OFF - NexaHome runs it automatically, every single day.
            </p>

            <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d1120] p-4 lg:p-6">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">Active schedules</h3>
                    <button className="rounded-md border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-3 py-1 text-sm font-semibold text-[#00d4ff]">+ Add new rule</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                        <thead>
                            <tr className="text-left text-xs uppercase tracking-wide text-[#6b7a9e]">
                                <th className="px-3 py-2 font-semibold">Device</th>
                                <th className="px-3 py-2 font-semibold">Time</th>
                                <th className="px-3 py-2 font-semibold">Days</th>
                                <th className="px-3 py-2 font-semibold">Action</th>
                                <th className="px-3 py-2 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((row) => (
                                <tr key={row.name} className="border-t border-white/[0.06] text-sm">
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2 text-white">
                                            <span className={`h-2 w-2 rounded-full ${row.dot}`} />
                                            {row.name}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-[#9aa3be]">{row.time}</td>
                                    <td className="px-3 py-3">
                                        <div className="flex gap-1">
                                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => (
                                                <span key={`${row.name}-${d}-${idx}`} className={`flex h-4 w-4 items-center justify-center rounded text-[10px] ${idx < 5 || row.name !== 'Garden Pump' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'bg-[#1a2236] text-[#6b7a9e]'}`}>{d}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${row.action === 'ON' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'}`}>{row.action}</span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${row.status === 'Active' ? 'bg-[#00d4ff]/15 text-[#00d4ff]' : 'bg-amber-400/15 text-amber-300'}`}>{row.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default SchedulerSection
