"use client";

import { AISettings } from "@/components/shared/AISettings";

export default function UserAISettingsPage() {
  return (
    <div className="max-w-4xl">
      <AISettings role="user" />
    </div>
  );
}
