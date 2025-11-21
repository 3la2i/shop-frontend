import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';
import axiosInstance from '../lib/axiosInstance';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axiosInstance.post(`/api/auth/login`, { username, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: `linear-gradient(135deg, ${theme.bgDark} 0%, ${theme.bgLight} 100%)`}}>
      <form onSubmit={handleSubmit} className="w-full max-w-xs" style={{background: 'rgba(35,40,74,0.95)', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
        <div className="flex mb-4">
          <button
            type="button"
            className="flex-1 py-2 rounded-tl-2xl rounded-bl-2xl text-white font-bold border-b-2"
            style={{ background: 'rgba(35,40,74,0.7)', borderBottomColor: theme.primary }}
          >
            Login
          </button>
          <button type="button" className="flex-1 py-2 rounded-tr-2xl rounded-br-2xl text-white font-bold bg-transparent">Register</button>
        </div>
        <label className="text-white text-sm">اسم المستخدم</label>
        <input
          className="rounded px-3 py-2 text-white focus:outline-none border w-full mb-2"
          style={{ background: 'rgba(35,40,74,0.7)', borderColor: theme.border }}
          type="text"
          
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="اسم المستخدم"
          autoComplete="username"
          required
        />
        <label className="text-white text-sm">كلمة المرور</label>
        <input
          className="rounded px-3 py-2 text-white focus:outline-none border w-full mb-2"
          style={{ background: 'rgba(35,40,74,0.7)', borderColor: theme.border }}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          autoComplete="current-password"
          required
        />
        {error && <div className="text-red-400 text-center text-sm">{error}</div>}
        <button
          type="submit"
          className="mt-2 py-2 rounded text-white font-bold flex items-center justify-center disabled:opacity-60 w-full"
          style={{ background: theme.primary }}
          disabled={loading}
        >
          {loading ? <span className="loader mr-2"></span> : null}
          دخول
        </button>
      </form>
    </div>
  );
} 