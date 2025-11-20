import { useState, useEffect } from "react";
import axios from "axios";

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
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/client`);
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
      if (editingClient) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/client/${editingClient._id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/client`, formData);
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/client/${id}`);
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/client/${clientId}/details`);
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/client/${clientDetails.client._id}/payments`, paymentData);
      
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/client/${clientDetails.client._id}/purchases`, purchaseData);
      
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