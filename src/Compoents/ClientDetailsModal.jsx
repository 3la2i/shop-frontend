import { User, ShoppingBag, CreditCard, Plus, X } from "lucide-react";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import PurchaseForm from "./PurchaseForm";

export default function ClientDetailsModal({
  isOpen,
  onClose,
  clientDetails,
  detailsLoading,
  onAddPayment,
  onCreatePurchase,
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
      throw error;
    }
  };

  const handlePurchaseSubmit = async (purchaseData) => {
    try {
      await onCreatePurchase(purchaseData);
      setPurchaseFormOpen(false);
    } catch (error) {
      console.error("Purchase error:", error);
      throw error;
    }
  };

  const handleClosePaymentForm = () => {
    setPaymentFormOpen(false);
    setSelectedPurchase(null);
  };

  const handleClosePurchaseForm = () => {
    setPurchaseFormOpen(false);
  };

  // Extract client info - handle both nested and flat structures
  const client = clientDetails?.client || clientDetails;
  const purchases = clientDetails?.purchases || [];
  const payments = clientDetails?.payments || [];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-surface border-t border-border rounded-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-5 duration-300">
          <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-text text-xl font-bold">تفاصيل العميل</h2>
            <button
              className="p-2 hover:bg-surface-light rounded-lg transition-colors text-text-secondary"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-4" dir="rtl">
            {detailsLoading ? (
              <div className="text-text-tertiary text-center py-8">جاري تحميل التفاصيل...</div>
            ) : client && client._id ? (
              <>
                {/* Client Info Card */}
                <div className="bg-surface-light border border-border rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b border-border bg-primary/5">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-text font-semibold">معلومات العميل</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-text-tertiary text-sm">الاسم</p>
                      <p className="text-text font-medium">{client.name}</p>
                    </div>
                    {client.phone && (
                      <div>
                        <p className="text-text-tertiary text-sm">الهاتف</p>
                        <p className="text-text font-medium">{client.phone}</p>
                      </div>
                    )}
                    {client.address && (
                      <div>
                        <p className="text-text-tertiary text-sm">العنوان</p>
                        <p className="text-text font-medium">{client.address}</p>
                      </div>
                    )}
                    {client.notes && (
                      <div>
                        <p className="text-text-tertiary text-sm">ملاحظات</p>
                        <p className="text-text text-sm">{client.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Purchases Card */}
                <div className="bg-surface-light border border-border rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-border bg-accent/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <span className="text-text font-semibold">المشتريات</span>
                        <p className="text-text-tertiary text-xs">({purchases?.length || 0})</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCreatePurchase}
                      className="bg-accent hover:bg-accent-dark text-white text-xs py-2 px-3 rounded-lg flex items-center gap-1 transition-colors active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      إضافة
                    </button>
                  </div>
                  <div className="p-4">
                    {(purchases?.length || 0) === 0 ? (
                      <p className="text-text-tertiary text-sm text-center py-6">لا توجد مشتريات</p>
                    ) : (
                      <div className="space-y-3">
                        {(purchases || []).map((purchase) => {
                          const remainingDebt =
                            typeof purchase.remainingDebt === "number"
                              ? purchase.remainingDebt
                              : purchase.totalAmount - purchase.amountPaid;
                          return (
                            <div key={purchase._id} className="bg-surface rounded-xl p-3 border border-border/50">
                              <div className="flex justify-between items-start mb-3">
                                <span className="text-xs bg-surface-light text-text-secondary rounded px-2 py-1">
                                  {new Date(purchase.date).toLocaleDateString("en-GB")}
                                </span>
                                <span
                                  className={`text-xs rounded px-2 py-1 font-medium ${
                                    purchase.paymentStatus === "paid"
                                      ? "bg-accent/20 text-accent"
                                      : purchase.paymentStatus === "partial"
                                        ? "bg-warning/20 text-warning"
                                        : "bg-danger/20 text-danger"
                                  }`}
                                >
                                  {purchase.paymentStatus === "paid"
                                    ? "مكتمل"
                                    : purchase.paymentStatus === "partial"
                                      ? "جزئي"
                                      : "غير مدفوع"}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="bg-surface-light rounded-lg p-2">
                                  <p className="text-text-tertiary text-xs">الإجمالي</p>
                                  <p className="text-text font-semibold text-sm">{purchase.totalAmount} د.أ</p>
                                </div>
                                <div className="bg-surface-light rounded-lg p-2">
                                  <p className="text-text-tertiary text-xs">المدفوع</p>
                                  <p className="text-accent font-semibold text-sm">{purchase.amountPaid} د.أ</p>
                                </div>
                                <div className="bg-surface-light rounded-lg p-2">
                                  <p className="text-text-tertiary text-xs">المتبقي</p>
                                  <p className="text-warning font-semibold text-sm">{remainingDebt} د.أ</p>
                                </div>
                              </div>
                              {purchase.items?.length > 0 && (
                                <div className="text-xs text-text-tertiary mb-3 space-y-1">
                                  <p className="font-medium text-text-secondary">المنتجات:</p>
                                  {purchase.items.map((item, idx) => (
                                    <p key={idx} className="text-text-tertiary">
                                      • {item.productId?.name || "---"} × {item.quantity}
                                    </p>
                                  ))}
                                </div>
                              )}
                              {remainingDebt > 0 && (
                                <button
                                  onClick={() => handleAddPayment(purchase)}
                                  className="w-full bg-primary hover:bg-primary-dark text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors active:scale-95 font-medium"
                                >
                                  <Plus className="w-3.5 h-3.5" />
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

                {/* Payments Card */}
                <div className="bg-surface-light border border-border rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b border-border bg-primary/5">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-text font-semibold">المدفوعات</span>
                      <p className="text-text-tertiary text-xs">({payments?.length || 0})</p>
                    </div>
                  </div>
                  <div className="p-4">
                    {(payments?.length || 0) === 0 ? (
                      <p className="text-text-tertiary text-sm text-center py-6">لا توجد مدفوعات</p>
                    ) : (
                      <div className="space-y-2">
                        {(payments || []).map((payment) => (
                          <div
                            key={payment._id}
                            className="bg-surface rounded-xl p-3 border border-border/50 flex items-start justify-between"
                          >
                            <div className="flex-1">
                              <p className="text-text font-semibold">{payment.amount} د.أ</p>
                              <p className="text-text-tertiary text-xs mt-0.5">الطريقة: {payment.method || "-"}</p>
                            </div>
                            <span className="text-xs bg-surface-light text-text-tertiary rounded px-2 py-1 whitespace-nowrap mr-3">
                              {new Date(payment.date).toLocaleDateString("en-GB")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
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