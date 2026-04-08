import crypto from 'crypto';
import supabase from '../config/supabase.js';

// Generate secure API key and secret
const generateCredentials = () => {
  const apiKey = 'nk_' + crypto.randomBytes(24).toString('hex');
  const apiSecret = crypto.randomBytes(32).toString('hex');
  return { apiKey, apiSecret };
};

// Get all credentials for a user
export const getCredentials = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('credentials')
      .select('id, user_id, name, api_key, is_active, last_used, created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    // Mask API keys for security
    const maskedCredentials = data.map(cred => ({
      ...cred,
      api_key: cred.api_key.slice(0, 10) + '...' + cred.api_key.slice(-4)
    }));

    res.status(200).json({
      status: 'success',
      data: maskedCredentials
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create new credential
export const createCredential = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'Credential name is required'
      });
    }

    const { apiKey, apiSecret } = generateCredentials();

    const { data, error } = await supabase
      .from('credentials')
      .insert([{
        user_id: req.user.id,
        name,
        api_key: apiKey,
        api_secret: apiSecret,
        is_active: true
      }])
      .select();

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    const cred = data[0];

    res.status(201).json({
      status: 'success',
      message: 'Credential created successfully',
      data: {
        id: cred.id,
        name: cred.name,
        api_key: cred.api_key, // Return full key only on creation
        api_secret: cred.api_secret, // Return full secret only on creation
        is_active: cred.is_active,
        created_at: cred.created_at
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get full credential (for copying - requires password confirmation)
export const getFullCredential = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify credential exists and belongs to user
    const { data: credential, error: fetchError } = await supabase
      .from('credentials')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (fetchError || !credential) {
      return res.status(404).json({
        status: 'error',
        message: 'Credential not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        id: credential.id,
        name: credential.name,
        api_key: credential.api_key,
        api_secret: credential.api_secret
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Revoke credential
export const revokeCredential = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify credential exists and belongs to user
    const { data: credential, error: fetchError } = await supabase
      .from('credentials')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !credential) {
      return res.status(404).json({
        status: 'error',
        message: 'Credential not found'
      });
    }

    if (credential.user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized'
      });
    }

    // Deactivate credential
    const { error } = await supabase
      .from('credentials')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Credential revoked successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete credential
export const deleteCredential = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify credential exists and belongs to user
    const { data: credential, error: fetchError } = await supabase
      .from('credentials')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !credential) {
      return res.status(404).json({
        status: 'error',
        message: 'Credential not found'
      });
    }

    if (credential.user_id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized'
      });
    }

    // Delete credential
    const { error } = await supabase
      .from('credentials')
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
      message: 'Credential deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Validate API key (for device authentication)
export const validateApiKey = async (req, res) => {
  try {
    const { api_key, api_secret } = req.body;

    if (!api_key || !api_secret) {
      return res.status(400).json({
        status: 'error',
        message: 'API key and secret required'
      });
    }

    const { data: credential, error } = await supabase
      .from('credentials')
      .select('*')
      .eq('api_key', api_key)
      .eq('api_secret', api_secret)
      .eq('is_active', true)
      .single();

    if (error || !credential) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Update last_used timestamp
    await supabase
      .from('credentials')
      .update({ last_used: new Date().toISOString() })
      .eq('id', credential.id);

    res.status(200).json({
      status: 'success',
      message: 'Valid credentials',
      data: {
        user_id: credential.user_id,
        credential_id: credential.id
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
