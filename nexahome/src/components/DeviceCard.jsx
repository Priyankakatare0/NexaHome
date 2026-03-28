import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const DeviceCard = ({ device }) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      // TODO: API call to toggle device
      console.log(`Toggling device: ${device.id}`);
    } catch (error) {
      console.error('Error toggling device:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-200">
      {/* Header with Icon and Settings */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            {device.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{device.name}</h3>
            <p className="text-sm text-slate-400">{device.type}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <Settings size={20} className="text-slate-400 hover:text-slate-300" />
        </button>
      </div>

      {/* Location */}
      <p className="text-sm text-slate-400 mb-3">{device.location}</p>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-block w-2 h-2 rounded-full ${
          device.online ? 'bg-emerald-500' : 'bg-slate-500'
        }`}></span>
        <span className={`text-sm font-medium ${
          device.online ? 'text-emerald-500' : 'text-slate-400'
        }`}>
          {device.online ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        disabled={isToggling || !device.online}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          device.state === 'on'
            ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/50 hover:bg-cyan-600/30'
            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="w-5 h-5 flex items-center justify-center">
          {device.state === 'on' ? '⊘' : '⊙'}
        </span>
        {device.state === 'on' ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
};

export default DeviceCard;
