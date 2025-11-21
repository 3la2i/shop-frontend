import { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "", 
    size: "", 
    category: "", 
    wholesalePrice: "", 
    retailPrice: "", 
    quantityInStock: "" 
  });

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/api/product`, {
        headers: { Authorization: token },
      });
      setProducts(res.data);
    } catch {
      throw new Error("فشل في تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingProduct) {
        await axiosInstance.put(`/api/product/${editingProduct._id}`, formData, {
          headers: { Authorization: token },
        });
      } else {
        await axiosInstance.post(`$/api/product`, formData, {
          headers: { Authorization: token },
        });
      }
      resetForm();
      await fetchProducts();
      return { success: true };
    } catch {
      throw new Error("فشل في حفظ بيانات المنتج");
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ 
      name: product.name, 
      description: product.description || "", 
      size: product.size || "", 
      category: product.category || "", 
      wholesalePrice: product.wholesalePrice, 
      retailPrice: product.retailPrice || "", 
      quantityInStock: product.quantityInStock || "" 
    });
    setShowAddForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/product/${id}`, {
        headers: { Authorization: token },
      });
      await fetchProducts();
      return { success: true };
    } catch {
      throw new Error("فشل في حذف المنتج");
    }
  };

  // Reset form
  const resetForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({ 
      name: "", 
      description: "", 
      size: "", 
      category: "", 
      wholesalePrice: "", 
      retailPrice: "", 
      quantityInStock: "" 
    });
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    
    // Listen for products updated event
    const handleProductsUpdated = () => {
      fetchProducts();
    };
    
    window.addEventListener('productsUpdated', handleProductsUpdated);
    
    // Cleanup
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated);
    };
  }, []);

  return {
    // State
    products,
    loading,
    showAddForm,
    editingProduct,
    formData,
    
    // Actions
    setShowAddForm,
    setFormData,
    fetchProducts,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
} 