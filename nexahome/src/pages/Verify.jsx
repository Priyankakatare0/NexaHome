import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    api.get(`/auth/verify?token=${token}`)
      .then(res => {
        setStatus('success');
        setMessage('Registration complete! Your email is verified. You can now log in.');
      })
      .catch(err => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">{status === 'success' ? 'Success!' : status === 'error' ? 'Error' : 'Verifying...'}</h1>
        <p className="mb-6">{message}</p>
        {status === 'success' && (
          <button
            className="bg-cyan-500 text-black font-semibold rounded-lg px-6 py-2 hover:bg-cyan-400 transition-all duration-200"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Verify;
