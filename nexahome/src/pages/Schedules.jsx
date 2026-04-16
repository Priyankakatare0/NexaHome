import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react';
import api from '../api/axios';
import ScheduleRow from '../components/ScheduleRow';

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ 
    device_id: '', 
    action: 'ON', 
    time: '07:00', 
    days: '1,2,3,4,5' 
  });

  useEffect(() => {
    fetchSchedules();
    fetchDevices();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get('/schedules');
      if(res.data.status === 'success') {
        setSchedules(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDevices = async () => {
    try {
      const res = await api.get('/devices');
      if(res.data.status === 'success') {
        setDevices(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/schedules', formData);
      if(res.data.status === 'success') {
        setSchedules([...schedules, res.data.data]);
        setFormData({ device_id: '', action: 'ON', time: '07:00', days: '1,2,3,4,5' });
        setShowAddForm(false);
      }
    } catch (error) {
      alert('Error adding schedule: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Schedules</h1>
          <p className="text-slate-400">Automate your devices with timed schedules.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex-shrink-0">
          <Plus size={20} />
          New Schedule
        </button>
      </div>

      {/* Add Schedule Form */}
      {showAddForm && (
        <div className="mb-8 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <form onSubmit={handleAddSchedule} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Device</label>
              <select
                value={formData.device_id}
                onChange={(e) => setFormData({...formData, device_id: e.target.value})}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                required
              >
                <option value="">Select a device</option>
                {devices.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Action</label>
                <select
                  value={formData.action}
                  onChange={(e) => setFormData({...formData, action: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="ON">Turn ON</option>
                  <option value="OFF">Turn OFF</option>
                </select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Days</label>
              <div className="flex gap-2 flex-wrap">
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
                    className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors focus:outline-none ${formData.days.split(',').includes(day.value)
                      ? 'bg-cyan-500 text-black border-cyan-600'
                      : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'}`}
                    onClick={() => {
                      const daysArr = formData.days.split(',').filter(Boolean);
                      if (daysArr.includes(day.value)) {
                        setFormData({ ...formData, days: daysArr.filter(d => d !== day.value).join(',') });
                      } else {
                        setFormData({ ...formData, days: [...daysArr, day.value].sort().join(',') });
                      }
                    }}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-4 rounded-lg"
              >
                Add Schedule
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

      {/* Schedules List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">Loading schedules...</p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">No schedules created yet. Click "New Schedule" to get started.</p>
          </div>
        ) : (
          schedules.map((schedule) => (
            <ScheduleRow 
              key={schedule.id} 
              schedule={schedule}
              onScheduleUpdate={fetchSchedules}
              devices={devices}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Schedules