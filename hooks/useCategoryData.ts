import { useQuery } from "@tanstack/react-query";
import { PRODUCTS, VENDORS, Product, Vendor } from "@/data/mock";

interface CategoryFilters {
  category: string;
  subCategories?: string[];
  priceRange?: [number, number];
  vendors?: string[];
  rating?: number;
  sortBy?: string;
}

const fetchCategoryProducts = async (filters: CategoryFilters): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  let filtered = PRODUCTS.filter(p => p.category === filters.category);

  if (filters.subCategories && filters.subCategories.length > 0) {
    // In a real app, products would have sub-categories
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

export function useCategoryProducts(filters: CategoryFilters) {
  return useQuery({
    queryKey: ["category", filters.category, filters],
    queryFn: () => fetchCategoryProducts(filters),
  });
}
