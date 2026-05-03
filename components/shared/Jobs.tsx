"use client";

import { useState, useMemo } from "react";
import { JOBS, Job, VENDORS } from "@/data/mock";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  DollarSign, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Building2,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const JOB_TYPES = [
  { label: "All Types", value: "all" },
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
];

export function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");

  const sectors = useMemo(() => {
    const s = new Set<string>();
    JOBS.forEach(job => s.add(job.sector));
    return ["all", ...Array.from(s)];
  }, []);

  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const vendor = VENDORS.find(v => v.id === job.vendorId);
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || job.type === selectedType;
      const matchesSector = selectedSector === "all" || job.sector === selectedSector;
      return matchesSearch && matchesType && matchesSector;
    });
  }, [searchQuery, selectedType, selectedSector]);

  const JobCard = ({ job }: { job: Job }) => {
    const vendor = VENDORS.find(v => v.id === job.vendorId);
    
    return (
      <Card className="group bg-bazar-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 p-8 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Vendor Logo & Title */}
          <div className="flex-1">
            <div className="flex items-start gap-6 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-bazar-gray-100 dark:border-bazar-gray-900 bg-white">
                {vendor?.logo ? (
                  <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-bazar-gray-50 dark:bg-bazar-gray-950">
                    <Building2 className="w-8 h-8 opacity-20" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <Typography variant="titleLg" className="font-black uppercase tracking-tighter">
                    {job.title}
                  </Typography>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2",
                    job.type === 'full-time' ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400" :
                    job.type === 'contract' ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400" :
                    "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/20 dark:border-orange-900 dark:text-orange-400"
                  )}>
                    {job.type.replace('-', ' ')}
                  </div>
                </div>
                <Typography variant="bodySm" className="font-bold uppercase tracking-widest text-xs opacity-60">
                  {vendor?.name} • {job.sector}
                </Typography>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2 opacity-60">
                <MapPin className="w-4 h-4" />
                <Typography variant="bodySm" className="text-xs font-bold">{job.location}</Typography>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <DollarSign className="w-4 h-4" />
                <Typography variant="bodySm" className="text-xs font-bold">{job.salary}</Typography>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <Calendar className="w-4 h-4" />
                <Typography variant="bodySm" className="text-xs font-bold">Posted {job.postedAt}</Typography>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <Briefcase className="w-4 h-4" />
                <Typography variant="bodySm" className="text-xs font-bold">{job.requirements.length} Requirements</Typography>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="bodySm" className="opacity-60 leading-relaxed">
                {job.description}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900">
                    <CheckCircle2 className="w-3 h-3 opacity-40" />
                    <Typography variant="bodySm" className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                      {req}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="md:w-48 flex flex-col justify-center">
             <Button className="w-full h-14 rounded-2xl group/btn bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black font-black uppercase tracking-widest text-xs">
               Apply Now
               <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
             </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full">
      {/* Filters Header */}
      <section className="mb-16 space-y-12">
        <div className="flex flex-col gap-4">
          <div className="lg:col-span-5 space-y-4">
            <Typography variant="bodySm" className="font-bold uppercase tracking-[0.3em] opacity-40">Job Search</Typography>
            <div className="relative group">
              <div className="absolute inset-0 bg-bazar-black/[0.02] dark:bg-white/[0.02] rounded-3xl -m-2 blur-lg group-focus-within:bg-purple-500/[0.05] transition-all" />
              <div className="relative flex items-center bg-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white rounded-2xl overflow-hidden shadow-sm">
                <div className="pl-6 pr-4">
                  <Search className="w-5 h-5 opacity-20" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Software Engineer, Designer..."
                  className="flex-1 h-16 bg-transparent outline-none font-medium text-lg placeholder:opacity-20"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              {JOB_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    "px-6 py-3 rounded-xl border-2 transition-all uppercase text-[10px] font-black tracking-widest",
                    selectedType === type.value
                      ? "bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black border-bazar-black dark:border-bazar-white shadow-lg scale-105"
                      : "border-bazar-gray-100 dark:border-bazar-gray-900 opacity-40 hover:opacity-100 hover:border-bazar-black dark:hover:border-bazar-white"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
           <div className="flex items-center gap-2 opacity-40 whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <Typography variant="bodySm" className="text-[10px] font-black uppercase tracking-widest">Sector:</Typography>
           </div>
           {sectors.map((sector) => (
             <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={cn(
                  "px-4 py-2 rounded-lg border-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                  selectedSector === sector
                    ? "border-bazar-black dark:border-bazar-white opacity-100"
                    : "border-transparent opacity-30 hover:opacity-100"
                )}
             >
               {sector}
             </button>
           ))}
        </div>
      </section>

      {/* Results */}
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
           <Typography variant="titleMd" className="font-black uppercase tracking-tighter">
             {filteredJobs.length} Positions Available
           </Typography>
           <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900 mx-8 hidden md:block" />
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-[2.5rem]">
             <Typography variant="displayMd" className="opacity-10 mb-4">No positions found</Typography>
             <Typography variant="bodyMd" className="opacity-30 mb-8 max-w-sm mx-auto">
               Try adjusting your search or filters to find more opportunities.
             </Typography>
             <Button 
                variant="ghost" 
                onClick={() => {setSearchQuery(""); setSelectedType("all"); setSelectedSector("all");}}
                className="uppercase tracking-widest text-[10px] font-bold"
              >
                Reset All Filters
              </Button>
          </div>
        )}
      </div>
    </div>
  );
}
