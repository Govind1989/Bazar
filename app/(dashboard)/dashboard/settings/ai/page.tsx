"use client";

import { AISettings } from "@/components/shared/AISettings";

export default function VendorAISettingsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <AISettings role="vendor" />
    </div>
  );
}
