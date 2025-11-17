import { Phone, MapPin, FileText, User } from "lucide-react";

export default function ClientForm({ 
  showForm, 
  editingClient, 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel 
}) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center backdrop-blur-md bg-opacity-40">
      <div className="w-full max-w-md bg-slate-800 border-t border-slate-700 rounded-t-lg p-6 animate-slide-up relative">
        <button onClick={onCancel} className="absolute top-2 left-2 text-white text-xl">×</button>
        <div className="text-white text-right text-lg font-bold mb-4">
          {editingClient ? "تعديل العميل" : "إضافة عميل جديد"}
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm flex items-center">
              <User className="w-4 h-4 ml-1" />
              الاسم *
            </label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              className="w-full bg-slate-700 border border-slate-600 text-white mt-1 rounded px-2 py-1" 
              required 
            />
          </div>
          
          <div>
            <label className="text-white text-sm flex items-center">
              <Phone className="w-4 h-4 ml-1" />
              رقم الهاتف
            </label>
            <input 
              type="tel" 
              value={formData.phone} 
              onChange={e => setFormData({ ...formData, phone: e.target.value })} 
              className="w-full bg-slate-700 border border-slate-600 text-white mt-1 rounded px-2 py-1" 
              placeholder="+962xxxxxxxxx" 
            />
          </div>
          
          <div>
            <label className="text-white text-sm flex items-center">
              <MapPin className="w-4 h-4 ml-1" />
              العنوان
            </label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={e => setFormData({ ...formData, address: e.target.value })} 
              className="w-full bg-slate-700 border border-slate-600 text-white mt-1 rounded px-2 py-1" 
            />
          </div>
          
          <div>
            <label className="text-white text-sm flex items-center">
              <FileText className="w-4 h-4 ml-1" />
              ملاحظات
            </label>
            <textarea 
              value={formData.notes} 
              onChange={e => setFormData({ ...formData, notes: e.target.value })} 
              className="w-full bg-slate-700 border border-slate-600 text-white mt-1 rounded px-2 py-1" 
              rows={3} 
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded py-2"
            >
              {editingClient ? "تحديث" : "إضافة"}
            </button>
            <button 
              type="button" 
              onClick={onCancel} 
              className="flex-1 border border-slate-600 text-white hover:bg-slate-700 bg-transparent rounded py-2"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 