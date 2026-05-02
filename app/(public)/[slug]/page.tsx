import { CATEGORIES, VENDORS } from "@/data/mock";
import CategoryView from "@/components/shared/CategoryView";
import VendorView from "@/components/shared/VendorView";
import { notFound } from "next/navigation";

interface DispatcherPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DispatcherPage({ params }: DispatcherPageProps) {
  const { slug } = await params;
  
  const isCategory = CATEGORIES.some((c) => c.slug === slug);
  const isVendor = VENDORS.some((v) => v.slug === slug);

  if (isCategory) {
    return <CategoryView categorySlug={slug} />;
  }

  if (isVendor) {
    return <VendorView vendorSlug={slug} />;
  }

  return notFound();
}
