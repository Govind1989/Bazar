import { useQuery } from "@tanstack/react-query";
import { PLATFORM_STATS, ALL_VENDORS, PlatformStats } from "@/data/mock";

const fetchPlatformStats = async (): Promise<PlatformStats> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return PLATFORM_STATS;
};

const fetchAllVendors = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ALL_VENDORS;
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
