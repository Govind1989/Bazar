import ProductListView from "@/components/shared/ProductListView";
import { Tag } from "lucide-react";

export const metadata = {
  title: "Sales & Offers | Bazar",
  description: "Explore the best deals and offers in Nepal.",
};

export default function DealsPage() {
  return (
    <ProductListView 
      title="Sales & Offers" 
      description="Handpicked deals from our top-rated vendors. High quality, lower prices." 
      type="deals"
      icon={<Tag className="w-6 h-6" />}
    />
  );
}
