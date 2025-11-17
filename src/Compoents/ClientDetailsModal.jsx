import { User, ShoppingBag, CreditCard, Plus } from "lucide-react";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import PurchaseForm from "./PurchaseForm";

export default function ClientDetailsModal({ 
  isOpen, 
  onClose, 
  clientDetails, 
  detailsLoading,
  onAddPayment,
  onCreatePurchase
}) {
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [purchaseFormOpen, setPurchaseFormOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  if (!isOpen) return null;

  const handleAddPayment = (purchase) => {
    setSelectedPurchase(purchase);
    setPaymentFormOpen(true);
  };

  const handleCreatePurchase = () => {
    setPurchaseFormOpen(true);
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      await onAddPayment(paymentData);
      setPaymentFormOpen(false);
      setSelectedPurchase(null);
    } catch (error) {
      console.error("Payment error:", error);
      throw error; // Re-throw to be handled by the form
    }
  };

  const handlePurchaseSubmit = async (purchaseData) => {
    try {
      await onCreatePurchase(purchaseData);
      setPurchaseFormOpen(false);
    } catch (error) {
      console.error("Purchase error:", error);
      throw error; // Re-throw to be handled by the form
    }
  };

  const handleClosePaymentForm = () => {
    setPaymentFormOpen(false);
    setSelectedPurchase(null);
  };

  const handleClosePurchaseForm = () => {
    setPurchaseFormOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-60">
        <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-sm w-full p-6 relative max-h-[90vh] overflow-y-auto">
          <button 
            className="absolute top-2 left-2 text-white text-2xl font-bold" 
            onClick={onClose}
          >
            ×
          </button>
          <div className="text-white text-right text-lg font-bold mb-4">تفاصيل العميل</div>
          
          {detailsLoading ? (
            <div className="text-white text-center py-8">جاري تحميل التفاصيل...</div>
          ) : clientDetails ? (
            <div className="space-y-4" dir="rtl">
              {/* Client Info */}
              <div className="bg-slate-700 border border-slate-600 rounded-lg mb-2">
                <div className="flex items-center p-3 border-b border-slate-600">
                  <User className="w-4 h-4 ml-1 text-white" />
                  <span className="text-white text-sm font-bold">معلومات العميل</span>
                </div>
                <div className="p-3 text-sm">
                  <div className="text-white">
                    <span className="font-semibold">الاسم:</span> {clientDetails.client.name}
                  </div>
                  <div className="text-slate-300">
                    <span className="font-semibold">الهاتف:</span> {clientDetails.client.phone || "-"}
                  </div>
                  <div className="text-slate-300">
                    <span className="font-semibold">العنوان:</span> {clientDetails.client.address || "-"}
                  </div>
                  {clientDetails.client.notes && (
                    <div className="text-slate-300">
                      <span className="font-semibold">ملاحظات:</span> {clientDetails.client.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Purchases */}
              <div className="bg-slate-700 border border-slate-600 rounded-lg mb-2">
                <div className="flex items-center justify-between p-3 border-b border-slate-600">
                  <div className="flex items-center">
                    <ShoppingBag className="w-4 h-4 ml-1 text-white" />
                    <span className="text-white text-sm font-bold">
                      المشتريات ({clientDetails.purchases.length})
                    </span>
                  </div>
                  <button
                    onClick={handleCreatePurchase}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded flex items-center transition-colors"
                  >
                    <Plus className="w-3 h-3 ml-1" />
                    إضافة مشترى
                  </button>
                </div>
                <div className="p-3">
                  {clientDetails.purchases.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4">لا يوجد مشتريات</p>
                  ) : (
                    <div className="space-y-3">
                      {clientDetails.purchases.map((purchase) => {
                        const remainingDebt = typeof purchase.remainingDebt === "number" ? 
                          purchase.remainingDebt : 
                          purchase.totalAmount - purchase.amountPaid;
                        
                        return (
                          <div key={purchase._id} className="bg-slate-600 rounded-lg p-3 mb-2">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs bg-slate-500 text-white rounded px-2 py-0.5">
                                {new Date(purchase.date).toLocaleDateString("en-GB")}
                              </span>
                              <span className={`text-xs rounded px-2 py-0.5 ${
                                purchase.paymentStatus === "paid" ? "bg-green-600 text-white" : 
                                purchase.paymentStatus === "partial" ? "bg-yellow-600 text-white" : 
                                "bg-red-600 text-white"
                              }`}>
                                {purchase.paymentStatus === "paid" ? "مكتمل" : 
                                 purchase.paymentStatus === "partial" ? "جزئي" : "غير مدفوع"}
                              </span>
                            </div>
                            <div className="text-sm text-white space-y-1">
                              <div>الإجمالي: {purchase.totalAmount} د.أ</div>
                              <div>المدفوع: {purchase.amountPaid} د.أ</div>
                              <div>المتبقي: {remainingDebt} د.أ</div>
                            </div>
                            <div className="mt-2 text-xs text-slate-300">
                              المنتجات:
                              <ul className="mt-1 space-y-1">
                                {purchase.items.map((item, idx) => (
                                  <li key={idx}>• {item.productId?.name || "---"} × {item.quantity}</li>
                                ))}
                              </ul>
                            </div>
                            {purchase.notes && (
                              <div className="text-xs text-slate-400 mt-1">{purchase.notes}</div>
                            )}
                            
                            {/* Add Payment Button */}
                            {remainingDebt > 0 && (
                              <button
                                onClick={() => handleAddPayment(purchase)}
                                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3 ml-1" />
                                إضافة دفعة
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Payments */}
              <div className="bg-slate-700 border border-slate-600 rounded-lg mb-2">
                <div className="flex items-center p-3 border-b border-slate-600">
                  <CreditCard className="w-4 h-4 ml-1 text-white" />
                  <span className="text-white text-sm font-bold">
                    المدفوعات ({clientDetails.payments.length})
                  </span>
                </div>
                <div className="p-3">
                  {clientDetails.payments.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4">لا يوجد مدفوعات</p>
                  ) : (
                    <div className="space-y-3">
                      {clientDetails.payments.map((payment) => (
                        <div key={payment._id} className="bg-slate-600 rounded-lg p-3 mb-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-semibold">{payment.amount} د.أ</span>
                            <span className="text-xs bg-slate-500 text-white rounded px-2 py-0.5">
                              {new Date(payment.date).toLocaleDateString("en-GB")}
                            </span>
                          </div>
                          <div className="text-sm text-slate-300">الطريقة: {payment.method || "-"}</div>
                          {payment.note && (
                            <div className="text-xs text-slate-400 mt-1">{payment.note}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Payment Form Modal */}
      {selectedPurchase && (
        <PaymentForm
          isOpen={paymentFormOpen}
          onClose={handleClosePaymentForm}
          onSubmit={handlePaymentSubmit}
          purchase={selectedPurchase}
          remainingDebt={
            typeof selectedPurchase.remainingDebt === "number" ? 
            selectedPurchase.remainingDebt : 
            selectedPurchase.totalAmount - selectedPurchase.amountPaid
          }
        />
      )}

      {/* Purchase Form Modal */}
      <PurchaseForm
        isOpen={purchaseFormOpen}
        onClose={handleClosePurchaseForm}
        onSubmit={handlePurchaseSubmit}
      />
    </>
  );
} 