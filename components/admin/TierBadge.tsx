import { cn } from "@/lib/utils";
import { SubscriptionTier } from "@/types/saas";
import { Typography } from "@/components/ui/typography";

interface TierBadgeProps {
  tier: SubscriptionTier;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const tierConfig: Record<SubscriptionTier, { label: string; color: string; border: string; text: string }> = {
  FREE: { 
    label: 'Basic', 
    color: 'bg-bazar-gray-100 dark:bg-bazar-gray-900', 
    border: 'border-bazar-gray-200 dark:border-bazar-gray-800',
    text: 'text-bazar-gray-500' 
  },
  SILVER: { 
    label: 'Growth', 
    color: 'bg-slate-100 dark:bg-slate-900', 
    border: 'border-slate-200 dark:border-slate-800',
    text: 'text-slate-500' 
  },
  GOLD: { 
    label: 'Pro', 
    color: 'bg-amber-100/50 dark:bg-amber-900/20', 
    border: 'border-amber-200/50 dark:border-amber-800/50',
    text: 'text-amber-600' 
  },
  PLATINUM: { 
    label: 'Enterprise', 
    color: 'bg-fuchsia-100/50 dark:bg-fuchsia-900/20', 
    border: 'border-fuchsia-200/50 dark:border-fuchsia-800/50',
    text: 'text-fuchsia-600' 
  }
};

export function TierBadge({ tier, className, size = 'sm' }: TierBadgeProps) {
  const config = tierConfig[tier];
  
  return (
    <div className={cn(
      "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 transition-all font-black uppercase tracking-widest",
      size === 'sm' ? "text-[8px]" : size === 'md' ? "text-[10px]" : "text-xs px-4 py-1",
      config.color,
      config.border,
      config.text,
      className
    )}>
      {config.label}
    </div>
  );
}
