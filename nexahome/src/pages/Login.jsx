import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      if(res.data.status === 'success') {
        // Update context state immediately
        login(res.data.user, res.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/forgot-password', { email: resetEmail });
      alert("If an account exists, a reset email has been sent.");
    } catch (err) {
      alert("Failed to send reset email.");
    }
    setShowForgot(false);
    setResetEmail("");
  };

  return (
    <>
      <style>{`html, body { background-color: #06080f !important; }`}</style>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-3 mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500 font-bold text-white text-lg">
              N
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Nexa<span className="text-cyan-500">Home</span>
            </span>
          </Link>

          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-3">Welcome back</h1>
              <p className="text-slate-400 text-md">
                Enter your details to access your smart home
              </p>
            </div>

            {showForgot ? (
              <form
                onSubmit={handleForgotPassword}
                className="mt-4 flex flex-col gap-2"
              >
                <label className="block text-md font-medium text-slate-300 mb-2">
                  Enter your email to reset password
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  required
                  className="px-3 py-2 rounded border border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition-all py-2"
                >
                  Send Reset Email
                </button>
                <button
                  type="button"
                  className="text-cyan-400 mt-2"
                  onClick={() => setShowForgot(false)}
                >
                  Back to Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email Field */}
                <div>
                  <label className="block text-md font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-md font-medium text-slate-300">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 focus:outline-none"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors mt-2 cursor-pointer" 
                    onClick={() => setShowForgot(true)}>
                    Forgot password?
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 mt-4 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-200 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60"
                >
                  Sign in
                </button>
              </form>
            )}

            {/* Sign Up Link */}
            <p className="text-center text-md text-slate-400 mt-7">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;