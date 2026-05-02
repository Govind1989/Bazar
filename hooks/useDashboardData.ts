import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_STATS, RECENT_ORDERS, INVENTORY_ALERTS, DashboardStats, Order } from "@/data/mock";

// Simulation of API calls
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return DASHBOARD_STATS;
};

const fetchRecentOrders = async (): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return RECENT_ORDERS;
};

const fetchInventoryAlerts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return INVENTORY_ALERTS;
};

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  });
}

export function useRecentOrders() {
  return useQuery({
    queryKey: ["dashboard", "orders"],
    queryFn: fetchRecentOrders,
  });
}

export function useInventoryAlerts() {
  return useQuery({
    queryKey: ["dashboard", "inventory-alerts"],
    queryFn: fetchInventoryAlerts,
  });
}
