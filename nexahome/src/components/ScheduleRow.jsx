import React, { useState } from 'react';
import { Clock, Trash2, ToggleRight } from 'lucide-react';

const ScheduleRow = ({ schedule }) => {
  const [isEnabled, setIsEnabled] = useState(schedule?.enabled || false);

  return (
    <div className="bg-gradient-to-r from-slate-900/50 to-slate-950/50 border border-slate-800 rounded-lg p-6 flex items-center justify-between hover:border-slate-700 transition-all duration-200">
      {/* Left Section - Icon and Info */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Clock size={24} className="text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{schedule?.name}</h3>
          <p className="text-sm text-slate-500">
            {schedule?.device} · {schedule?.time} · {schedule?.frequency}
          </p>
        </div>
      </div>

      {/* Right Section - Toggle and Delete */}
      <div className="flex items-center gap-4 ml-4">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`p-2 rounded-lg transition-colors ${
            isEnabled
              ? 'bg-cyan-500/20 hover:bg-cyan-500/30'
              : 'hover:bg-slate-800'
          }`}
          title="Toggle schedule"
        >
          <ToggleRight size={20} className={isEnabled ? 'text-cyan-400' : 'text-slate-400'} />
        </button>
        <button
          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          title="Delete schedule"
        >
          <Trash2 size={20} className="text-slate-400 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleRow;
