import { Package, X } from "lucide-react";

export default function ProductForm({ showForm, editingProduct, formData, setFormData, onSubmit, onCancel }) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Package className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-slate-100 text-lg font-semibold">
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-700 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-5" dir="rtl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">اسم المنتج *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="أدخل اسم المنتج"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">الفئة</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="مثل: مياه، معدات"
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">الحجم</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="مثل: 18L، 1000L"
              />
            </div>

            {/* Wholesale Price */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">سعر الجملة *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.wholesalePrice}
                onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="0.00"
                required
              />
            </div>

            {/* Retail Price */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">سعر التجزئة</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.retailPrice}
                onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="0.00"
              />
            </div>

            {/* Quantity in Stock */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">الكمية في المخزن</label>
              <input
                type="number"
                min="0"
                value={formData.quantityInStock}
                onChange={(e) => setFormData({ ...formData, quantityInStock: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
              placeholder="أضف وصف للمنتج..."
              rows="3"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg font-medium transition-all"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-900 rounded-lg font-medium transition-all"
            >
              {editingProduct ? "تحديث المنتج" : "إضافة المنتج"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 