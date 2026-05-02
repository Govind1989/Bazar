import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CommandSearch } from "@/components/shared/CommandSearch";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "BAZAR | Unified E-Commerce Platform",
  description: "Monochromatic, AI-ready marketplace for Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased bg-white dark:bg-bazar-black text-bazar-black dark:text-bazar-white`}
      >
        <Providers>
          {children}
          <CommandSearch />
        </Providers>
      </body>
    </html>
  );
}


