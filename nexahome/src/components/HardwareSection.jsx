import React from 'react'

const HardwareSection = ({ hardware }) => {
    return (
        <section id="devices" className="mx-auto w-full max-w-[1240px] px-10 py-20 lg:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_430px] lg:items-center">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#00d4ff]">Compatible hardware</p>
                    <h2 className="mb-6 text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.05] tracking-tight text-white">If it connects to WiFi,<br />it connects to NexaHome.</h2>
                    <p className="max-w-[560px] text-base leading-relaxed text-[#9aa3be]">
                        NexaHome works with the small, affordable WiFi controller chips that makers and engineers use to build smart devices - the same chips inside smart plugs, automated irrigation systems, and DIY home automation projects.
                    </p>
                    <div className="mt-5 rounded-xl border border-white/[0.08] bg-[#131929] px-4 py-3 font-mono text-xs leading-6 text-[#9aa3be]">
                        <p className="text-[#6b7a9e]">// Three lines to connect any device</p>
                        <p><span className="text-[#7cb9ff]">#define</span> DEVICE_KEY  <span className="text-[#a8e6a3]">"nx_a3f9b2c1d4..."</span></p>
                        <p><span className="text-[#7cb9ff]">#define</span> WIFI_SSID   <span className="text-[#a8e6a3]">"YourHomeWiFi"</span></p>
                        <p><span className="text-[#7cb9ff]">#define</span> WIFI_PASS   <span className="text-[#a8e6a3]">"yourpassword"</span></p>
                        <p className="text-[#6b7a9e]">// Thats it. Flash and its live.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-2">
                    {hardware.map((h) => (
                        <div key={h.title} className="rounded-xl border border-white/[0.08] bg-[#131929] p-4 text-center hover:border-[#00d4ff]/35">
                            <div className="mb-1 h-6" />
                            <h3 className="mb-1 text-sm font-semibold text-white">{h.title}</h3>
                            <p className="text-xs text-[#6b7a9e]">{h.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HardwareSection
