import cron from 'node-cron';
import supabase from '../config/supabase.js';

export const startScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "07:00"
      const currentDay = now.getDay().toString(); // 0-6 (0=Sunday, 1=Monday, ..., 6=Saturday)

      const { data: schedules, error } = await supabase
        .from('schedules')
        .select('*, devices(id, name, device_key, user_id)')
        .eq('time', currentTime)
        .eq('is_active', true);

      if (error) {
        console.error('❌ Scheduler error fetching schedules:', error.message);
        return;
      }

      if (!schedules || schedules.length === 0) {
        return;
      }

      // Process each schedule
      for (const schedule of schedules) {
        try {
          // Check if today matches the schedule days
          if (schedule.days.split(',').includes(currentDay)) {
            const state = schedule.action === 'ON';

            // Log the action
            const { error: logError } = await supabase
              .from('device_logs')
              .insert([{
                device_id: schedule.device_id,
                action: schedule.action,
                triggered_by: 'schedule'
              }]);

            if (logError) {
              console.error('❌ Error logging schedule action:', logError.message);
            } else {
              console.log(`✅ Schedule executed: Device ${schedule.devices.name} set to ${schedule.action}`);
            }

            // TODO: When MQTT service is ready, add this:
            // sendCommand(schedule.devices.device_key, state);
          }
        } catch (scheduleError) {
          console.error('❌ Error processing schedule:', scheduleError.message);
        }
      }
    } catch (error) {
      console.error('❌ Critical scheduler error:', error.message);
    }
  });

  console.log('✅ Scheduler started - runs every minute');
};