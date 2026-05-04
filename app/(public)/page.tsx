"use client";

import MarketplaceHome from "@/components/shared/MarketplaceHome";
import MarketPlaceSocio from "@/components/shared/MarketPlaceSocio";
import { useSystemStore } from "@/store/useSystemStore";
import { useEffect, useState } from "react";

export default function MarketplacePage() {
  const marketplaceView = useSystemStore((state) => state.marketplaceView);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return marketplaceView === "social" ? <MarketPlaceSocio /> : <MarketplaceHome />;
}
