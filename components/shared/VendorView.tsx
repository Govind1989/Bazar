"use client";

import { notFound } from "next/navigation";
import { PRODUCTS, VENDORS } from "@/data/mock";
import { TemplateEngine } from "@/components/templates/TemplateEngine";
import { useCMSStore } from "@/store/useCMSStore";
import { useEffect, useState } from "react";

interface VendorViewProps {
  vendorSlug: string;
}

export default function VendorView({ vendorSlug }: VendorViewProps) {
  const getVendorConfig = useCMSStore((state) => state.getVendorConfig);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration to avoid mismatch with localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const vendor = VENDORS.find((v) => v.slug === vendorSlug);
  
  if (!vendor) {
    return notFound();
  }

  // Get the latest config from the store, or fallback to the mock config
  const activeConfig = isHydrated ? getVendorConfig(vendor.id) : vendor.cmsConfig;

  if (!activeConfig) {
    return notFound();
  }

  const vendorProducts = PRODUCTS.filter((p) => p.vendorId === vendor.id);

  return (
    <TemplateEngine 
      vendor={vendor} 
      cms={activeConfig} 
      products={vendorProducts} 
    />
  );
}
