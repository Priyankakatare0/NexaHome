import { v4 as uuidv4 } from 'uuid';
import supabase from '../config/supabase.js';

// Get all devices for a user
export const getDevices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('user_id', req.user.id);

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

// Add new device
export const addDevice = async (req, res) => {
  try {
    const { name, type } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'Device name is required'
      });
    }

    const device_key = 'nx_' + uuidv4().replace(/-/g, '').slice(0, 16);
    
    const { data, error } = await supabase
      .from('devices')
      .insert([{ 
        user_id: req.user.id, 
        name, 
        type: type || 'switch', 
        device_key 
      }])
      .select();

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    // Create a log entry for device creation
    if (data && data[0]) {
      try {
        await supabase
          .from('device_logs')
          .insert([{
            device_id: data[0].id,
            action: 'Device Added',
            triggered_by: 'user'
          }]);
      } catch (logErr) {
        console.error('Failed to create log entry:', logErr);
      }
    }

    res.status(201).json({
      status: 'success',
      message: 'Device created successfully',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Toggle device on/off
export const toggleDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    // Validation
    if (typeof state !== 'boolean') {
      return res.status(400).json({
        status: 'error',
        message: 'State must be a boolean (true/false)'
      });
    }

    // Verify user owns the device
    const { data: device, error: fetchError } = await supabase
      .from('devices')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !device) {
      return res.status(404).json({
        status: 'error',
        message: 'Device not found'
      });
    }

    if (device.user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized to toggle this device'
      });
    }

    // Update device
    const { data, error } = await supabase
      .from('devices')
      .update({ state, last_seen: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    if (!data || data.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Failed to update device'
      });
    }

    // Create a log entry for this action
    const action = state ? 'Turned On' : 'Turned Off';
    try {
      await supabase
        .from('device_logs')
        .insert([{
          device_id: id,
          action: action,
          triggered_by: 'user'
        }]);
    } catch (logErr) {
      console.error('Failed to create log entry:', logErr);
    }

    // TODO: Send command to MQTT broker when hardware integration is ready
    // sendCommand(data[0].device_key, state);

    res.status(200).json({
      status: 'success',
      message: 'Device toggled successfully',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete device
export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify user owns the device
    const { data: device, error: fetchError } = await supabase
      .from('devices')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !device) {
      return res.status(404).json({
        status: 'error',
        message: 'Device not found'
      });
    }

    if (device.user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized to delete this device'
      });
    }

    // Create a log entry before deletion
    await supabase
      .from('device_logs')
      .insert([{
        device_id: id,
        action: 'Device Deleted',
        triggered_by: 'user'
      }])
      .catch(err => console.error('Failed to create log entry:', err));

    // Delete device
    const { error } = await supabase
      .from('devices')
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
      message: 'Device deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
