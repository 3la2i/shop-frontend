import { useState } from "react";
import { CreditCard, X } from "lucide-react";

export default function PaymentForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  purchase, 
  remainingDebt 
}) {
  const [formData, setFormData] = useState({
    amount: "",
    method: "cash",
    note: ""
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        purchaseId: purchase._id,
        amount: parseFloat(formData.amount),
        method: formData.method,
        note: formData.note
      });
      handleClose();
    } catch (error) {
      console.error("Payment submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ amount: "", method: "cash", note: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-sm w-full p-6 relative animate-slide-up">
        <button 
          className="absolute top-2 left-2 text-white text-2xl font-bold hover:text-slate-300" 
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 ml-2 text-blue-400" />
          <span className="text-white text-lg font-bold">إضافة دفعة</span>
        </div>

        <div className="mb-4 p-3 bg-slate-700 rounded-lg">
          <div className="text-sm text-slate-300 mb-1">المشتري:</div>
          <div className="text-white font-semibold">
            {purchase.items.map((item, idx) => (
              <span key={idx}>
                {item.productId?.name || "---"} × {item.quantity}
                {idx < purchase.items.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <div className="text-sm text-slate-400 mt-1">
            المتبقي: <span className="text-yellow-400 font-semibold">{remainingDebt} د.أ</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              مبلغ الدفعة
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={remainingDebt}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              placeholder={`أقصى مبلغ: ${remainingDebt} د.أ`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              طريقة الدفع
            </label>
            <select
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="cash">نقداً</option>
              <option value="transfer">تحويل بنكي</option>
              <option value="check">شيك</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              ملاحظات (اختياري)
            </label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="أضف ملاحظات إضافية..."
              rows="2"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading || !formData.amount || parseFloat(formData.amount) <= 0}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {loading ? "جاري الإضافة..." : "إضافة الدفعة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 