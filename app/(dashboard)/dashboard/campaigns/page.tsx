"use client";

import { useState, useEffect } from "react";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Filter, 
  Gift, 
  Users, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  X,
  ChevronRight,
  Package,
  Check,
  Edit2,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCampaignStore } from "@/store/useCampaignStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useCMSStore } from "@/store/useCMSStore";
import { PRODUCTS } from "@/data/mock";
import { Campaign, CampaignType, CampaignStatus, TargetType } from "@/types/campaign";
import { motion, AnimatePresence } from "framer-motion";

export default function CampaignsPage() {
  const { user } = useAuthStore();
  const { campaigns, addCampaign, updateCampaign, deleteCampaign, refreshStatuses } = useCampaignStore();
  const { previewConfig, init: initCMS } = useCMSStore();
  const [filter, setFilter] = useState<CampaignStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const vendorId = user?.vendorId || 'v1';

  // Form State
  const [formData, setFormData] = useState<Omit<Campaign, 'id' | 'status' | 'userCount' | 'totalSales' | 'createdAt'>>({
    vendorId,
    title: "",
    description: "",
    type: 'SALE',
    value: 0,
    valueType: 'PERCENT',
    targetType: 'ALL',
    targetIds: [],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const vendorCampaigns = campaigns.filter(c => c.vendorId === vendorId);

  useEffect(() => {
    refreshStatuses();
    initCMS(vendorId);
  }, [refreshStatuses, initCMS, vendorId]);

  const handleEdit = (campaign: Campaign) => {
    setEditingId(campaign.id);
    setFormData({
      vendorId: campaign.vendorId,
      title: campaign.title,
      description: campaign.description,
      type: campaign.type,
      value: campaign.value,
      valueType: campaign.valueType,
      targetType: campaign.targetType,
      targetIds: campaign.targetIds,
      startDate: new Date(campaign.startDate).toISOString().split('T')[0],
      endDate: new Date(campaign.endDate).toISOString().split('T')[0],
      loyaltyTarget: campaign.loyaltyTarget,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCampaign(editingId, formData);
    } else {
      addCampaign(formData);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      vendorId,
      title: "",
      description: "",
      type: 'SALE',
      value: 0,
      valueType: 'PERCENT',
      targetType: 'ALL',
      targetIds: [],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  const toggleTargetId = (id: string) => {
    setFormData(prev => ({
      ...prev,
      targetIds: prev.targetIds.includes(id) 
        ? prev.targetIds.filter(tid => tid !== id)
        : [...prev.targetIds, id]
    }));
  };

  const filteredCampaigns = vendorCampaigns.filter(c => {
    const matchesFilter = filter === 'ALL' || c.status === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Target Selection Options
  const vendorProducts = PRODUCTS.filter(p => p.vendorId === vendorId);
  const vendorCategories = previewConfig?.categories || [];
  const vendorSubCategories = vendorCategories.flatMap(c => c.subCategories.map(sc => ({ ...sc, parentCategory: c.name })));

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="titleLg" className="font-black uppercase tracking-tighter">Campaigns & Loyalty</Typography>
          <Typography variant="bodySm" className="opacity-60">Create and manage your vendor-specific loyalty programs.</Typography>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="gap-2 bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black hover:opacity-90 transition-all font-black uppercase tracking-widest text-xs h-11 px-6 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </Button>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-bazar-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl bg-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-bazar-gray-100 dark:border-bazar-gray-900 flex justify-between items-center bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                <div>
                  <Typography variant="titleMd" className="font-black uppercase tracking-widest text-sm">
                    {editingId ? 'Edit Campaign' : 'New Campaign'}
                  </Typography>
                  <Typography variant="bodySm" className="text-[10px] opacity-40 uppercase tracking-widest font-mono">
                    {editingId ? `ID: ${editingId}` : 'Set up your offer details'}
                  </Typography>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-800 rounded-full transition-colors">
                  <X className="w-5 h-5 opacity-40" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                {/* Form Side */}
                <form onSubmit={handleSubmit} id="campaign-form" className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar border-r border-bazar-gray-100 dark:border-bazar-gray-900">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Campaign Title</label>
                      <input 
                        required
                        className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-bazar-black/5 dark:focus:ring-bazar-white/5 transition-all"
                        placeholder="e.g. Summer Food Festival"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Description</label>
                      <textarea 
                        required
                        rows={2}
                        className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-bazar-black/5 dark:focus:ring-bazar-white/5 transition-all resize-none"
                        placeholder="Describe your campaign offer..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Campaign Type</label>
                        <select 
                          className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                          value={formData.type}
                          onChange={e => setFormData({...formData, type: e.target.value as any})}
                        >
                          <option value="SALE">Flash Sale</option>
                          <option value="LOYALTY">Loyalty Program</option>
                          <option value="REFERRAL">Referral Reward</option>
                          <option value="OCCASIONAL">Occasional Event</option>
                          <option value="SOCIAL_SHOUTOUT">Social Shoutout</option>
                          <option value="FREE_DELIVERY">Free Delivery</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Discount Value</label>
                        <div className="flex gap-2">
                          <input 
                            type="number"
                            className="flex-1 bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                            value={formData.value}
                            onChange={e => setFormData({...formData, value: Number(e.target.value)})}
                          />
                          <select 
                            className="bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                            value={formData.valueType}
                            onChange={e => setFormData({...formData, valueType: e.target.value as any})}
                          >
                            <option value="PERCENT">%</option>
                            <option value="FLAT">रु</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {formData.type === 'LOYALTY' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Order Threshold (X buys)</label>
                        <input 
                          type="number"
                          className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                          value={formData.loyaltyTarget || 5}
                          onChange={e => setFormData({...formData, loyaltyTarget: Number(e.target.value)})}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Start Date</label>
                        <input 
                          type="date"
                          className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                          value={formData.startDate}
                          onChange={e => setFormData({...formData, startDate: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">End Date</label>
                        <input 
                          type="date"
                          className="w-full bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                          value={formData.endDate}
                          onChange={e => setFormData({...formData, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Targeting Side */}
                <div className="w-full md:w-80 bg-bazar-gray-50 dark:bg-bazar-gray-950 p-8 flex flex-col gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Target Scope</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['ALL', 'CATEGORY', 'SUB_CATEGORY', 'PRODUCT'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({...formData, targetType: t as TargetType, targetIds: []})}
                          className={cn(
                            "px-2 py-2 text-[8px] font-black uppercase tracking-widest rounded-lg border transition-all",
                            formData.targetType === t 
                              ? "bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black border-transparent" 
                              : "border-bazar-gray-200 dark:border-bazar-gray-800 text-bazar-gray-400 hover:border-bazar-black dark:hover:border-bazar-white"
                          )}
                        >
                          {t.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.targetType !== 'ALL' && (
                    <div className="flex-1 flex flex-col min-h-0">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4 flex justify-between">
                        Select {formData.targetType.toLowerCase().replace('_', ' ')}s
                        <span className="opacity-60">{formData.targetIds.length} Selected</span>
                      </label>
                      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                        {formData.targetType === 'CATEGORY' && vendorCategories.map(cat => (
                          <TargetItem 
                            key={cat.id} 
                            label={cat.name} 
                            selected={formData.targetIds.includes(cat.id)} 
                            onClick={() => toggleTargetId(cat.id)}
                          />
                        ))}
                        {formData.targetType === 'SUB_CATEGORY' && vendorSubCategories.map(sc => (
                          <TargetItem 
                            key={sc.id} 
                            label={sc.name} 
                            subtitle={sc.parentCategory}
                            selected={formData.targetIds.includes(sc.id)} 
                            onClick={() => toggleTargetId(sc.id)}
                          />
                        ))}
                        {formData.targetType === 'PRODUCT' && vendorProducts.map(prod => (
                          <TargetItem 
                            key={prod.id} 
                            label={prod.name} 
                            subtitle={`NPR ${prod.price}`}
                            selected={formData.targetIds.includes(prod.id)} 
                            onClick={() => toggleTargetId(prod.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.targetType === 'ALL' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 space-y-4">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                         <Check className="w-6 h-6" />
                      </div>
                      <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                        This campaign will apply to your entire store catalog.
                      </Typography>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex gap-3 bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50">
                <Button variant="outline" onClick={closeModal} className="flex-1 h-12 rounded-xl uppercase tracking-widest font-black text-xs">Cancel</Button>
                <Button form="campaign-form" type="submit" className="flex-1 h-12 rounded-xl bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black uppercase tracking-widest font-black text-xs">
                  {editingId ? 'Save Changes' : 'Launch Campaign'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickStat 
          label="Active Campaigns" 
          value={vendorCampaigns.filter(c => c.status === 'ACTIVE').length.toString()} 
          icon={CheckCircle2} 
          color="text-green-500"
        />
        <QuickStat 
          label="Total Participants" 
          value={vendorCampaigns.reduce((acc, c) => acc + c.userCount, 0).toLocaleString()} 
          icon={Users} 
          color="text-blue-500"
        />
        <QuickStat 
          label="Campaign Revenue" 
          value={`रु ${vendorCampaigns.reduce((acc, c) => acc + c.totalSales, 0).toLocaleString()}`} 
          icon={TrendingUp} 
          color="text-purple-500"
        />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-bazar-gray-50/50 dark:bg-bazar-gray-950/50 p-2 rounded-2xl border border-bazar-gray-100 dark:border-bazar-gray-900">
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-bazar-black rounded-xl border border-bazar-gray-100 dark:border-bazar-gray-900 w-full md:w-auto">
          {['ALL', 'ACTIVE', 'UPCOMING', 'EXPIRED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                filter === f 
                  ? "bg-bazar-black dark:bg-bazar-white text-bazar-white dark:text-bazar-black shadow-lg" 
                  : "text-bazar-gray-400 hover:text-bazar-black dark:hover:text-bazar-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" />
          <input 
            type="text" 
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-bazar-black border border-bazar-gray-100 dark:border-bazar-gray-900 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-bazar-black/5 dark:focus:ring-bazar-white/5 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onDelete={deleteCampaign} onEdit={handleEdit} />
          ))}
        </AnimatePresence>
        
        {filteredCampaigns.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-20">
            <Gift className="w-12 h-12" />
            <Typography variant="bodySm" className="uppercase tracking-[0.2em] font-mono">No campaigns found</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

function TargetItem({ label, subtitle, selected, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-xl border flex items-center justify-between transition-all text-left group",
        selected 
          ? "bg-white dark:bg-bazar-black border-bazar-black dark:border-bazar-white" 
          : "border-bazar-gray-200 dark:border-bazar-gray-800 opacity-60 hover:opacity-100"
      )}
    >
      <div className="min-w-0 flex-1">
        <Typography variant="bodySm" className="text-[10px] font-black truncate">{label}</Typography>
        {subtitle && <Typography variant="bodySm" className="text-[8px] opacity-40 uppercase tracking-widest truncate">{subtitle}</Typography>}
      </div>
      <div className={cn(
        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3",
        selected ? "bg-bazar-black dark:bg-bazar-white border-transparent" : "border-bazar-gray-300 dark:border-bazar-gray-700"
      )}>
        {selected && <Check className="w-2.5 h-2.5 text-bazar-white dark:text-bazar-black" />}
      </div>
    </button>
  );
}

function QuickStat({ label, value, icon: Icon, color }: any) {
  return (
    <Card className="p-6 border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center gap-4">
      <div className={cn("p-3 rounded-xl bg-current bg-opacity-10", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <Typography variant="bodySm" className="text-[10px] uppercase tracking-widest opacity-40 font-mono mb-0.5">{label}</Typography>
        <Typography variant="titleMd" className="font-black text-xl tracking-tighter">{value}</Typography>
      </div>
    </Card>
  );
}

function CampaignCard({ campaign, onDelete, onEdit }: { campaign: Campaign, onDelete: (id: string) => void, onEdit: (c: Campaign) => void }) {
  const typeIcons: Record<CampaignType, any> = {
    SALE: TrendingUp,
    REFERRAL: Users,
    LOYALTY: Gift,
    OCCASIONAL: Calendar,
    SOCIAL_SHOUTOUT: Search,
    FREE_DELIVERY: Clock
  };

  const statusStyles: Record<CampaignStatus, string> = {
    ACTIVE: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200/50 dark:border-green-800/50",
    UPCOMING: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50",
    EXPIRED: "bg-bazar-gray-100 text-bazar-gray-600 dark:bg-bazar-gray-900 dark:text-bazar-gray-400 border-bazar-gray-200 dark:border-bazar-gray-800"
  };

  const Icon = typeIcons[campaign.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden border-2 border-bazar-gray-100 dark:border-bazar-gray-900 hover:border-bazar-black dark:hover:border-bazar-white transition-all group relative h-full flex flex-col">
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={cn(
            "px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
            statusStyles[campaign.status]
          )}>
            {campaign.status}
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 opacity-40" />
            </div>
            <div className="flex-1 min-w-0">
              <Typography variant="bodySm" className="text-[10px] uppercase tracking-widest opacity-40 font-mono mb-1">{campaign.type.replace('_', ' ')}</Typography>
              <Typography variant="titleSm" className="font-black leading-tight line-clamp-1 group-hover:underline">{campaign.title}</Typography>
            </div>
          </div>

          <Typography variant="bodySm" className="text-xs opacity-60 line-clamp-2 h-8">
            {campaign.description}
          </Typography>

          {/* Target Info */}
          <div className="flex items-center gap-2">
             <div className="px-2 py-0.5 rounded bg-bazar-gray-100 dark:bg-bazar-gray-900 text-[8px] font-black uppercase tracking-widest opacity-60">
                Target: {campaign.targetType.replace('_', ' ')}
             </div>
             {campaign.targetIds.length > 0 && (
                <div className="text-[8px] font-black uppercase tracking-widest opacity-40">
                   {campaign.targetIds.length} Items Selected
                </div>
             )}
          </div>

          {/* Value Display */}
          <div className="bg-bazar-gray-50 dark:bg-bazar-gray-950 rounded-2xl p-4 border border-bazar-gray-100 dark:border-bazar-gray-900 mt-auto">
             <div className="flex justify-between items-end">
                <div>
                   <Typography variant="bodySm" className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Offer Value</Typography>
                   <Typography variant="titleLg" className="font-black text-2xl tracking-tighter">
                      {campaign.valueType === 'PERCENT' ? `${campaign.value}%` : `रु ${campaign.value}`}
                      <span className="text-[10px] opacity-40 ml-1 font-mono uppercase">Off</span>
                   </Typography>
                </div>
                {campaign.loyaltyTarget && (
                   <div className="text-right">
                      <Typography variant="bodySm" className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Target</Typography>
                      <Typography variant="bodySm" className="font-black text-xs">{campaign.loyaltyTarget} Orders</Typography>
                   </div>
                )}
             </div>
          </div>

          {/* Progress / Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2">
             <div>
                <Typography variant="bodySm" className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Participants</Typography>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <Users className="w-3 h-3 opacity-20" />
                   <Typography variant="bodySm" className="font-black text-xs">{campaign.userCount.toLocaleString()}</Typography>
                </div>
             </div>
             <div>
                <Typography variant="bodySm" className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Total Sales</Typography>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <TrendingUp className="w-3 h-3 opacity-20" />
                   <Typography variant="bodySm" className="font-black text-xs">रु {campaign.totalSales.toLocaleString()}</Typography>
                </div>
             </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-bazar-gray-100 dark:border-bazar-gray-900 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 opacity-20" />
                <Typography variant="bodySm" className="text-[9px] opacity-40 font-mono">
                   {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </Typography>
             </div>
             <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onEdit(campaign)}
                  className="p-1.5 hover:bg-bazar-gray-100 dark:hover:bg-bazar-gray-800 rounded-lg transition-colors"
                >
                   <Edit2 className="w-3 h-3 opacity-40" />
                </button>
                <button 
                  onClick={() => onDelete(campaign.id)}
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded-lg transition-colors"
                >
                   <Trash2 className="w-3 h-3" />
                </button>
             </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
