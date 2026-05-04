import { SilverFood } from "./foods/SilverFood";
import { GoldFood } from "./foods/GoldFood";
import { PlatinumFood } from "./foods/PlatinumFood";
import { MinimalTemplate } from "./MinimalTemplate";
import { BoldTemplate } from "./BoldTemplate";
import { TemplateId } from "@/types/cms";
import { Vendor, Product } from "@/data/mock";
import { VendorCMS } from "@/types/cms";

export type TemplateComponent = React.ComponentType<{
  vendor: Vendor;
  cms: VendorCMS;
  products: Product[];
}>;

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateComponent> = {
  'minimal': MinimalTemplate,
  'bold': BoldTemplate,
  'classic': MinimalTemplate, // Fallback
  'food-silver': SilverFood,
  'food-gold': GoldFood,
  'food-platinum': PlatinumFood,
};
