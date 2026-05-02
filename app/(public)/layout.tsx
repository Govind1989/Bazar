import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import MarketplaceHome from "@/components/shared/MarketplaceHome";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
