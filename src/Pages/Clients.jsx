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

  // Enhanced submit handler with error handling
  const onSubmit = async (e) => {
    try {
      await handleSubmit(e);
      toast({ 
        title: editingClient ? "تم التحديث" : "تم الإضافة", 
        description: editingClient ? "تم تحديث بيانات العميل بنجاح" : "تم إضافة العميل الجديد بنجاح" 
      });
    } catch (error) {
      toast({ 
        title: "خطأ", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  // Enhanced delete handler with confirmation
  const onDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      try {
        await handleDelete(id);
        toast({ title: "تم الحذف", description: "تم حذف العميل بنجاح" });
      } catch (error) {
        toast({ 
          title: "خطأ", 
          description: error.message, 
          variant: "destructive" 
        });
      }
    }
  };

  // Enhanced details handler with error handling
  const onShowDetails = async (clientId) => {
    try {
      await handleShowDetails(clientId);
      toast({ 
        title: "تم التحميل", 
        description: "تم تحميل تفاصيل العميل بنجاح" 
      });
    } catch (error) {
      toast({ 
        title: "خطأ", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  const onAddPayment = async (paymentData) => {
    try {
      await addPaymentToPurchase(paymentData);
      toast({ 
        title: "تم الإضافة", 
        description: "تم إضافة الدفعة بنجاح" 
      });
    } catch (error) {
      toast({ 
        title: "خطأ", 
        description: error.message, 
        variant: "destructive" 
      });
      throw error; // Re-throw to be handled by the form
    }
  };

  const onCreatePurchase = async (purchaseData) => {
    try {
      await createPurchaseForClient(purchaseData);
      toast({ 
        title: "تم الإضافة", 
        description: "تم إضافة المشترى بنجاح" 
      });
    } catch (error) {
      toast({ 
        title: "خطأ", 
        description: error.message, 
        variant: "destructive" 
      });
      throw error; // Re-throw to be handled by the form
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4" dir="rtl">
      <Toast toasts={toasts} remove={remove} />
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">العملاء</h1>
          <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center text-sm">
            <Plus className="w-4 h-4 ml-1" /> إضافة عميل
          </button>
        </div>
        <ClientForm
          showForm={showAddForm}
          editingClient={editingClient}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          onCancel={resetForm}
        />
        {loading ? (
          <LoadingSpinner message="جاري تحميل العملاء..." />
        ) : (
          <div className="space-y-3">
            {clients.length === 0 ? (
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
        <ClientDetailsModal
          isOpen={detailsModalOpen}
          onClose={closeDetailsModal}
          clientDetails={clientDetails}
          detailsLoading={detailsLoading}
          onAddPayment={onAddPayment}
          onCreatePurchase={onCreatePurchase}
        />
      </div>
    </div>
  );
} 