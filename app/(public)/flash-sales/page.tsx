import ProductListView from "@/components/shared/ProductListView";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Flash Sales | Bazar",
  description: "Limited-time flash sales in Nepal. Grab them before they're gone!",
};

export default function FlashSalesPage() {
  return (
    <ProductListView 
      title="Flash Sales" 
      description="Lightning-fast deals. Limited stock, limited time. Act now or miss out!" 
      type="flash-sales"
      icon={<Zap className="w-6 h-6" />}
    />
  );
}
