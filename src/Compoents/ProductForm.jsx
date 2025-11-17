import { Package, X } from "lucide-react";

export default function ProductForm({ 
  showForm, 
  editingProduct, 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel 
}) {
  if (!showForm) return null;

  return (
    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 mb-4 animate-slide-up">
      <div className="flex items-center mb-4">
        <Package className="w-5 h-5 ml-2 text-blue-400" />
        <span className="text-white text-lg font-bold">
          {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
        </span>
        <button 
          onClick={onCancel}
          className="mr-auto text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              اسم المنتج *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="أدخل اسم المنتج"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              الفئة
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="مثل: مياه، معدات"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              الحجم
            </label>
            <input
              type="text"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="مثل: 18L، 1000L"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              سعر الجملة *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.wholesalePrice}
              onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              سعر التجزئة
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.retailPrice}
              onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              الكمية في المخزن
            </label>
            <input
              type="number"
              min="0"
              value={formData.quantityInStock}
              onChange={(e) => setFormData({ ...formData, quantityInStock: e.target.value })}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            الوصف
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
            placeholder="أضف وصف للمنتج..."
            rows="3"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {editingProduct ? "تحديث المنتج" : "إضافة المنتج"}
          </button>
        </div>
      </form>
    </div>
  );
} 