"use client";

import { VendorCMS } from "@/types/cms";
import { Product, Vendor } from "@/data/mock";
import { TEMPLATE_REGISTRY } from "./TemplateRegistry";

interface TemplateEngineProps {
  vendor: Vendor;
  cms: VendorCMS;
  products: Product[];
}

export function TemplateEngine({ vendor, cms, products }: TemplateEngineProps) {
  const Template = TEMPLATE_REGISTRY[cms.templateId] || TEMPLATE_REGISTRY['minimal'];
  
  return <Template vendor={vendor} cms={cms} products={products} />;
}


