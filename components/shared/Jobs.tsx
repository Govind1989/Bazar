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
      <Card className="group bg-bazar-white dark:bg-bazar-black border-2 border-bazar-gray-100 dark:border-bazar-gray-900 p-4 sm:p-8 hover:border-bazar-black dark:hover:border-bazar-white transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Vendor Logo & Title */}
          <div className="flex-1">
            <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-bazar-gray-100 dark:border-bazar-gray-900 bg-white">
                {vendor?.logo ? (
                  <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-bazar-gray-50 dark:bg-bazar-gray-950">
                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8 opacity-20" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Typography variant="titleLg" className="font-black uppercase tracking-tighter text-base sm:text-2xl truncate">
                    {job.title}
                  </Typography>
                  <div className={cn(
                    "px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest border-2",
                    job.type === 'full-time' ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400" :
                    job.type === 'contract' ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400" :
                    "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/20 dark:border-orange-900 dark:text-orange-400"
                  )}>
                    {job.type.replace('-', ' ')}
                  </div>
                </div>
                <Typography variant="bodySm" className="font-bold uppercase tracking-widest text-[10px] sm:text-xs opacity-60 truncate">
                  {vendor?.name} • {job.sector}
                </Typography>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 opacity-60">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <Typography variant="bodySm" className="text-[10px] sm:text-xs font-bold truncate">{job.location}</Typography>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <Typography variant="bodySm" className="text-[10px] sm:text-xs font-bold truncate">{job.salary}</Typography>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <Typography variant="bodySm" className="text-[10px] sm:text-xs font-bold truncate">{job.postedAt}</Typography>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <Typography variant="bodySm" className="text-[10px] sm:text-xs font-bold truncate">{job.requirements.length} Req.</Typography>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="bodySm" className="opacity-60 leading-relaxed text-[11px] sm:text-sm line-clamp-2 sm:line-clamp-none">
                {job.description}
              </Typography>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {job.requirements.slice(0, 2).map((req, i) => (
                  <div key={i} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-bazar-gray-50 dark:bg-bazar-gray-950 border border-bazar-gray-100 dark:border-bazar-gray-900">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-40" />
                    <Typography variant="bodySm" className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider opacity-60">
                      {req}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="md:w-48 flex flex-col justify-center">
             <Button className="w-full h-10 sm:h-14 rounded-xl sm:rounded-2xl group/btn bg-bazar-black dark:bg-bazar-white text-white dark:text-bazar-black font-black uppercase tracking-widest text-[10px] sm:text-xs">
               Apply Now
               <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover/btn:translate-x-1 transition-transform" />
             </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full">
      {/* Filters Header */}
      <section className="mb-10 sm:mb-16 space-y-8 sm:space-y-12">
        <div className="flex flex-col gap-6 sm:gap-4">
          <div className="space-y-3 sm:space-y-4">
            <Typography variant="bodySm" className="font-bold uppercase tracking-[0.3em] opacity-40 text-[10px] sm:text-xs text-center sm:text-left">Job Search</Typography>
            <div className="relative group">
              <div className="absolute inset-0 bg-bazar-black/[0.02] dark:bg-white/[0.02] rounded-2xl sm:rounded-3xl -m-1 sm:-m-2 blur-lg group-focus-within:bg-purple-500/[0.05] transition-all" />
              <div className="relative flex items-center bg-white dark:bg-bazar-black border-2 border-bazar-black dark:border-bazar-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                <div className="pl-4 sm:pl-6 pr-2 sm:pr-4">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 opacity-20" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Software Engineer..."
                  className="flex-1 h-12 sm:h-16 bg-transparent outline-none font-medium text-sm sm:text-lg placeholder:opacity-20"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
              {JOB_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    "px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all uppercase text-[8px] sm:text-[10px] font-black tracking-widest",
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

        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar border-b border-bazar-gray-100 dark:border-bazar-gray-900">
           <div className="flex items-center gap-1.5 sm:gap-2 opacity-40 whitespace-nowrap">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <Typography variant="bodySm" className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Sector:</Typography>
           </div>
           {sectors.map((sector) => (
             <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={cn(
                  "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all whitespace-nowrap",
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
      <div className="space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
           <Typography variant="titleMd" className="font-black uppercase tracking-tighter text-sm sm:text-xl">
             {filteredJobs.length} Positions Available
           </Typography>
           <div className="h-px flex-1 bg-bazar-gray-100 dark:bg-bazar-gray-900 mx-4 sm:mx-8 hidden sm:block" />
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="py-20 sm:py-32 text-center border-2 border-dashed border-bazar-gray-100 dark:border-bazar-gray-900 rounded-2xl sm:rounded-[2.5rem]">
             <Typography variant="displayMd" className="opacity-10 mb-2 sm:mb-4 text-2xl sm:text-5xl">No positions found</Typography>
             <Typography variant="bodyMd" className="opacity-30 mb-6 sm:mb-8 max-w-sm mx-auto text-xs sm:text-base">
               Try adjusting your search or filters to find more opportunities.
             </Typography>
             <Button 
                variant="ghost" 
                onClick={() => {setSearchQuery(""); setSelectedType("all"); setSelectedSector("all");}}
                className="uppercase tracking-widest text-[9px] sm:text-[10px] font-bold"
              >
                Reset All Filters
              </Button>
          </div>
        )}
      </div>
    </div>
  );
}
