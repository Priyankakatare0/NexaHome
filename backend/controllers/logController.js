import supabase from '../config/supabase.js';

// Get all logs for user's devices
export const getLogs = async (req, res) => {
  try {
    const { device_id, limit = 50, offset = 0 } = req.query;

    // First get user's devices
    let devicesQuery = supabase
      .from('devices')
      .select('id')
      .eq('user_id', req.user.id);

    const { data: devices, error: deviceError } = await devicesQuery;

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
        data: [],
        total: 0
      });
    }

    // Filter by specific device if provided
    let logsQuery = supabase
      .from('device_logs')
      .select('*, devices(id, name, type)', { count: 'exact' })
      .in('device_id', deviceIds)
      .order('created_at', { ascending: false });

    if (device_id) {
      logsQuery = logsQuery.eq('device_id', device_id);
    }

    logsQuery = logsQuery
      .range(offset, offset + parseInt(limit) - 1);

    const { data, error, count } = await logsQuery;

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      data: data,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add new log
export const addLog = async (req, res) => {
  try {
    const { device_id, action, triggered_by } = req.body;

    // Validation
    if (!device_id || !action || !triggered_by) {
      return res.status(400).json({
        status: 'error',
        message: 'device_id, action, and triggered_by are required'
      });
    }

    if (!['user', 'schedule', 'device'].includes(triggered_by.toLowerCase())) {
      return res.status(400).json({
        status: 'error',
        message: 'triggered_by must be "user", "schedule", or "device"'
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

    // Insert log
    const { data, error } = await supabase
      .from('device_logs')
      .insert([{
        device_id,
        action,
        triggered_by: triggered_by.toLowerCase()
      }])
      .select();

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'Log created successfully',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};