import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import axiosInstance from '../lib/axiosInstance';
import { setCookie } from '../utils/cookies';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axiosInstance.post('/api/auth/login', { username, password });
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
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a1f35] to-[#0f172a] p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 mb-4">
            <LogIn className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">مرحباً بك</h1>
          <p className="text-slate-400">إدارة عملائك ومنتجاتك بكل سهولة</p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/30 shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-700/50">
            <button
              onClick={() => setActiveTab('login')}
              type="button"
              className={`flex-1 px-4 py-4 font-semibold text-sm transition-all duration-300 relative flex items-center justify-center gap-2 ${
                activeTab === 'login' ? 'text-white' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <LogIn className="w-4 h-4" />
              تسجيل الدخول
              {activeTab === 'login' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('register')}
              type="button"
              className={`flex-1 px-4 py-4 font-semibold text-sm transition-all duration-300 relative flex items-center justify-center gap-2 ${
                activeTab === 'register' ? 'text-white' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              حساب جديد
              {activeTab === 'register' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500" />
              )}
            </button>
          </div>

          {/* Content */}
          {activeTab === 'login' ? (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Username Field */}
              <div className="space-y-3">
                <label htmlFor="username" className="block text-sm font-semibold text-slate-200">
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-700/30 border border-slate-600/50 text-white placeholder-slate-500 transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none hover:border-slate-500/50"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-700/30 border border-slate-600/50 text-white placeholder-slate-500 transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none hover:border-slate-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                  <>
                    <span>تسجيل الدخول</span>
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-8 space-y-6" dir="rtl">
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 mx-auto mb-4 flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-slate-400 text-base mb-4">تسجيل حساب جديد غير متاح حالياً</p>
                <p className="text-slate-500 text-sm mb-6">يرجى التواصل مع الإدارة لإنشاء حساب جديد</p>
                <button
                  onClick={() => setActiveTab('login')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-semibold transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  العودة إلى تسجيل الدخول
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">منصة إدارة متكاملة © 2025</p>
        </div>
      </div>
    </div>
  );
}

