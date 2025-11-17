import { Plus } from "lucide-react";
import { 
  Toast, 
  useToast, 
  ProductForm, 
  ProductCard, 
  EmptyState, 
  LoadingSpinner,
  useProducts 
} from "../Compoents";

export default function Products() {
  const { toast, toasts, remove } = useToast();
  const {
    products,
    loading,
    showAddForm,
    editingProduct,
    formData,
    setShowAddForm,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useProducts();

  // Enhanced submit handler with error handling
  const onSubmit = async (e) => {
    try {
      await handleSubmit(e);
      toast({ 
        title: editingProduct ? "تم التحديث" : "تم الإضافة", 
        description: editingProduct ? "تم تحديث بيانات المنتج بنجاح" : "تم إضافة المنتج الجديد بنجاح" 
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
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      try {
        await handleDelete(id);
        toast({ title: "تم الحذف", description: "تم حذف المنتج بنجاح" });
      } catch (error) {
        toast({ 
          title: "خطأ", 
          description: error.message, 
          variant: "destructive" 
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4" dir="rtl">
      <Toast toasts={toasts} remove={remove} />
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">المنتجات</h1>
          <button 
            onClick={() => setShowAddForm(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center text-sm"
          >
            <Plus className="w-4 h-4 ml-1" /> إضافة منتج
          </button>
        </div>

        {/* Product Form */}
        <ProductForm
          showForm={showAddForm}
          editingProduct={editingProduct}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          onCancel={resetForm}
        />

        {/* Products List */}
        {loading ? (
          <LoadingSpinner message="جاري تحميل المنتجات..." />
        ) : (
          <div className="space-y-4">
            {products.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 