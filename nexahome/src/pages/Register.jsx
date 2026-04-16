import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from '../api/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if(res.data.status === 'success') {
        alert('Registration successful! Please check your email to verify your account before logging in.');
        navigate('/login');
      }
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
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
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-slate-400 text-md">
              Start controlling your smart home in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name Field */}
            <div>
              <label className="block text-md font-medium text-slate-300 mb-2">
                Full name
              </label>
              <input
                type="text"
                placeholder="Arjun Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              />
            </div>

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
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-md font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all pr-10"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-200 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60"
            >
              Create account
            </button>
          </form>

          {/* Terms & Privacy */}
          <p className="text-sm text-slate-400 text-center mt-5">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-md text-slate-400 mt-7">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Register;