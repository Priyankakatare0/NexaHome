import React from 'react'

const HowItWorks = ({ steps }) => {
    return (
        <section id="how" className="mx-auto w-full max-w-[1240px] bg-[#06080f] px-10 py-20 lg:py-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#00d4ff]">How it works</p>
            <h2 className="mb-12 text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.05] tracking-tight text-white">From setup to control<br />in under 15 minutes.</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                    {steps.map((step) => (
                        <div key={step.num} className="flex gap-4 border-b border-white/[0.07] pb-5">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] text-xs font-bold text-[#00d4ff]">{step.num}</div>
                            <div>
                                <h3 className="mb-1 text-base font-semibold text-white">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-[#9aa3be]">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-white/[0.1] bg-[#0d1120] p-5 lg:p-7">
                    {[
                        ['You tap Turn ON in the app', 'Works on any browser - mobile or desktop', '#00d4ff'],
                        ['NexaHome records the command', 'State saved, activity log updated', '#8490ff'],
                        ['Message sent to your device', 'Instant delivery via MQTT protocol', '#ffb800'],
                        ['Device acts immediately', 'Light turns on. Pump starts. Door opens.', '#00e5a0'],
                    ].map((item) => (
                        <div key={item[0]} className="mb-2 rounded-xl border border-white/[0.08] bg-[#131929] p-3 last:mb-0">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 h-7 w-7 shrink-0 rounded-lg" style={{ backgroundColor: `${item[2]}1f` }} />
                                <div>
                                    <p className="text-sm font-medium text-white">{item[0]}</p>
                                    <p className="text-xs text-[#6b7a9e]">{item[1]}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
