import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, BarChart3, LogOut, LogIn } from 'lucide-react';
import { checkAuth } from '../Compoents/auth';
import { deleteCookie } from '../utils/cookies';
import {  useInventory } from "../Compoents";

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = checkAuth();
  const {  summary} = useInventory(); 
  const handleLogout = () => {
    deleteCookie('token');
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      dir="rtl"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #252d45 100%)',
      }}
    >
      {/* Animated gradient blobs background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          pointerEvents: 'none',
        }}
      >
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          style={{
            animation: 'float 20s infinite ease-in-out',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"
          style={{
            animation: 'float 25s infinite ease-in-out reverse',
          }}
        />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 px-4 py-6 sm:px-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V12C2 18.6 7 24 12 24C17 24 22 18.6 22 12V7L12 2Z" fill="white" />
                <path d="M12 11L8 14L11 17L16 12" stroke="#0f172a" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">شركة مياه الموارد</h2>
              <p className="text-xs text-slate-400">Management System</p>
            </div>
          </div>

          {/* Auth Button */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-all active:scale-95 border border-red-500/30"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">الخروج</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-all active:scale-95 border border-cyan-500/30"
            >
              <LogIn className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">الدخول</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-2xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              مرحبا بك في نظام
              <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 text-transparent bg-clip-text mt-2">
                إدارة المياه
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-md mx-auto">
              إدارة العملاء والمنتجات والمبيعات بكل سهولة وكفاءة
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {/* Clients Card */}
            <Link to="/clients" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/20">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">العملاء</h3>
                  <p className="text-sm text-slate-400">إدارة وتتبع جميع العملاء</p>
                  <div className="mt-4 inline-flex items-center text-cyan-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
                    انتقل إلى <span className="mr-2">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Products Card */}
            <Link to="/products" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 sm:p-8 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">المنتجات</h3>
                  <p className="text-sm text-slate-400">إدارة قائمة المنتجات والأسعار</p>
                  <div className="mt-4 inline-flex items-center text-emerald-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
                    انتقل إلى <span className="mr-2">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Inventory Card */}
            <Link to="/inventory" className="group">

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 sm:p-8 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />


                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">الجرد</h3>
                  <p className="text-sm text-slate-400">متابعة المبيعات والمخزون</p>
                  <div className="mt-4 inline-flex items-center text-amber-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
                    انتقل إلى <span className="mr-2">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-10 sm:mt-12">
            <div className="rounded-xl bg-slate-800/30 border border-slate-700/30 p-4 text-center backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-bold text-cyan-400">0</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">عملاء نشطين</p>
            </div>
            <div className="rounded-xl bg-slate-800/30 border border-slate-700/30 p-4 text-center backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-bold text-emerald-400">0</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">منتجات</p>
            </div>
            <div className="rounded-xl bg-slate-800/30 border border-slate-700/30 p-4 text-center backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-bold text-amber-400">0</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">عمليات بيع</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-4 py-6 sm:py-8 border-t border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-slate-400">© 2025 شركة مياه الموارد. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
} 

