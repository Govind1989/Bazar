"use client";

import { MinimalTemplate } from "./MinimalTemplate";
import { BoldTemplate } from "./BoldTemplate";
import { VendorCMS } from "@/types/cms";
import { Product, Vendor } from "@/data/mock";

interface TemplateEngineProps {
  vendor: Vendor;
  cms: VendorCMS;
  products: Product[];
}

export function TemplateEngine({ vendor, cms, products }: TemplateEngineProps) {
  switch (cms.templateId) {
    case 'bold':
      return <BoldTemplate vendor={vendor} cms={cms} products={products} />;
    case 'minimal':
    default:
      return <MinimalTemplate vendor={vendor} cms={cms} products={products} />;
  }
}
