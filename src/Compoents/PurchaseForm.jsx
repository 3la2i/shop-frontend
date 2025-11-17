import { useState, useEffect } from "react";
import { ShoppingBag, X, Plus, Trash2 } from "lucide-react";
import axios from "axios";

export default function PurchaseForm({ 
  isOpen, 
  onClose, 
  onSubmit
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [formData, setFormData] = useState({
    items: [{ productId: "", quantity: 1, unitPrice: 0 }],
    notes: ""
  });

  // Fetch products on component mount
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/product", {
        headers: { Authorization: token },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleProductChange = (index, field, value) => {
    const newItems = [...formData.items];
    
    if (field === 'quantity') {
      // Allow empty string, positive integers, or 0
      if (value === '' || value === '0') {
        newItems[index][field] = value;
      } else {
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue >= 0) {
          newItems[index][field] = numValue;
        }
      }
    } else if (field === 'unitPrice') {
      // Allow empty string, positive numbers, or 0
      if (value === '' || value === '0') {
        newItems[index][field] = value;
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 0) {
          newItems[index][field] = numValue;
        }
      }
    } else {
      newItems[index][field] = value;
    }
    
    // Auto-fill unit price when product is selected
    if (field === 'productId') {
      const selectedProduct = products.find(p => p._id === value);
      if (selectedProduct) {
        newItems[index].unitPrice = selectedProduct.wholesalePrice;
        // Reset quantity to 1 when product changes
        newItems[index].quantity = 1;
      }
    }
    
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: "", quantity: 1, unitPrice: 0 }]
    });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      const quantity = parseInt(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      return total + (quantity * unitPrice);
    }, 0);
  };

  const getProductStock = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.quantityInStock : 0;
  };

  const validateStock = () => {
    for (const item of formData.items) {
      if (item.productId) {
        const availableStock = getProductStock(item.productId);
        const quantity = parseInt(item.quantity) || 0;
        
        if (quantity <= 0) {
          return {
            valid: false,
            message: `يجب أن تكون الكمية أكبر من صفر`
          };
        }
        
        if (quantity > availableStock) {
          return {
            valid: false,
            message: `الكمية المطلوبة (${quantity}) أكبر من الكمية المتوفرة (${availableStock})`
          };
        }
      }
    }
    return { valid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const hasEmptyProducts = formData.items.some(item => !item.productId);
    if (hasEmptyProducts) {
      alert("يرجى اختيار المنتجات");
      return;
    }

    // Check for valid quantities and prices
    for (const item of formData.items) {
      const quantity = parseInt(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      
      if (quantity <= 0) {
        alert("يجب أن تكون الكمية أكبر من صفر");
        return;
      }
      
      if (unitPrice <= 0) {
        alert("يجب أن يكون سعر الوحدة أكبر من صفر");
        return;
      }
    }

    const total = calculateTotal();
    if (total <= 0) {
      alert("يجب أن يكون المجموع أكبر من صفر");
      return;
    }

    // Validate stock availability
    const stockValidation = validateStock();
    if (!stockValidation.valid) {
      alert(stockValidation.message);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        items: formData.items.map(item => ({
          ...item,
          quantity: parseInt(item.quantity) || 0,
          unitPrice: parseFloat(item.unitPrice) || 0
        })),
        totalAmount: total,
        notes: formData.notes
      });
      
      // Refresh products to show updated stock quantities
      fetchProducts();
      
      handleClose();
    } catch (error) {
      console.error("Purchase submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      items: [{ productId: "", quantity: 1, unitPrice: 0 }],
      notes: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full p-6 relative animate-slide-up max-h-[90vh] overflow-y-auto">
        <button 
          className="absolute top-2 left-2 text-white text-2xl font-bold hover:text-slate-300" 
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center mb-4">
          <ShoppingBag className="w-5 h-5 ml-2 text-blue-400" />
          <span className="text-white text-lg font-bold">إضافة مشترى جديد</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          {/* Products Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-white">
                المنتجات
              </label>
              <button
                type="button"
                onClick={addItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs flex items-center"
              >
                <Plus className="w-3 h-3 ml-1" />
                إضافة منتج
              </button>
            </div>
            
            {productsLoading ? (
              <div className="text-center py-4 text-slate-400">جاري تحميل المنتجات...</div>
            ) : (
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300">المنتج {index + 1}</span>
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        required
                      >
                        <option value="">اختر المنتج</option>
                        {products.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name} - {product.wholesalePrice} د.أ
                          </option>
                        ))}
                      </select>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-white mb-1">
                            الكمية
                          </label>
                          <input
                            type="number"
                            max={item.productId ? getProductStock(item.productId) : 999}
                            value={item.quantity}
                            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="الكمية"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-1">
                            سعر الوحدة
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => handleProductChange(index, 'unitPrice', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="سعر الوحدة"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-400">
                        المجموع: {item.quantity * item.unitPrice} د.أ
                        {item.productId && (
                          <span className="mr-2 text-xs">
                            | المتوفر: {getProductStock(item.productId)} وحدة
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total */}
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-lg font-bold text-white">
              المجموع الإجمالي: {calculateTotal()} د.أ
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              ملاحظات (اختياري)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="أضف ملاحظات إضافية..."
              rows="2"
            />
          </div>

          {/* Buttons */}
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
              disabled={loading || productsLoading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {loading ? "جاري الإضافة..." : "إضافة المشترى"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 