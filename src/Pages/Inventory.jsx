import { useState } from "react";
import { EmptyState, LoadingSpinner, Toast, useToast, useInventory } from "../Compoents";

export default function Inventory() {
  const { toast, toasts, remove } = useToast();
  const { purchases, summary, loading, clients, filters, setFilters, refetch } = useInventory();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const formatCurrency = (n) =>
    Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Helper function to get expected dates for a preset
  const getPresetDates = (preset) => {
    const today = new Date();
    const start = new Date();
    
    switch(preset) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        return {
          startDate: start.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0]
        };
      case 'week':
        start.setDate(today.getDate() - 7);
        return {
          startDate: start.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0]
        };
      case 'month':
        start.setMonth(today.getMonth() - 1);
        return {
          startDate: start.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0]
        };
      case 'year':
        start.setFullYear(today.getFullYear() - 1);
        return {
          startDate: start.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0]
        };
      case 'clear':
        return { startDate: '', endDate: '' };
      default:
        return null;
    }
  };

  // Check if a preset is currently active
  const isPresetActive = (preset) => {
    const presetDates = getPresetDates(preset);
    if (!presetDates) return false;
    return filters.startDate === presetDates.startDate && filters.endDate === presetDates.endDate;
  };

  // Add quick date range presets
  const applyDatePreset = (preset) => {
    const presetDates = getPresetDates(preset);
    if (presetDates) {
      setFilters(f => ({ ...f, startDate: presetDates.startDate, endDate: presetDates.endDate }));
    }
  };

  const exportPdf = () => {
    window.print();
  };
  const exportCsv = () => {
    if (!Array.isArray(purchases)) return;
    const header = ['Date','Customer','Items','Total','Paid','Remaining','Status'];
    const rows = purchases.map(p => [
      new Date(p.date || p.createdAt).toLocaleString(),
      (p.customerId?.name || ''),
      (p.items || []).map(it => `${it.productId?.name || 'منتج'} x ${it.quantity} @ ${it.unitPrice}`).join(' | '),
      p.totalAmount,
      p.amountPaid,
      p.remainingDebt,
      p.paymentStatus,
    ]);
    const csv = [header, ...rows].map(r => r.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventory.csv';
    link.click();
    URL.revokeObjectURL(url);
  };
  const statusLabel = (s) => (s === "paid" ? "مدفوع" : s === "partial" ? "مدفوع جزئياً" : "غير مدفوع");
  const badgeClass = (s) =>
    s === "paid"
      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
      : s === "partial"
        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
        : "bg-red-500/20 text-red-300 border border-red-500/30";

  const CalendarIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const StatusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const RefreshIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-4" dir="rtl">
      <div className="no-print">
        <Toast toasts={toasts} remove={remove} />
      </div>
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white print:text-black">جرد المبيعات</h1>
        </div>

        {/* Filter Panel */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-700/50 p-4 no-print transition-all duration-300">
          {/* Filter Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
            <div className="text-cyan-400">
              <FilterIcon />
            </div>
            <h2 className="text-lg font-semibold text-white">الفلاتر المتقدمة</h2>
          </div>

          {/* Quick Date Presets */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 mb-3 flex items-center gap-2">
              <div className="text-cyan-400">
                <CalendarIcon />
              </div>
              <span>نطاق التاريخ السريع</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "today", label: "اليوم" },
                { key: "week", label: "آخر 7 أيام" },
                { key: "month", label: "آخر شهر" },
                { key: "year", label: "آخر سنة" },
                { key: "clear", label: "مسح" },
              ].map((preset) => {
                const isActive = isPresetActive(preset.key);
                return (
                  <button
                    key={preset.key}
                    onClick={() => applyDatePreset(preset.key)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-cyan-500/80 hover:bg-cyan-500 text-white border border-cyan-400 shadow-lg shadow-cyan-500/20"
                        : "bg-slate-700/50 hover:bg-slate-700 text-slate-200 border border-slate-600/50 hover:border-slate-600"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 mb-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600/50 hover:border-slate-600 transition-all duration-200"
          >
            <span className="text-sm font-medium">فلترة متقدمة أكثر</span>
            {showAdvancedFilters ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="space-y-4 mb-4 animate-in slide-in-from-top-2 duration-200">
              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">من تاريخ</label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <CalendarIcon />
                    </div>
                    <input
                      type="date"
                      className="w-full rounded-lg bg-slate-700/80 backdrop-blur-sm px-3 py-2.5 pr-10 text-sm text-white border border-slate-600/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all placeholder-slate-400"
                      value={filters.startDate}
                      onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">إلى تاريخ</label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <CalendarIcon />
                    </div>
                    <input
                      type="date"
                      className="w-full rounded-lg bg-slate-700/80 backdrop-blur-sm px-3 py-2.5 pr-10 text-sm text-white border border-slate-600/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all placeholder-slate-400"
                      value={filters.endDate}
                      onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Other Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <div className="text-cyan-400">
                      <UserIcon />
                    </div>
                    <span>العميل</span>
                  </label>
                  <select
                    className="w-full rounded-lg bg-slate-700/80 backdrop-blur-sm px-3 py-2.5 text-sm text-white border border-slate-600/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                    value={filters.customerId}
                    onChange={(e) => setFilters((f) => ({ ...f, customerId: e.target.value }))}
                  >
                    <option value="">الكل</option>
                    {Array.isArray(clients) &&
                      clients.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <div className="text-cyan-400">
                      <StatusIcon />
                    </div>
                    <span>الحالة</span>
                  </label>
                  <select
                    className="w-full rounded-lg bg-slate-700/80 backdrop-blur-sm px-3 py-2.5 text-sm text-white border border-slate-600/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                    value={filters.status}
                    onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                  >
                    <option value="">الكل</option>
                    <option value="paid">مدفوع</option>
                    <option value="partial">مدفوع جزئياً</option>
                    <option value="unpaid">غير مدفوع</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700/50">
            <button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-cyan-500/20"
              onClick={() => {
                refetch().catch(() =>
                  toast({ title: "خطأ", description: "فشل في تحديث الجرد", variant: "destructive" }),
                );
              }}
            >
              <RefreshIcon />
              <span className="hidden sm:inline">تحديث</span>
            </button>
            <button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              onClick={exportCsv}
            >
            
              <DownloadIcon />
              <span className="hidden sm:inline">تصدير CSV</span>
            </button>
            <button 
            
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-emerald-500/20"
              onClick={exportPdf}
            >
              <DownloadIcon />
              <span className=" sm:inline">تصدير PDF</span>
            </button>
          </div>
        </div>
          
        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "إجمالي المبيعات",
                value: summary.overall.totalSales,
                color: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
              },
              {
                label: "المدفوع",
                value: summary.overall.totalPaid,
                color: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
              },
              {
                label: "المتبقي",
                value: summary.overall.totalDebt,
                color: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
              },
              {
                label: "عدد الفواتير",
                value: summary.overall.count,
                color: "from-slate-600/20 to-slate-700/20 border-slate-600/30",
                isCount: true,
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${card.color} border rounded-xl p-4 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="text-slate-300 text-xs font-medium">{card.label}</div>
                <div className="text-xl md:text-2xl font-bold text-white mt-2">
                  {card.isCount ? card.value : formatCurrency(card.value)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Purchases List */}
        {loading ? (
          <LoadingSpinner message="جاري تحميل الجرد..." />
        ) : !Array.isArray(purchases) || purchases.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {purchases.map((p) => (
              <div
                key={p._id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 p-4 hover:border-slate-700 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div className="text-xs text-slate-400">{new Date(p.date || p.createdAt).toLocaleString()}</div>
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${badgeClass(p.paymentStatus)}`}
                  >
                    {statusLabel(p.paymentStatus)}
                  </span>
                </div>
                <div className="text-slate-100 font-semibold mb-3">{p.customerId?.name || "—"}</div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "الإجمالي", value: p.totalAmount },
                    { label: "المدفوع", value: p.amountPaid },
                    { label: "المتبقي", value: p.remainingDebt },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-2.5">
                      <div className="text-slate-400 text-xs font-medium">{item.label}</div>
                      <div className="font-semibold text-white text-sm mt-1">{formatCurrency(item.value)}</div>
                    </div>
                  ))}
                </div>
                {(p.items?.length || 0) > 0 && (
                  <details className="group">
                    <summary className="text-sm text-slate-300 hover:text-slate-100 cursor-pointer font-medium flex items-center gap-2">
                      <span className="inline-block w-4 h-4 transition-transform group-open:rotate-90">▶</span>
                      <span>العناصر ({p.items.length})</span>
                    </summary>
                    <div className="mt-3 space-y-2 pl-4 border-l-2 border-slate-700/50">
                      {p.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="text-slate-300">{it.productId?.name || "منتج"}</div>
                          <div className="text-slate-400">
                            × {it.quantity} @ {formatCurrency(it.unitPrice)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


