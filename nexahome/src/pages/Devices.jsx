import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DeviceCard from '../components/DeviceCard';

const Devices = () => {
  const [devices] = useState([]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Devices</h1>
          <p className="text-slate-400">Manage and monitor all your connected devices.</p>
        </div>
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200">
          <Plus size={20} />
          Add Device
        </button>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">No devices added yet. Click "Add Device" to get started.</p>
          </div>
        ) : (
          devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))
        )}
      </div>
    </div>
  );
};

export default Devices;