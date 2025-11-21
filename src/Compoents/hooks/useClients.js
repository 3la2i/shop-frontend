import { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", notes: "" });
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Fetch all clients
  const fetchClients = async () => {
    setLoading(true);
    console.log('dsddd', import.meta.env.VITE_API_URL)
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/api/client`, {
        headers: { Authorization: token },
      });
      setClients(res.data);
    } catch {
      // Error handling will be done by the component using this hook
      throw new Error("فشل في تحميل العملاء");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingClient) {
        await axiosInstance.put(`/api/client/${editingClient._id}`, formData, {
          headers: { Authorization: token },
        });
      } else {
        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/client`, formData, {
          headers: { Authorization: token },
        });
      }
      resetForm();
      await fetchClients();
      return { success: true };
    } catch {
      throw new Error("فشل في حفظ بيانات العميل");
    }
  };

  // Handle edit
  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({ 
      name: client.name, 
      phone: client.phone || "", 
      address: client.address || "", 
      notes: client.notes || "" 
    });
    setShowAddForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/client/${id}`, {
        headers: { Authorization: token },
      });
      await fetchClients();
      return { success: true };
    } catch {
      throw new Error("فشل في حذف العميل");
    }
  };

  // Handle show details
  const handleShowDetails = async (clientId) => {
    setDetailsModalOpen(true);
    setDetailsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/api/client/${clientId}/details`, {
        headers: { Authorization: token },
      });
      setClientDetails(res.data);
    } catch {
      throw new Error("فشل في تحميل تفاصيل العميل");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setShowAddForm(false);
    setEditingClient(null);
    setFormData({ name: "", phone: "", address: "", notes: "" });
  };

  // Close details modal
  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setClientDetails(null);
  };

  // Add payment to purchase
  const addPaymentToPurchase = async (paymentData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`/api/client/${clientDetails.client._id}/payments`, paymentData, {
        headers: { Authorization: token },
      });
      
      // Update client details with the new data
      setClientDetails(res.data.clientDetails);
      return { success: true };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("فشل في إضافة الدفعة");
    }
  };

  // Create purchase for client
  const createPurchaseForClient = async (purchaseData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(`/api/client/${clientDetails.client._id}/purchases`, purchaseData, {
        headers: { Authorization: token },
      });
      
      // Update client details with the new data
      setClientDetails(res.data.clientDetails);
      
      // Trigger a custom event to refresh products in other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));
      
      return { success: true };
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("فشل في إضافة المشترى");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchClients();
  }, []);

  return {
    // State
    clients,
    loading,
    showAddForm,
    editingClient,
    formData,
    detailsModalOpen,
    clientDetails,
    detailsLoading,
    
    // Actions
    setShowAddForm,
    setFormData,
    fetchClients,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleShowDetails,
    resetForm,
    closeDetailsModal,
    addPaymentToPurchase,
    createPurchaseForClient,
  };
} 