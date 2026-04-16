import React, { useState } from 'react';

const DeviceSettingsModal = ({ device, open, onClose, onSave, onDelete }) => {
  const [name, setName] = useState(device?.name || '');
  const [type, setType] = useState(device?.type || 'switch');
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-red-400 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Device Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-md font-medium text-slate-300 mb-1">Device Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-slate-300 mb-1">Device Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="switch">Switch</option>
              <option value="fan">Fan</option>
              <option value="light">Light</option>
              <option value="sensor">Sensor</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-md font-medium text-slate-300 mb-1">Device Key</label>
            <input
              type="text"
              value={device.device_key}
              readOnly
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
            />
          </div>
        </div>
        <div className="flex justify-between mt-8 gap-3">
          <button
            className="bg-cyan-500 text-black font-semibold rounded-lg px-6 py-2 hover:bg-cyan-400 transition-all duration-200"
            onClick={() => onSave({ name, type })}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white font-semibold rounded-lg px-6 py-2 hover:bg-red-400 transition-all duration-200"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceSettingsModal;
