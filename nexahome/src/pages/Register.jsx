import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call here
    console.log({ name, email, password });
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
            <h1 className="text-3xl font-bold text-white mb-3">Create your account</h1>
            <p className="text-slate-400 text-md">
              Start controlling your smart home in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
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
                className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-md font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/40 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-200 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-600/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-800/50 px-3 text-slate-400">or sign up with</span>
            </div>
          </div>

          {/* Google Button */}
          <button className="w-full py-3 border border-slate-600/50 bg-slate-700/20 rounded-lg hover:bg-slate-700/40 transition-all duration-200 flex items-center justify-center gap-3">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-white font-medium">Google</span>
          </button>

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
        <p className="text-center text-sm text-slate-400 mt-7">
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