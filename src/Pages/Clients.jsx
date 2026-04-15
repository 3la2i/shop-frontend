import { Plus } from "lucide-react";
import { 
  Toast, 
  useToast, 
  ClientForm, 
  ClientCard, 
  ClientDetailsModal, 
  EmptyState, 
  LoadingSpinner,
  useClients 
} from "../Compoents";

export default function Clients() {
  const { toast, toasts, remove } = useToast();
  const {
    clients,
    loading,
    showAddForm,
    editingClient,
    formData,
    detailsModalOpen,
    clientDetails,
    detailsLoading,
    setShowAddForm,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleShowDetails,
    resetForm,
    closeDetailsModal,
    addPaymentToPurchase,
    createPurchaseForClient,
  } = useClients();

  const onSubmit = async (e) => {
    try {
      await handleSubmit(e);
      toast({
        title: editingClient ? "تم التحديث" : "تم الإضافة",
        description: editingClient ? "تم تحديث بيانات العميل بنجاح" : "تم إضافة العميل الجديد بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      try {
        await handleDelete(id);
        toast({ title: "تم الحذف", description: "تم حذف العميل بنجاح" });
      } catch (error) {
        toast({
          title: "خطأ",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const onShowDetails = async (clientId) => {
    try {
      await handleShowDetails(clientId);
    } catch (error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onAddPayment = async (paymentData) => {
    try {
      await addPaymentToPurchase(paymentData);
      toast({
        title: "تم الإضافة",
        description: "تم إضافة الدفعة بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const onCreatePurchase = async (purchaseData) => {
    try {
      await createPurchaseForClient(purchaseData);
      toast({
        title: "تم الإضافة",
        description: "تم إضافة المشترى بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4" dir="rtl">
      <Toast toasts={toasts} remove={remove} />
      <div className=" top-0 z-30 bg-surface/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="  mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text">العملاء</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary hover:bg-primary-dark text-white p-3 rounded-xl flex items-center justify-center transition-colors active:scale-95"
            title="إضافة عميل جديد"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <ClientForm
        showForm={showAddForm}
        editingClient={editingClient}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        onCancel={resetForm}
      />
      <div className="max-w-md mx-auto px-4 py-4 pb-10">
        {loading ? (
          <LoadingSpinner message="جاري تحميل العملاء..." />
        ) : (
          <div className="space-y-3">
            {!Array.isArray(clients) || clients.length === 0 ? (
              <EmptyState />
            ) : (
              clients.map((client) => (
                <ClientCard
                  key={client._id}
                  client={client}
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  onShowDetails={onShowDetails}
                />
              ))
            )}
          </div>
        )}
      </div>
      <ClientDetailsModal
        isOpen={detailsModalOpen}
        onClose={closeDetailsModal}
        clientDetails={clientDetails}
        detailsLoading={detailsLoading}
        onAddPayment={onAddPayment}
        onCreatePurchase={onCreatePurchase}
      />
    </div>
  );
} 