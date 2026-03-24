import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import StatsBar from '../components/StatsBar'
import HowItWorks from '../components/HowItWorks'
import FeaturesGrid from '../components/FeaturesGrid'
import HardwareSection from '../components/HardwareSection'
import SchedulerSection from '../components/SchedulerSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const features = [
    {
        title: 'Live dashboard',
        desc: 'See every device status in real time. Toggle any switch with one tap. Last-seen timestamps tell you exactly when each device was active.',
        tag: 'Real-time',
        wide: false,
    },
    {
        title: 'Secure login',
        desc: 'Each account is protected with encrypted credentials. Every device has its own private key - only your account can send it commands.',
        tag: 'Encrypted',
        wide: false,
    },
    {
        title: 'Smart scheduler',
        desc: 'Set automated routines - turn on the lights at sunrise, shut down the water pump on weekends, run the AC before you arrive home.',
        tag: 'Automated',
        wide: false,
    },
    {
        title: 'Instant messaging between app and device',
        desc: 'NexaHome uses MQTT - a lightweight messaging protocol. When you tap a button, the message reaches your device in milliseconds, even on slow mobile data.',
        tag: 'MQTT protocol',
        wide: true,
    },
    {
        title: 'Activity history',
        desc: 'Every command is recorded with a timestamp - who triggered it, whether it came from you or a schedule.',
        tag: 'Full audit trail',
        wide: false,
    },
    {
        title: 'Works on every screen',
        desc: 'The dashboard is built as a web app - open it on your phone, tablet, laptop, or TV browser. No app store downloads required.',
        tag: 'All devices',
        wide: false,
    },
]

const steps = [
    {
        num: '01',
        title: 'Create your account',
        desc: 'Sign up and land on your personal dashboard. Everything is organized by your account - your devices, your schedules, your data.',
    },
    {
        num: '02',
        title: 'Register a device',
        desc: 'Name your device and choose its type - smart switch, sensor, dimmer, or motor. NexaHome generates a unique connection key for it instantly.',
    },
    {
        num: '03',
        title: 'Connect your hardware',
        desc: 'Paste your device key into the provided firmware code and upload it to your WiFi controller chip. It connects to NexaHome automatically.',
    },
    {
        num: '04',
        title: 'Control from anywhere',
        desc: 'Toggle, schedule, and monitor from any phone, tablet, or computer. One tap - your device responds in under a second.',
    },
]

const hardware = [
    { title: 'WiFi Switch Chip', sub: 'Most popular DIY IoT controller' },
    { title: 'Advanced Controller', sub: 'WiFi + Bluetooth built-in' },
    { title: 'Arduino + WiFi', sub: 'Classic board with WiFi module' },
    { title: 'Raspberry Pi', sub: 'Full Linux computer on board' },
    { title: 'Smart Relay Module', sub: 'Controls high-power appliances' },
    { title: 'Sensor Modules', sub: 'Temperature, motion, soil, gas' },
]

const schedules = [
    { name: 'Living Room Light', time: '06:30 AM', action: 'ON', status: 'Active', dot: 'bg-cyan-400' },
    { name: 'Bedroom AC', time: '10:30 PM', action: 'OFF', status: 'Active', dot: 'bg-amber-400' },
    { name: 'Garden Pump', time: '07:00 AM', action: 'ON', status: 'Pending', dot: 'bg-emerald-400' },
    { name: 'Security Camera', time: '11:00 PM', action: 'ON', status: 'Active', dot: 'bg-violet-400' },
]

const Landing = () => {
    return (
        <>
            <style>{`html, body { background-color: #06080f !important; }`}</style>
            <div className="w-full bg-[#06080f] text-[#e8edf8] antialiased">
                <Navbar />
                <HeroSection />
                <StatsBar />
                <HowItWorks steps={steps} />
                <FeaturesGrid features={features} />
                <HardwareSection hardware={hardware} />
                <SchedulerSection schedules={schedules} />
                <CTASection />
                <Footer />
            </div>
        </>
    )
}

export default Landing
