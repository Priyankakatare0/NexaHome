// Blynk Integration Service
// Controls virtual devices in Blynk platform

// Use environment variable: VITE_BLYNK_TOKEN
// Create .env file in nexahome/ with: VITE_BLYNK_TOKEN=your_token_here
// const BLYNK_TOKEN = import.meta.env.VITE_BLYNK_TOKEN || '';

// Map your device IDs to Blynk virtual pins
// Replace these with your actual device IDs from Blynk dashboard

// Blynk Integration Service
// Controls multiple virtual devices (Fan, Light, TV) using a single Blynk device and Auth Token
//
// 1. In Blynk, create a template with datastreams:
//    - V0: Fan
//    - V1: Light
//    - V2: TV
// 2. Create ONE device from this template (e.g., "Fan") and use its Auth Token in .env:
//    VITE_BLYNK_TOKEN=your_fan_device_auth_token_here
// 3. Map your backend device IDs to the correct pins below.

const BLYNK_TOKEN = import.meta.env.VITE_BLYNK_TOKEN || '';



// Map device names to Blynk token and pin (case-insensitive)
// Fill in your actual tokens below
const deviceBlynkMap = {
  // Example:
  // 'living room fan': { token: 'FAN_TOKEN', pin: 'V0' },
  // 'living room light': { token: 'LIGHT_TOKEN', pin: 'V1' },
  // 'living room tv': { token: 'TV_TOKEN', pin: 'V2' },
  'living room fan': {
    token: '_6c7m08BHI3EKaDjD8hDCu9w4IrZRElR',
    pin: 'V0',
  },
  'living room light': {
    token: 'OmIIB_deQnhu7euEWGGckMXtrnHtZM9I',
    pin: 'V1',
  },
  'living room tv': {
    token: 'YZcoAQqHMRPBroX47GbsO0hMlIR0Q3ek',
    pin: 'V2',
  },
  // Add more as needed
};

/**
 * Get Blynk token and pin for a device name (case-insensitive)
 * @param {string} name - Device name (e.g., 'Living Room Fan')
 * @returns {{token: string, pin: string}|null}
 */
export const getBlynkTokenAndPinForDeviceName = (name) => {
  if (!name) return null;
  return deviceBlynkMap[name.trim().toLowerCase()] || null;
};



/**
 * Control a Blynk device's virtual pin using per-device token
 * @param {string} token - Blynk Auth Token for the device
 * @param {string} pin - Blynk virtual pin (e.g., 'V0')
 * @param {boolean} state - true = ON (1), false = OFF (0)
 */
export const controlBlynkDevice = async (token, pin, state) => {
  if (!token) {
    console.warn('⚠️ Blynk token not provided. Device control skipped.');
    return;
  }
  if (!pin) {
    console.warn('⚠️ No Blynk pin provided.');
    return;
  }
  const value = state ? 1 : 0;
  try {
    const response = await fetch(
      `https://blynk.cloud/external/api/update?token=${token}&${pin}=${value}`,
      { method: 'POST' }
    );
    if (!response.ok) {
      console.error(`❌ Blynk API error: ${response.status}`);
      return;
    }
    console.log(`✅ Blynk pin ${pin} set to ${state ? 'ON' : 'OFF'}`);
  } catch (error) {
    console.error('❌ Blynk control failed:', error);
  }
};



/**
 * Get device state from Blynk
 * @param {string} token - Blynk Auth Token for the device
 * @param {string} pin - Blynk virtual pin (e.g., 'V0')
 * @returns {boolean|null} - true/false or null if failed
 */
export const getBlynkDeviceState = async (token, pin) => {
  if (!token) return null;
  if (!pin) return null;
  try {
    const response = await fetch(
      `https://blynk.cloud/external/api/get?token=${token}&${pin}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data[0] === 1;
  } catch (error) {
    console.error('❌ Failed to get Blynk device state:', error);
    return null;
  }
};

export default { controlBlynkDevice, getBlynkDeviceState };
