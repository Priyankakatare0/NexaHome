import React, { useState } from 'react';
import { Clock, Trash2, ToggleRight, Edit, Save, X } from 'lucide-react';
import api from '../api/axios';

const ScheduleRow = ({ schedule, onScheduleUpdate, devices }) => {
  const [isEnabled, setIsEnabled] = useState(schedule?.enabled || false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    device_id: schedule.device_id,
    action: schedule.action || 'ON',
    time: schedule.time || '07:00',
    days: schedule.days || '1,2,3,4,5',
  });

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
          {!isEditing ? (
            <p className="text-base font-semibold text-cyan-300">
              {schedule?.devices?.name || 'Unknown Device'} · {schedule?.time} · {
                (schedule?.days || '').split(',').filter(Boolean).map(day => {
                  const map = {
                    '1': 'Mon', '2': 'Tue', '3': 'Wed', '4': 'Thu', '5': 'Fri', '6': 'Sat', '0': 'Sun'
                  };
                  return map[day] || day;
                }).join(', ')
              }
            </p>
          ) : (
            <form className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2" onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await api.put(`/schedules/${schedule.id}`, editData);
                if(res.data.status === 'success') {
                  setIsEditing(false);
                  if(onScheduleUpdate) onScheduleUpdate();
                }
              } catch (error) {
                alert('Failed to update schedule: ' + (error.response?.data?.message || error.message));
              }
            }}>
              <select
                value={editData.device_id}
                onChange={e => setEditData({...editData, device_id: e.target.value})}
                className="px-2 py-1 rounded bg-slate-800 text-white border border-slate-700"
                required
              >
                <option value="">Device</option>
                {devices && devices.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <select
                value={editData.action}
                onChange={e => setEditData({...editData, action: e.target.value})}
                className="px-2 py-1 rounded bg-slate-800 text-white border border-slate-700"
              >
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
              <input
                type="time"
                value={editData.time}
                onChange={e => setEditData({...editData, time: e.target.value})}
                className="px-2 py-1 rounded bg-slate-800 text-white border border-slate-700"
                required
              />
              <div className="flex gap-1 flex-wrap">
                {[
                  { label: 'Mon', value: '1' },
                  { label: 'Tue', value: '2' },
                  { label: 'Wed', value: '3' },
                  { label: 'Thu', value: '4' },
                  { label: 'Fri', value: '5' },
                  { label: 'Sat', value: '6' },
                  { label: 'Sun', value: '0' },
                ].map(day => (
                  <button
                    type="button"
                    key={day.value}
                    className={`px-2 py-1 rounded-full border text-xs font-semibold transition-colors focus:outline-none ${editData.days.split(',').includes(day.value)
                      ? 'bg-cyan-500 text-black border-cyan-600'
                      : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'}`}
                    onClick={() => {
                      const daysArr = editData.days.split(',').filter(Boolean);
                      if (daysArr.includes(day.value)) {
                        setEditData({ ...editData, days: daysArr.filter(d => d !== day.value).join(',') });
                      } else {
                        setEditData({ ...editData, days: [...daysArr, day.value].sort().join(',') });
                      }
                    }}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-bold py-2">Save</button>
                <button type="button" className="flex-1 bg-slate-700 hover:bg-slate-800 rounded text-white font-bold py-2" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Section - Toggle, Edit, Delete */}
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
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
            title="Edit schedule"
          >
            <Edit size={20} className="text-blue-400" />
          </button>
        )}
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
