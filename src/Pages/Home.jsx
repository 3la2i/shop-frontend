import theme from '../theme';
import { Link } from 'react-router-dom';

function UserIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" fill={theme.primary} />
      <rect x="4" y="16" width="16" height="6" rx="3" fill={theme.primary} />
    </svg>
  );
}

function DebtIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="20" rx="3" fill={theme.primary} />
      <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="3" fill={theme.primary} />
      <path d="M8 8h8M8 12h8M8 16h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="20" r="2" fill={theme.primary} />
      <circle cx="17" cy="20" r="2" fill={theme.primary} />
      <path d="M5 6h2l1 7h8l1-5H7" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill={theme.primary} />
      <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center" style={{background: `linear-gradient(135deg, ${theme.bgDark} 0%, ${theme.bgLight} 100%)`}}>
      {/* Logo */}
      <div className="mb-4">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 5C35 5 15 30 15 45C15 57.0457 24.9543 67 37 67C49.0457 67 59 57.0457 59 45C59 30 35 5 35 5Z" fill={theme.primary}/>
          <path d="M35 25C35 25 25 37 25 45C25 51.6274 30.3726 57 37 57C43.6274 57 49 51.6274 49 45C49 37 35 25 35 25Z" fill={theme.primaryDark}/>
        </svg>
      </div>
      {/* Company Name */}
      <h1 className="text-white text-2xl font-bold mb-8">شركة مياه الموارد</h1>
      {/* Main Buttons Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <Link to="/clients" className="block">
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-4 h-28 hover:shadow-lg transition-shadow cursor-pointer">
            <UserIcon />
            <span className="mt-2 text-slate-700 font-semibold">العملاء</span>
          </div>
        </Link>
        
        <Link to="/products" className="block">
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-4 h-28 hover:shadow-lg transition-shadow cursor-pointer">
            <PackageIcon />
            <span className="mt-2 text-slate-700 font-semibold">المنتجات</span>
          </div>
        </Link>
    
        {/* <Link to="/inventory" className="block">
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-4 h-28 hover:shadow-lg transition-shadow cursor-pointer">
            <DebtIcon />
            <span className="mt-2 text-slate-700 font-semibold">الديون</span>
          </div>
        </Link> */}
        
        <Link to="/inventory" className="block">
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-4 h-28 hover:shadow-lg transition-shadow cursor-pointer">
            <CartIcon />
            <span className="mt-2 text-slate-700 font-semibold">جرد المبيعات</span>
          </div>
        </Link>
      </div>
    </div>
  );
} 

