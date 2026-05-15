import { useQuery } from "@tanstack/react-query";
import { 
  PLATFORM_STATS, 
  ALL_VENDORS, 
  SUBSCRIPTION_PLANS, 
  VENDOR_SUBSCRIPTIONS, 
  SAAS_STATS,
  PlatformStats 
} from "@/data/mock";
import { 
  MODULE_REGISTRY, 
  USER_VISITS, 
  AUDIT_LOGS 
} from "@/data/admin-deep";
import { 
  ADMIN_CONVERSATIONS, 
  BROADCAST_HISTORY 
} from "@/data/admin-comm";

const fetchPlatformStats = async (): Promise<PlatformStats> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return PLATFORM_STATS;
};

const fetchAllVendors = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ALL_VENDORS;
};

const fetchSubscriptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return SUBSCRIPTION_PLANS;
};

const fetchVendorSubscriptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return VENDOR_SUBSCRIPTIONS;
};

const fetchSaaSStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return SAAS_STATS;
};

export function usePlatformStats() {
  return useQuery({
    queryKey: ["admin", "platform-stats"],
    queryFn: fetchPlatformStats,
  });
}

export function useAllVendors() {
  return useQuery({
    queryKey: ["admin", "vendors"],
    queryFn: fetchAllVendors,
  });
}

export function useSubscriptions() {
  return useQuery({
    queryKey: ["admin", "subscriptions"],
    queryFn: fetchSubscriptions,
  });
}

export function useVendorSubscriptions() {
  return useQuery({
    queryKey: ["admin", "vendor-subscriptions"],
    queryFn: fetchVendorSubscriptions,
  });
}

export function useSaaSStats() {
  return useQuery({
    queryKey: ["admin", "saas-stats"],
    queryFn: fetchSaaSStats,
  });
}

export function useModuleRegistry() {
  return useQuery({
    queryKey: ["admin", "modules"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 400));
      return MODULE_REGISTRY;
    },
  });
}

export function useUserVisits() {
  return useQuery({
    queryKey: ["admin", "visits"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 900));
      return USER_VISITS;
    },
  });
}

export function useAuditLogs() {
  return useQuery({
    queryKey: ["admin", "audit"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 500));
      return AUDIT_LOGS;
    },
  });
}

export function useAdminConversations() {
  return useQuery({
    queryKey: ["admin", "conversations"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 600));
      return ADMIN_CONVERSATIONS;
    },
  });
}

export function useBroadcastHistory() {
  return useQuery({
    queryKey: ["admin", "broadcasts"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 400));
      return BROADCAST_HISTORY;
    },
  });
}
