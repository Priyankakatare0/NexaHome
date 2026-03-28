import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import ScheduleRow from '../components/ScheduleRow';

const Schedules = () => {
  const [schedules] = useState([]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Schedules</h1>
          <p className="text-slate-400">Automate your devices with timed schedules.</p>
        </div>
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex-shrink-0">
          <Plus size={20} />
          New Schedule
        </button>
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        {schedules.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">No schedules created yet. Click "New Schedule" to get started.</p>
          </div>
        ) : (
          schedules.map((schedule) => (
            <ScheduleRow key={schedule.id} schedule={schedule} />
          ))
        )}
      </div>
    </div>
  )
}

export default Schedules