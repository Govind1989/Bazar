import { Typography } from "@/components/ui/typography";
import Link from "next/link";

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Vendor CMS", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Foods", href: "#" },
      { name: "Electronics", href: "#" },
      { name: "Wearables", href: "#" },
      { name: "Services", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "AI Scaffolding", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bazar-gray-950 text-bazar-white py-12 md:py-24 px-6 md:px-12 border-t border-bazar-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
        <div className="col-span-2 lg:col-span-1 mb-8 md:mb-0">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-bazar-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-bazar-black rounded-full" />
            </div>
            <Typography variant="titleMd" as="span" className="font-mono tracking-tighter">
              BAZAR
            </Typography>
          </div>
          <Typography variant="bodySm" className="text-bazar-gray-400 max-w-xs">
            The infrastructure for local commerce in Nepal. 
            Empowering vendors with AI-ready storefronts.
          </Typography>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <Typography variant="titleSm" className="mb-6 uppercase tracking-widest text-bazar-gray-200">
              {section.title}
            </Typography>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-bazar-gray-500 hover:text-bazar-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-bazar-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <Typography variant="bodySm" className="text-bazar-gray-600 font-mono uppercase tracking-[0.2em] text-[10px]">
          &copy; 2026 BAZAR — SAJILO DIGITAL ECOSYSTEM
        </Typography>
        <div className="flex gap-8">
          <Link href="#" className="text-bazar-gray-600 hover:text-bazar-white transition-colors text-[10px] font-mono uppercase tracking-widest">Twitter</Link>
          <Link href="#" className="text-bazar-gray-600 hover:text-bazar-white transition-colors text-[10px] font-mono uppercase tracking-widest">LinkedIn</Link>
          <Link href="#" className="text-bazar-gray-600 hover:text-bazar-white transition-colors text-[10px] font-mono uppercase tracking-widest">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}
