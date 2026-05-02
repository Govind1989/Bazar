import { notFound } from "next/navigation";
import { PRODUCTS, VENDORS } from "@/data/mock";
import { TemplateEngine } from "@/components/templates/TemplateEngine";

interface VendorViewProps {
  vendorSlug: string;
}

export default function VendorView({ vendorSlug }: VendorViewProps) {
  const vendor = VENDORS.find((v) => v.slug === vendorSlug);
  if (!vendor || !vendor.cmsConfig) {
    return notFound();
  }

  const vendorProducts = PRODUCTS.filter((p) => p.vendorId === vendor.id);

  return (
    <TemplateEngine 
      vendor={vendor} 
      cms={vendor.cmsConfig} 
      products={vendorProducts} 
    />
  );
}
