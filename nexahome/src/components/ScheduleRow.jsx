import React, { useState } from 'react';
import { Clock, Trash2, ToggleRight } from 'lucide-react';
import api from '../api/axios';

const ScheduleRow = ({ schedule, onScheduleUpdate }) => {
  const [isEnabled, setIsEnabled] = useState(schedule?.enabled || false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    try {
      const newEnabled = !isEnabled;
      const res = await api.put(`/schedules/${schedule.id}`, {
        enabled: newEnabled
      });
      
      if(res.data.status === 'success') {
        setIsEnabled(newEnabled);
        if(onScheduleUpdate) onScheduleUpdate();
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
      alert('Failed to update schedule');
      setIsEnabled(!isEnabled);
    }
  };

  const handleDelete = async () => {
    if(!window.confirm('Are you sure you want to delete this schedule?')) return;
    
    setIsDeleting(true);
    try {
      const res = await api.delete(`/schedules/${schedule.id}`);
      
      if(res.data.status === 'success') {
        if(onScheduleUpdate) onScheduleUpdate();
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule');
    } finally {
      setIsDeleting(false);
    }
  };

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
            {schedule?.devices?.name || 'Unknown Device'} · {schedule?.time} · {schedule?.day}
          </p>
        </div>
      </div>

      {/* Right Section - Toggle and Delete */}
      <div className="flex items-center gap-4 ml-4">
        <button
          onClick={handleUpdate}
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
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
          title="Delete schedule"
        >
          <Trash2 size={20} className="text-slate-400 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleRow;
