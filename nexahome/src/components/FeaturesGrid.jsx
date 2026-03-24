import React from 'react'

const FeaturesGrid = ({ features }) => {
    return (
        <section id="features" className="mx-auto w-full max-w-[1240px] px-10 py-20 lg:py-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#00d4ff]">Platform features</p>
            <h2 className="mb-12 text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.05] tracking-tight text-white">Built for real smart homes.<br />Not just demos.</h2>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
                {features.map((f) => (
                    <div key={f.title} className={`bg-[#0d1120] p-7 hover:bg-[#131929] ${f.wide ? 'md:col-span-2' : ''}`}>
                        <h3 className="mb-2 text-base font-semibold text-white lg:text-lg">{f.title}</h3>
                        <p className="text-sm leading-relaxed text-[#9aa3be] lg:text-base">{f.desc}</p>
                        <span className="mt-3 inline-block rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-2 py-1 text-xs font-semibold text-[#00d4ff]">{f.tag}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturesGrid
