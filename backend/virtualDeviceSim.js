// Virtual IoT Device Simulator for NexaHome
import { io } from 'socket.io-client';
import supabase from './config/supabase.js';

const SERVER_URL = 'http://localhost:5000';

async function startVirtualDevice() {
  // Fetch all devices from Supabase
  const { data, error } = await supabase.from('devices').select('id, name, type');
  if (error || !data || data.length === 0) {
    console.error('No device found in database or error:', error);
    process.exit(1);
  }
  console.log('Available devices in DB:');
  data.forEach((d, i) => {
    console.log(`${i + 1}. ID: ${d.id} | Name: ${d.name} | Type: ${d.type}`);
  });

  // Use the first device for simulation
  const DEVICE_ID = data[0].id;
  console.log('Simulating device with ID:', DEVICE_ID);

  const socket = io(SERVER_URL, {
    transports: ['websocket'],
    autoConnect: true,
  });

  socket.on('connect', () => {
    console.log('Virtual device connected:', socket.id);
  });

  // Listen for ALL state changes from the server (for all devices)
  socket.on('deviceStateUpdate', ({ deviceId, newState }) => {
    const match = data.find((d) => d.id === deviceId);
    if (match) {
      console.log(`[DEVICE SYNC] Device: ${match.name} (ID: ${deviceId}) updated to state: ${newState}`);
    } else {
      console.log(`[DEVICE SYNC] Unknown device ID: ${deviceId} updated to state: ${newState}`);
    }
  });
}

startVirtualDevice();
