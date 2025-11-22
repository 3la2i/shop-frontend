import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';
import axiosInstance from '../lib/axiosInstance';
import { setCookie } from '../utils/cookies';

function AuthTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-slate-700/50">
      <button
        onClick={() => setActiveTab("login")}
        type="button"
        className={`flex-1 px-4 py-4 font-semibold text-sm transition-all duration-300 relative ${
          activeTab === "login" ? "text-white" : "text-slate-400 hover:text-slate-300"
        }`}
      >
        تسجيل الدخول
        {activeTab === "login" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        )}
      </button>
      <button
        onClick={() => setActiveTab("register")}
        type="button"
        className={`flex-1 px-4 py-4 font-semibold text-sm transition-all duration-300 relative ${
          activeTab === "register" ? "text-white" : "text-slate-400 hover:text-slate-300"
        }`}
      >
        تسجيل حساب جديد
        {activeTab === "register" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        )}
      </button>
    </div>
  );
}

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
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
        setCookie('token', res.data.token);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: `linear-gradient(135deg, ${theme.bgDark} 0%, ${theme.bgLight} 100%)`}}>
      <div className="w-full max-w-md mx-4">
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'login' ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" dir="rtl">
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-slate-200">
                  اسم المستخدم
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="أدخل اسم المستخدم"
                  autoComplete="username"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  كلمة المرور
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>جاري تسجيل الدخول...</span>
                  </>
                ) : (
                  'تسجيل الدخول'
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 sm:p-8 space-y-5" dir="rtl">
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm">
                  تسجيل حساب جديد غير متاح حالياً
                </p>
                <button
                  onClick={() => setActiveTab('login')}
                  className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  العودة إلى تسجيل الدخول
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 