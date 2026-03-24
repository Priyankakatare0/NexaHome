import React from 'react'
import { useNavigate } from 'react-router-dom'

const CTASection = () => {
    const navigate = useNavigate()

    return (
        <section id="join" className="mx-auto w-full max-w-[1240px] px-10 py-20 lg:py-24">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d1120] p-8 text-center lg:p-16">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d4ff]/10 blur-[100px]" />
                <h2 className="relative mb-4 text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.05] tracking-tight text-white">Start controlling your<br />home today.</h2>
                <p className="relative mx-auto mb-8 max-w-[560px] text-base leading-relaxed text-[#9aa3be]">Create your account, connect your first device, and see it respond from your phone - all within 15 minutes.</p>
                <div className="relative flex flex-wrap justify-center gap-3">
                    <button onClick={() => navigate('/register')} className="rounded-lg bg-[#00d4ff] px-6 py-2.5 text-base font-bold text-[#06080f] hover:-translate-y-0.5">Create free account</button>
                    <button className="rounded-lg border border-white/[0.14] px-6 py-2.5 text-base font-medium text-white hover:-translate-y-0.5">Read the docs</button>
                </div>
            </div>
        </section>
    )
}

export default CTASection
