import client from '../config/mqtt.js'

export const sendCommand = (deviceKey, state) => {
  const topic = `iot/${deviceKey}/command`
  const payload = JSON.stringify({ state: state ? 'ON' : 'OFF' })
  client.publish(topic, payload)
  console.log(`Command sent → ${topic}: ${payload}`)
}
