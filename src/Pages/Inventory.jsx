import { EmptyState, LoadingSpinner, Toast, useToast, useInventory } from "../Compoents";

export default function Inventory() {
  const { toast, toasts, remove } = useToast();
  const { purchases, summary, loading, clients, filters, setFilters, refetch } = useInventory();

  const formatCurrency = (n) => (Number(n || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Add quick date range presets
  const applyDatePreset = (preset) => {
    const today = new Date();
    const start = new Date();
    
    switch(preset) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        setFilters(f => ({ ...f, startDate: start.toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] }));
        break;
      case 'week':
        start.setDate(today.getDate() - 7);
        setFilters(f => ({ ...f, startDate: start.toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] }));
        break;
      case 'month':
        start.setMonth(today.getMonth() - 1);
        setFilters(f => ({ ...f, startDate: start.toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] }));
        break;
      case 'year':
        start.setFullYear(today.getFullYear() - 1);
        setFilters(f => ({ ...f, startDate: start.toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] }));
        break;
      case 'clear':
        setFilters(f => ({ ...f, startDate: '', endDate: '' }));
        break;
    }
  };

  const exportPdf = () => {
    window.print();
  };
  const exportCsv = () => {
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
  const statusLabel = (s) => s === 'paid' ? 'مدفوع' : s === 'partial' ? 'مدفوع جزئياً' : 'غير مدفوع';
  const badgeClass = (s) => s === 'paid' ? 'bg-green-100 text-green-700' : s === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';

  // Icon components
  const CalendarIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const StatusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4" dir="rtl">
      <div className="no-print">
        <Toast toasts={toasts} remove={remove} />
      </div>
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-white print:text-black">جرد المبيعات</h1>
          
          {/* Advanced Filter Panel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 no-print">
            {/* Filter Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/20">
              <FilterIcon />
              <h2 className="text-lg font-semibold text-white">الفلاتر المتقدمة</h2>
            </div>

            {/* Quick Date Presets */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-200 mb-2 flex items-center gap-1">
                <CalendarIcon />
                <span>نطاق التاريخ السريع</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'today', label: 'اليوم' },
                  { key: 'week', label: 'آخر 7 أيام' },
                  { key: 'month', label: 'آخر شهر' },
                  { key: 'year', label: 'آخر سنة' },
                  { key: 'clear', label: 'مسح' }
                ].map(preset => (
                  <button
                    key={preset.key}
                    onClick={() => applyDatePreset(preset.key)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="relative">
                <label className="block text-xs font-medium text-slate-200 mb-1.5">من تاريخ</label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <CalendarIcon />
                  </div>
                  <input
                    type="date"
                    className="w-full rounded-lg bg-white/95 backdrop-blur-sm px-3 py-2.5 pr-10 text-sm border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                    value={filters.startDate}
                    onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-medium text-slate-200 mb-1.5">إلى تاريخ</label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <CalendarIcon />
                  </div>
                  <input
                    type="date"
                    className="w-full rounded-lg bg-white/95 backdrop-blur-sm px-3 py-2.5 pr-10 text-sm border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                    value={filters.endDate}
                    onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Other Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5 flex items-center gap-1">
                  <UserIcon />
                  <span>العميل</span>
                </label>
                <select
                  className="w-full rounded-lg bg-white/95 backdrop-blur-sm px-3 py-2.5 text-sm border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                  value={filters.customerId}
                  onChange={(e) => setFilters((f) => ({ ...f, customerId: e.target.value }))}
                >
                  <option value="">الكل</option>
                  {clients.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5 flex items-center gap-1">
                  <StatusIcon />
                  <span>الحالة</span>
                </label>
                <select
                  className="w-full rounded-lg bg-white/95 backdrop-blur-sm px-3 py-2.5 text-sm border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/20">
              <button
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => {
                  refetch().catch(() => toast({ title: "خطأ", description: "فشل في تحديث الجرد", variant: "destructive" }));
                }}
              >
                <RefreshIcon />
                <span>تحديث</span>
              </button>
              <button
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={exportCsv}
              >
                <DownloadIcon />
                <span>تصدير CSV</span>
              </button>
              <button
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={exportPdf}
              >
                <DownloadIcon />
                <span>تصدير PDF</span>
              </button>
            </div>
          </div>
        </div>

        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white rounded p-3">
              <div className="text-slate-500 text-xs">إجمالي المبيعات</div>
              <div className="text-xl font-bold">{formatCurrency(summary.overall.totalSales)}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-slate-500 text-xs">المدفوع</div>
              <div className="text-xl font-bold">{formatCurrency(summary.overall.totalPaid)}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-slate-500 text-xs">المتبقي</div>
              <div className="text-xl font-bold">{formatCurrency(summary.overall.totalDebt)}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-slate-500 text-xs">عدد الفواتير</div>
              <div className="text-xl font-bold">{summary.overall.count}</div>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <LoadingSpinner message="جاري تحميل الجرد..." />
        ) : purchases.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {purchases.map((p) => (
              <div key={p._id} className="bg-white rounded shadow p-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">{new Date(p.date || p.createdAt).toLocaleString()}</div>
                  <span className={`text-xs px-2 py-0.5 rounded ${badgeClass(p.paymentStatus)}`}>{statusLabel(p.paymentStatus)}</span>
                </div>
                <div className="mt-1 text-slate-800 font-medium">{p.customerId?.name || "—"}</div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-50 rounded p-2">
                    <div className="text-slate-500">الإجمالي</div>
                    <div className="font-semibold">{formatCurrency(p.totalAmount)}</div>
                  </div>
                  <div className="bg-slate-50 rounded p-2">
                    <div className="text-slate-500">المدفوع</div>
                    <div className="font-semibold">{formatCurrency(p.amountPaid)}</div>
                  </div>
                  <div className="bg-slate-50 rounded p-2">
                    <div className="text-slate-500">المتبقي</div>
                    <div className="font-semibold">{formatCurrency(p.remainingDebt)}</div>
                  </div>
                </div>
                {(p.items?.length || 0) > 0 && (
                  <details className="mt-2">
                    <summary className="text-sm text-slate-700 cursor-pointer">العناصر</summary>
                    <div className="mt-2 space-y-1 text-sm">
                      {p.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="text-slate-700">{it.productId?.name || 'منتج'}</div>
                          <div className="text-slate-500">× {it.quantity} @ {formatCurrency(it.unitPrice)}</div>
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


