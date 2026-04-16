import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import api from '../api/axios';
import DeviceCard from '../components/DeviceCard';
import socket from '../api/socket';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'switch' });


  useEffect(() => {
    fetchDevices();

    // Socket.IO: Listen for real-time device state updates
    socket.on('deviceStateUpdate', ({ deviceId, newState }) => {
      setDevices((prevDevices) =>
        prevDevices.map((d) =>
          d.id === deviceId ? { ...d, state: newState } : d
        )
      );
    });

    // On mount, request all device states
    socket.emit('getAllDeviceStates');
    socket.on('allDeviceStates', (states) => {
      setDevices((prevDevices) =>
        prevDevices.map((d) =>
          states[d.id] !== undefined ? { ...d, state: states[d.id] } : d
        )
      );
    });

    return () => {
      socket.off('deviceStateUpdate');
      socket.off('allDeviceStates');
    };
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await api.get('/devices');
      if(res.data.status === 'success') {
        setDevices(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDevice = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/devices', formData);
      if(res.data.status === 'success') {
        setDevices([...devices, res.data.data]);
        setFormData({ name: '', type: 'switch' });
        setShowAddForm(false);
      }
    } catch (error) {
      alert('Error adding device: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Devices</h1>
          <p className="text-slate-400">Manage and monitor all your connected devices.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200">
          <Plus size={20} />
          Add Device
        </button>
      </div>

      {/* Add Device Form */}
      {showAddForm && (
        <div className="mb-8 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <form onSubmit={handleAddDevice} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Device Name</label>
              <input
                type="text"
                placeholder="e.g., Living Room Light"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="switch">Switch</option>
                <option value="light">Light</option>
                <option value="fan">Fan</option>
                <option value="plug">Plug</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-4 rounded-lg"
              >
                Add Device
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">Loading devices...</p>
          </div>
        ) : devices.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">No devices added yet. Click "Add Device" to get started.</p>
          </div>
        ) : (
          devices.map((device) => (
            <DeviceCard 
              key={device.id} 
              device={device}
              onDeviceUpdate={fetchDevices}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Devices;