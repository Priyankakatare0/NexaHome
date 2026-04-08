import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import api from '../api/axios';

const DeviceCard = ({ device, onDeviceUpdate }) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      const res = await api.put(`/devices/${device.id}/toggle`, {
        state: !device.state
      });
      if(res.data.status === 'success') {
        if(onDeviceUpdate) {
          onDeviceUpdate();
        }
      }
    } catch (error) {
      console.error('Error toggling device:', error);
      alert('Error toggling device: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if(window.confirm('Are you sure you want to delete this device?')) {
      try {
        const res = await api.delete(`/devices/${device.id}`);
        if(res.data.status === 'success') {
          if(onDeviceUpdate) {
            onDeviceUpdate();
          }
        }
      } catch (error) {
        alert('Error deleting device: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-200">
      {/* Header with Icon and Settings */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            ⚡
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{device.name}</h3>
            <p className="text-sm text-slate-400">{device.type}</p>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <Settings size={20} className="text-slate-400 hover:text-red-400" />
        </button>
      </div>

      {/* Device Key */}
      <p className="text-sm text-slate-400 mb-3">Key: {device.device_key}</p>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-block w-2 h-2 rounded-full ${
          device.state ? 'bg-emerald-500' : 'bg-slate-500'
        }`}></span>
        <span className={`text-sm font-medium ${
          device.state ? 'text-emerald-500' : 'text-slate-400'
        }`}>
          {device.state ? 'On' : 'Off'}
        </span>
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        disabled={isToggling}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          device.state
            ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/50 hover:bg-cyan-600/30'
            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="w-5 h-5 flex items-center justify-center">
          {device.state ? '⊘' : '⊙'}
        </span>
        {isToggling ? 'Loading...' : (device.state ? 'Turn Off' : 'Turn On')}
      </button>
    </div>
  );
};

export default DeviceCard;
