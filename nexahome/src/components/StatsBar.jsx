import React from 'react'

const StatsBar = () => {
    return (
        <div className="grid grid-cols-2 gap-px border-y border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
            {[
                { val: '<1s', label: 'Command response time' },
                { val: '24/7', label: 'Always-on device monitoring' },
                { val: 'Any', label: 'WiFi device - plug and control' },
                { val: '100%', label: 'Your data, your platform' },
            ].map((s) => (
                <div key={s.label} className="bg-[#06080f] px-5 py-8 text-center lg:px-10 lg:py-9">
                    <div className="text-4xl font-bold text-[#00d4ff] lg:text-[40px]">{s.val}</div>
                    <div className="mt-1 text-xs text-[#9aa3be] lg:text-[13px]">{s.label}</div>
                </div>
            ))}
        </div>
    )
}

export default StatsBar
