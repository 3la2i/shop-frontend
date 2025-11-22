import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { getCookie } from "../../utils/cookies";

export function useInventory() {
  const [purchases, setPurchases] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", status: "", customerId: "" });
  const [clients, setClients] = useState([]);

  const tokenHeader = useMemo(() => ({ Authorization: getCookie("token") }), []);

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.status) params.append("status", filters.status);
    if (filters.customerId) params.append("customerId", filters.customerId);
    return params.toString();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const qs = buildQuery();
      const [listRes, sumRes] = await Promise.all([
        axiosInstance.get(`/api/purchase${qs ? `?${qs}` : ""}`, { headers: tokenHeader }),
        axiosInstance.get(`/api/purchase/summary${qs ? `?${qs}` : ""}`, { headers: tokenHeader })
      ]);
      setPurchases(listRes.data || []);
      setSummary(sumRes.data || null);
    } catch {
      // Keep UI stable; show empty state on error
      setPurchases([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get(`/api/client`, { headers: tokenHeader });
      setClients(res.data || []);
    } catch {
      // ignore silently in UI; user will still see inventory
    }
  };

  useEffect(() => {
    fetchData();
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.startDate, filters.endDate, filters.status, filters.customerId]);

  return {
    purchases,
    summary,
    loading,
    clients,
    filters,
    setFilters,
    refetch: fetchData,
  };
}


