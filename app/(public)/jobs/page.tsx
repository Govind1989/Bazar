"use client";

import { Jobs } from "@/components/shared/Jobs";
import { Typography } from "@/components/ui/typography";
import { Briefcase } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-bazar-white dark:bg-bazar-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 opacity-40">
              <Briefcase className="w-5 h-5" />
              <Typography variant="bodySm" className="font-bold uppercase tracking-[0.3em] text-[10px]">
                Career Opportunities
              </Typography>
            </div>
            <Typography variant="displayLg" className="font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Find your next <br />
              <span className="opacity-20 italic">mission</span> at Bazar.
            </Typography>
            <Typography variant="titleMd" className="opacity-60 font-medium max-w-xl">
              Connect with Nepal's most innovative vendors and startups. From creative roles to technical leadership, discover your next big move.
            </Typography>
          </div>
        </header>

        <Jobs />
      </div>
    </div>
  );
}
