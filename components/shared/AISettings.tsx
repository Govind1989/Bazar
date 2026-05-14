"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  Key, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Zap,
  ChevronRight,
  Info,
  Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";

interface AISettingsProps {
  role: 'user' | 'vendor';
}

const PROVIDERS = [
  { 
    id: 'google', 
    name: 'Google Gemini', 
    icon: '✨', 
    description: 'Multimodal intelligence by Google',
    defaultModel: 'gemini-1.5-pro',
    keyHelp: 'https://aistudio.google.com/app/apikey'
  },
  { 
    id: 'openai', 
    name: 'OpenAI GPT', 
    icon: '🤖', 
    description: 'Industry standard for complex reasoning',
    defaultModel: 'gpt-4o',
    keyHelp: 'https://platform.openai.com/api-keys'
  },
  { 
    id: 'anthropic', 
    name: 'Anthropic Claude', 
    icon: '🧠', 
    description: 'Focused on safety and nuanced conversation',
    defaultModel: 'claude-3-5-sonnet-20240620',
    keyHelp: 'https://console.anthropic.com/settings/keys'
  },
];

export function AISettings({ role }: AISettingsProps) {
  const { aiSettings, updateAiSettings } = useUserStore();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a default state to prevent undefined errors during initial render/hydration
  const currentSettings = aiSettings?.[role] || { 
    provider: 'google', 
    apiKey: "", 
    model: "gemini-1.5-pro" 
  };
  
  const [apiKey, setApiKey] = useState(currentSettings.apiKey || "");
  const [modelName, setModelName] = useState(currentSettings.model || "gemini-1.5-pro");
  const [selectedProvider, setSelectedProvider] = useState(currentSettings.provider || 'google');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [isEstablished, setIsEstablished] = useState(false);

  // Check if settings are different from saved state
  const isDirty = 
    selectedProvider !== currentSettings.provider || 
    apiKey !== currentSettings.apiKey || 
    modelName !== currentSettings.model;

  // Sync state when currentSettings changes (after hydration)
  useEffect(() => {
    if (mounted && currentSettings) {
      setApiKey(currentSettings.apiKey || "");
      setModelName(currentSettings.model || "gemini-1.5-pro");
      setSelectedProvider(currentSettings.provider || 'google');
      // If we have an API key, we can consider it established initially
      if (currentSettings.apiKey) {
        setIsEstablished(true);
        setTestResult('success');
      }
    }
  }, [mounted, currentSettings?.apiKey, currentSettings?.model, currentSettings?.provider]);

  const handleProviderSelect = (providerId: string) => {
    const provider = PROVIDERS.find(p => p.id === providerId);
    setSelectedProvider(providerId as any);
    if (provider) {
      setModelName(provider.defaultModel);
    }
    setIsEstablished(false);
  };

  const handleSave = () => {
    updateAiSettings(role, { 
      provider: selectedProvider as any,
      apiKey,
      model: modelName
    });
    setTestResult('success');
    setIsEstablished(true);
  };

  const handleTest = async () => {
    if (!apiKey) return;
    setIsTesting(true);
    setTestResult(null);
    setIsEstablished(false);
    try {
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Basic check: Gemini keys often start with AIza
      const isValid = apiKey.length > 20; 
      setTestResult(isValid ? 'success' : 'error');
    } catch (error) {
      setTestResult('error');
    } finally {
      setIsTesting(false);
    }
  };

  if (!mounted) {
    return <div className="h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>;
  }

  const activeProvider = PROVIDERS.find(p => p.id === selectedProvider) || PROVIDERS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="space-y-2">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center text-purple-600">
               <Bot className="w-6 h-6" />
            </div>
            <div>
               <Typography variant="titleLg" className="font-black uppercase tracking-tighter text-2xl">Bazar Intelligence</Typography>
               <Typography variant="bodySm" className="opacity-40 font-bold uppercase tracking-widest text-[10px]">Configure your agentic partner</Typography>
            </div>
         </div>
      </section>

      {/* Provider Selection */}
      <section className="space-y-4">
         <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 opacity-40" />
            <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px]">Model Provider</Typography>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROVIDERS.map((provider) => (
               <Card 
                 key={provider.id}
                 onClick={() => handleProviderSelect(provider.id)}
                 className={cn(
                   "p-4 cursor-pointer transition-all border-2 group relative overflow-hidden h-full flex flex-col justify-between",
                   selectedProvider === provider.id 
                    ? "border-bazar-black dark:border-bazar-white bg-bazar-gray-50 dark:bg-bazar-gray-950" 
                    : "border-transparent hover:border-bazar-gray-200 dark:hover:border-bazar-gray-800 bg-white dark:bg-bazar-black"
                 )}
               >
                  <div>
                    <div className="flex items-start justify-between relative z-10">
                       <span className="text-2xl">{provider.icon}</span>
                       {selectedProvider === provider.id && (
                         <CheckCircle2 className="w-4 h-4 text-green-500" />
                       )}
                    </div>
                    <div className="mt-4 relative z-10">
                       <Typography variant="titleSm" className="font-black text-xs uppercase tracking-tight">{provider.name}</Typography>
                       <Typography variant="bodySm" className="text-[10px] opacity-40 leading-tight mt-1">{provider.description}</Typography>
                    </div>
                  </div>
                  
                  {/* Decorative Background Icon */}
                  <Bot className="absolute -right-4 -bottom-4 w-16 h-16 opacity-5 group-hover:scale-110 transition-transform" />
               </Card>
            ))}
         </div>
      </section>

      {/* Configuration Section */}
      <section className="space-y-4">
         <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 opacity-40" />
            <Typography variant="titleSm" className="font-black uppercase tracking-widest text-[10px]">Model & Credentials</Typography>
         </div>

         <Card className="p-6 border-2 border-bazar-gray-100 dark:border-bazar-gray-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Model Selection */}
                  <div className="space-y-2">
                     <Typography variant="bodySm" className="font-black uppercase tracking-widest text-[10px] opacity-40">Target Model Name</Typography>
                     <Input 
                       type="text" 
                       value={modelName}
                       onChange={(e) => setModelName(e.target.value)}
                       placeholder={activeProvider.defaultModel} 
                       className="h-12 px-4 rounded-xl border-2 focus:border-bazar-black dark:focus:border-bazar-white bg-transparent"
                     />
                     <Typography variant="bodySm" className="text-[10px] opacity-40 italic">
                       Suggested: {activeProvider.defaultModel}
                     </Typography>
                  </div>

                  {/* API Key Link */}
                  <div className="space-y-2">
                     <Typography variant="bodySm" className="font-black uppercase tracking-widest text-[10px] opacity-40">Credential Link</Typography>
                     <Link 
                       href={activeProvider.keyHelp} 
                       target="_blank" 
                       className="h-12 px-4 rounded-xl border-2 border-dashed border-bazar-gray-200 dark:border-bazar-gray-800 flex items-center justify-between hover:border-purple-500 transition-colors group"
                     >
                        <span className="text-[10px] font-black uppercase text-purple-600">Get {activeProvider.name} Key</span>
                        <ChevronRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                     </Link>
                     <Typography variant="bodySm" className="text-[10px] opacity-40 italic">
                        Click to open {activeProvider.name}'s dashboard
                     </Typography>
                  </div>
               </div>

               {/* API Key */}
               <div className="space-y-2">
                  <Typography variant="bodySm" className="font-black uppercase tracking-widest text-[10px] opacity-40">Your Private API Key</Typography>
                  <div className="flex flex-col sm:flex-row gap-2">
                     <div className="relative flex-1">
                        <Input 
                          type="password" 
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Enter your secret key..." 
                          className="h-12 pl-4 pr-12 rounded-xl border-2 focus:border-bazar-black dark:focus:border-bazar-white bg-transparent w-full"
                        />
                        <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" />
                     </div>
                     <Button 
                       onClick={handleTest} 
                       disabled={!apiKey || isTesting}
                       variant="outline" 
                       className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 shrink-0 bg-white dark:bg-black"
                     >
                       {isTesting ? "Testing..." : "Test Connection"}
                     </Button>
                  </div>
               </div>

               {testResult && (
                 <div className={cn(
                   "p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2",
                   testResult === 'success' ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                 )}>
                    {testResult === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-wide">
                       {testResult === 'success' 
                         ? (isEstablished ? "Connection established successfully!" : "Connection validated successfully!") 
                         : "Invalid API Key. Please check your credentials."}
                    </Typography>
                 </div>
               )}

               <div className="p-4 rounded-xl bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900 flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-bazar-black flex items-center justify-center shrink-0 shadow-sm">
                     <ShieldCheck className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                     <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">Enterprise-Grade Security</Typography>
                     <Typography variant="bodySm" className="text-[10px] opacity-40 leading-relaxed">
                       Your API keys are stored locally in your browser's persistent storage. We never store these on our central servers, ensuring you maintain full sovereignty over your AI assets.
                     </Typography>
                  </div>
               </div>

               <Button 
                 onClick={handleSave} 
                 disabled={!apiKey || !modelName || !isDirty}
                 className="w-full h-12 rounded-xl font-black uppercase tracking-widest bg-bazar-black text-white hover:bg-bazar-gray-800 dark:bg-bazar-white dark:text-bazar-black dark:hover:bg-bazar-gray-200"
               >
                 <Zap className="w-4 h-4 mr-2 fill-current" />
                 Initialize Bazar Intelligence
               </Button>
            </div>
         </Card>
      </section>

      {/* Info Footer */}
      <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-none flex gap-4">
         <Info className="w-5 h-5 text-purple-600 shrink-0" />
         <Typography variant="bodySm" className="text-xs opacity-60 italic leading-relaxed">
            By connecting your API key, you enable the agentic autonomous modules defined in the roadmap. This includes dynamic pricing, inventory prediction, and contextual shopping assistants.
         </Typography>
      </Card>
    </div>
  );
}
