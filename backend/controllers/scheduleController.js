import supabase from '../config/supabase.js';

// Get all schedules for user's devices
export const getSchedules = async (req, res) => {
  try {
    // First get user's devices
    const { data: devices, error: deviceError } = await supabase
      .from('devices')
      .select('id')
      .eq('user_id', req.user.id);

    if (deviceError) {
      return res.status(400).json({
        status: 'error',
        message: deviceError.message
      });
    }

    const deviceIds = devices.map(d => d.id);

    if (deviceIds.length === 0) {
      return res.status(200).json({
        status: 'success',
        data: []
      });
    }

    // Get schedules for user's devices
    const { data, error } = await supabase
      .from('schedules')
      .select('*, devices(id, name, type)')
      .in('device_id', deviceIds)
      .order('time', { ascending: true });

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add new schedule
export const addSchedule = async (req, res) => {
  try {
    const { device_id, action, time, days } = req.body;

    // Validation
    if (!device_id || !action || !time || !days) {
      return res.status(400).json({
        status: 'error',
        message: 'device_id, action, time, and days are required'
      });
    }

    if (!['ON', 'OFF'].includes(action.toUpperCase())) {
      return res.status(400).json({
        status: 'error',
        message: 'Action must be "ON" or "OFF"'
      });
    }

    // Verify device belongs to user
    const { data: device, error: deviceError } = await supabase
      .from('devices')
      .select('id')
      .eq('id', device_id)
      .eq('user_id', req.user.id)
      .single();

    if (deviceError || !device) {
      return res.status(404).json({
        status: 'error',
        message: 'Device not found or does not belong to you'
      });
    }

    // Insert schedule
    const { data, error } = await supabase
      .from('schedules')
      .insert([{
        device_id,
        action: action.toUpperCase(),
        time,
        days,
        is_active: true
      }])
      .select();

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    // Create a log entry for schedule creation
    if (data && data[0]) {
      try {
        await supabase
          .from('device_logs')
          .insert([{
            device_id,
            action: 'Schedule Created',
            triggered_by: 'user'
          }]);
      } catch (logErr) {
        console.error('Failed to create log entry:', logErr);
      }
    }

    res.status(201).json({
      status: 'success',
      message: 'Schedule created successfully',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update schedule
export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, time, days, is_active } = req.body;

    // Get schedule and verify user owns the device
    const { data: schedule, error: scheduleError } = await supabase
      .from('schedules')
      .select('device_id')
      .eq('id', id)
      .single();

    if (scheduleError || !schedule) {
      return res.status(404).json({
        status: 'error',
        message: 'Schedule not found'
      });
    }

    // Verify device belongs to user
    const { data: device, error: deviceError } = await supabase
      .from('devices')
      .select('id')
      .eq('id', schedule.device_id)
      .eq('user_id', req.user.id)
      .single();

    if (deviceError || !device) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized to update this schedule'
      });
    }

    // Update schedule
    const updateData = {};
    if (action) updateData.action = action.toUpperCase();
    if (time) updateData.time = time;
    if (days) updateData.days = days;
    if (typeof is_active === 'boolean') updateData.is_active = is_active;

    const { data, error } = await supabase
      .from('schedules')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Schedule updated successfully',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete schedule
export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Get schedule and verify user owns the device
    const { data: schedule, error: scheduleError } = await supabase
      .from('schedules')
      .select('device_id')
      .eq('id', id)
      .single();

    if (scheduleError || !schedule) {
      return res.status(404).json({
        status: 'error',
        message: 'Schedule not found'
      });
    }

    // Verify device belongs to user
    const { data: device, error: deviceError } = await supabase
      .from('devices')
      .select('id')
      .eq('id', schedule.device_id)
      .eq('user_id', req.user.id)
      .single();

    if (deviceError || !device) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized to delete this schedule'
      });
    }

    // Create a log entry before deletion
    try {
      await supabase
        .from('device_logs')
        .insert([{
          device_id: schedule.device_id,
          action: 'Schedule Deleted',
          triggered_by: 'user'
        }]);
    } catch (logErr) {
      console.error('Failed to create log entry:', logErr);
    }

    // Delete schedule
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
