// Email verification
export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ status: 'error', message: 'Verification token is required.' });
  }
  // Find user by token
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('verification_token', token)
    .single();
  if (error || !data) {
    return res.status(400).json({ status: 'error', message: 'Invalid or expired verification token.' });
  }
  // Update user as verified
  const { error: updateError } = await supabase
    .from('users')
    .update({ is_verified: true, verification_token: null })
    .eq('id', data.id);
  if (updateError) {
    return res.status(500).json({ status: 'error', message: updateError.message });
  }
  res.json({ status: 'success', message: 'Email verified successfully. You can now log in.' });
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import supabase from '../config/supabase.js';
import transporter from '../config/email.js';

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, and password are required'
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Generate verification token
    const verification_token = crypto.randomBytes(32).toString('hex');

    // Insert user with verification fields
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashed, is_verified: false, verification_token }])
      .select();

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    // Send verification email
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify?token=${verification_token}`;
    const mailOptions = {
      from: process.env.SMTP_FROM || 'no-reply@nexahome.com',
      to: email,
      subject: 'Verify your NexaHome account',
      html: `<h2>Welcome to NexaHome!</h2><p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">${verifyUrl}</a>`
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error('EMAIL ERROR:', mailErr);
      // Optionally, you can delete the user if email fails
      await supabase.from('users').delete().eq('id', data[0].id);
      return res.status(500).json({ status: 'error', message: 'Failed to send verification email. Please try again.' });
    }

    res.status(201).json({
      status: 'success',
      message: 'Account created! Please check your email to verify your account.',
      user: {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('LOGIN ATTEMPT:', email);

    // Validation
    if (!email || !password) {
      console.log('Login failed: missing email or password');
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    console.log('Querying user by email...');
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);
    console.log('User query result:', data, error);

    if (error) {
      console.log('Supabase error:', error.message);
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }

    const user = data?.[0];

    if (!user) {
      console.log('Login failed: user not found');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    console.log('Comparing password...');
    const match = await bcrypt.compare(password, user.password);
    console.log('Password match:', match);

    if (!match) {
      console.log('Login failed: password mismatch');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check if user is verified
    if (!user.is_verified) {
      console.log('Login failed: email not verified');
      return res.status(403).json({
        status: 'error',
        message: 'Please verify your email before logging in.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Login successful for:', email);
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log('Login error:', error.message);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  console.log('Forgot password request for:', email);

  // Find user by email
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    console.log('No user found for email:', email);
    return res.json({ message: 'If an account exists, a reset email has been sent.' });
  }

  // Generate token and expiry
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1 hour

  // Save token and expiry to user
  const { error: updateError } = await supabase
    .from('users')
    .update({ reset_password_token: token, reset_password_expires: expires })
    .eq('id', user.id);
  if (updateError) {
    console.error('Error updating user with reset token:', updateError);
  }

  // Send email
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${token}`;
  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@nexahome.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
  };
  console.log('Sending reset email to:', email, 'with URL:', resetUrl);
  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent successfully');
  } catch (mailErr) {
    console.error('EMAIL ERROR:', mailErr);
    // Do not reveal error to user
  }

  res.json({ message: 'If an account exists, a reset email has been sent.' });
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  console.log('Reset token received:', token);
  if (!token || !password) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  // Find user by reset token and check expiry
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('reset_password_token', token)
    .single();

  if (!user || !user.reset_password_expires || new Date(user.reset_password_expires) < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired reset token.' });
  }

  // Hash new password
  const hashed = await bcrypt.hash(password, 10);

  // Update password and clear reset token/expiry
  const { error: updateError } = await supabase
    .from('users')
    .update({ password: hashed, reset_password_token: null, reset_password_expires: null })
    .eq('id', user.id);

  if (updateError) {
    return res.status(500).json({ message: 'Failed to reset password.' });
  }

  res.json({ message: 'Password has been reset successfully.' });
};
