import mqtt from "mqtt";
import dotenv from 'dotenv'
dotenv.config()

const client = mqtt.connect(`mqtts://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
})

client.on('connect', () => console.log('✅ MQTT Connected'))
client.on('error', (err) => console.error('❌ MQTT Error:', err))

export default client