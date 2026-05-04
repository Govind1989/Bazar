import { useQuery } from "@tanstack/react-query";
import { PRODUCTS, VENDORS, Product, Vendor } from "@/data/mock";

interface ProductFilters {
  category?: string;
  subCategories?: string[];
  priceRange?: [number, number];
  vendors?: string[];
  rating?: number;
  sortBy?: string;
  isDeal?: boolean;
  isFlashSale?: boolean;
}

const fetchProducts = async (filters: ProductFilters): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  let filtered = [...PRODUCTS];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.isDeal || filters.isFlashSale) {
    filtered = filtered.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
  }

  if (filters.priceRange) {
    filtered = filtered.filter(p => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]);
  }

  if (filters.vendors && filters.vendors.length > 0) {
    filtered = filtered.filter(p => filters.vendors!.includes(p.vendorId));
  }

  // Sorting logic
  if (filters.sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (filters.sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

  return filtered;
};

export function useCategoryProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["category", filters.category, filters],
    queryFn: () => fetchProducts(filters),
  });
}

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
}
