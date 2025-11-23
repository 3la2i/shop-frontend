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

  const onSubmit = async (e) => {
    try {
      await handleSubmit(e);
      toast({
        title: editingProduct ? "تم التحديث" : "تم الإضافة",
        description: editingProduct ? "تم تحديث بيانات المنتج بنجاح" : "تم إضافة المنتج الجديد بنجاح",
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
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.")) {
      try {
        await handleDelete(id);
        toast({
          title: "تم الحذف",
          description: "تم حذف المنتج بنجاح",
        });
      } catch (error) {
        toast({
          title: "خطأ",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4" dir="rtl">
      <Toast toasts={toasts} remove={remove} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">المنتجات</h1>
            <p className="text-slate-400">إدارة مخزون المنتجات</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-900 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            إضافة منتج
          </button>
        </div>

        {/* Product Form Modal */}
        {showAddForm && (
          <ProductForm
            showForm={showAddForm}
            editingProduct={editingProduct}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            onCancel={resetForm}
          />
        )}

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner message="جاري تحميل المنتجات..." />
        ) : !Array.isArray(products) || products.length === 0 ? (
          <EmptyState message="لا توجد منتجات بعد. أضف أول منتج!" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onEdit={handleEdit} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 