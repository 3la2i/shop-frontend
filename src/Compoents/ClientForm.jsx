import { Phone, MapPin, FileText, User, X } from "lucide-react";

export default function ClientForm({ showForm, editingClient, formData, setFormData, onSubmit, onCancel }) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-md bg-surface border-t border-border rounded-3xl p-6 pb-8 animate-in slide-in-from-bottom-5 duration-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 p-2 hover:bg-surface-light rounded-lg transition-colors text-text-secondary"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-text text-2xl font-bold">{editingClient ? "تعديل العميل" : "عميل جديد"}</h2>
          <p className="text-text-tertiary text-sm mt-1">
            {editingClient ? "حدّث معلومات العميل" : "أضف عميل جديد إلى قائمتك"}
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-text-secondary text-sm font-medium flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-primary" />
              الاسم
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-surface-light border border-border text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-text-tertiary"
              placeholder="أدخل اسم العميل"
              required
            />
          </div>
          <div>
            <label className="text-text-secondary text-sm font-medium flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-primary" />
              رقم الهاتف
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-surface-light border border-border text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-text-tertiary"
              placeholder="+962xxxxxxxxx"
            />
          </div>
          <div>
            <label className="text-text-secondary text-sm font-medium flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              العنوان
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-surface-light border border-border text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-text-tertiary"
              placeholder="أدخل العنوان"
            />
          </div>
          <div>
            <label className="text-text-secondary text-sm font-medium flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              ملاحظات
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-surface-light border border-border text-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder-text-tertiary resize-none"
              placeholder="أضف أي ملاحظات إضافية"
              rows={3}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-lg py-3 font-semibold transition-colors active:scale-95 disabled:opacity-50"
            >
              {editingClient ? "تحديث" : "إضافة"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-border text-text hover:bg-surface-light rounded-lg py-3 font-semibold transition-colors active:scale-95"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 