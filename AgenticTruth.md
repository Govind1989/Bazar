# BAZAR — AGENTIC TRUTH SOURCE
## Unified Next.js Multi-Tenant E-Commerce Platform

This document serves as the foundational truth for all agentic AI entities interacting with the BAZAR repository. It maps the current architectural state, file-level responsibilities, and functional logic.

---

## 1. PROJECT OVERVIEW
**BAZAR** is a multi-tenant, multi-category e-commerce ecosystem built on **Next.js 15 (App Router)**. It provides a high-performance, **Adaptive Monochromatic Infrastructure** for the Nepali market, supporting both physical goods and service-based commerce.

### Core Stack
- **Framework**: Next.js 15 (App Router)
- **Theme Engine**: `next-themes` (Class-based hydration)
- **State**: Zustand (Persisted)
- **Data Fetching**: TanStack Query (React Query) v5
- **Styling**: Tailwind CSS (Adaptive Monochromatic System)
- **Icons**: Lucide React
- **Animations**: Framer Motion, GSAP

---

## 2. REPOSITORY STRUCTURE

```text
/
├── app/                     # Next.js App Router (Route Groups)
│   ├── (public)/            # SEO-optimized Storefronts & Hubs
│   ├── (dashboard)/         # Vendor Administration Portal (SPA-feel)
│   ├── (admin)/             # Platform-wide "BAZAR OS" Panel
│   ├── layout.tsx           # Global Root Layout (Theme & Font injection)
│   └── providers.tsx        # Context Orchestration (Query, Theme, Auth)
├── components/
│   ├── shared/              # Business components (Navbar, Cart, Auth)
│   ├── ui/                  # Atomic Design (Theme-aware variants)
│   └── templates/           # Multi-tenant layout engines
├── store/                   # Persisted State (Auth, Cart, CMS, System)
├── hooks/                   # Business logic & Translation hooks
├── tailwind.config.ts       # Design system semantic tokens
└── middleware.ts            # Multi-tenant routing & security
```

---

## 3. FILE & FUNCTION DIRECTORY

### 3.1 Core Application Shell
#### `app/layout.tsx`
- **Purpose**: Root shell with hydration-safe theme management.
- **Logic**: Injects fonts, handles `suppressHydrationWarning` for `next-themes`, and sets base semantic colors (`bg-white dark:bg-black`). Integrates `CommandSearch` (Global CMD+K) and `FloatingDock` (Agentic Hub) at the root level.

#### `app/providers.tsx`
- **Purpose**: Client-side context orchestration.
- **Logic**: Initializes `QueryClient` and wraps the app in `ThemeProvider` (class-attribute, system-preference enabled).

#### `components/ui/button.tsx` & `card.tsx`
- **Logic**: Implements CVA (Class Variance Authority) with theme-aware variants. Primary/Outline/Ghost variants dynamically invert colors based on `html.dark` class.

### 3.2 Dynamic Routing & Navigation
#### `app/(public)/page.tsx`
- **Logic**: Dynamic Entry Point. Switches between `MarketplaceHome` (Classic) and `MarketPlaceSocio` (Social) based on the `marketplaceView` state from `useSystemStore`.

#### `components/shared/Navbar.tsx`
- **Logic**: Dual-Mode Navigation. Automatically detects vendor storefronts via `usePathname` and switches to a minimalistic "Jump to..." mode. In this mode, global links are hidden, focusing on the `Explore` (Mega Menu) functionality for platform-wide discovery. Orchestrates global navigation, Cart access, and the **Adaptive Theme Toggle**.

#### `components/shared/VendorNavbar.tsx`
- **Logic**: Vendor-Specific Taxonomies. Rendered on vendor storefronts via a **Global Hamburger Menu** for cleaner discovery. Synchronized with `useCMSStore` for real-time updates. Supports deep-linking to vendor-managed sub-categories.

#### `middleware.ts`
- **Logic**: Strategic interceptor for multi-tenant subdomains and route-based session guards.

### 3.3 State & Business Logic Orchestration
#### `store/useSystemStore.ts`
- **Logic**: Global Platform Configuration. Manages `language` (EN/NP) and `marketplaceView` (Classic vs. Social). Persisted to `bazar-system-storage`.

#### `store/useUserStore.ts`
- **Logic**: Manages the platform's social graph and AI preferences.
- **Hierarchical Favoriting**: Favoriting a sub-category automatically triggers the "Favorite" state for its parent category.
- **Bazar Intelligence**: Stores `aiSettings` (API Keys, Preferred Model) for both Users and Vendors.
- **Global Messaging Sync**: Centralizes `isMessageModalOpen` and `activeConversationVendorId`.

#### `store/useAuthStore.ts`
- **Logic**: Persistent authentication state. Supports role-switching (Customer/Vendor/SuperAdmin) and role-specific redirection logic. Includes `vendorId` mapping for seamless management of vendor-specific resources.

#### `store/useCMSStore.ts`
- **Logic**: Multi-tenant Configuration & Taxonomy Management. Handles real-time preview and persistence of vendor-specific storefront configurations, including the management of `VendorCategory` and `VendorSubCategory` lifecycles (Create, Update, Archive).

### 3.4 Shared Architectural Components
#### `components/templates/TemplateEngine.tsx`
- **Purpose**: Dynamic Layout Orchestrator.
- **Logic**: Resolves the correct layout template (`GoldFood`, `Minimal`, etc.) from the `TemplateRegistry` based on the vendor's CMS configuration.

#### `components/shared/FloatingDock.tsx`
- **Purpose**: The "Agentic Command Center". 
- **Logic**: Dual-Mode interaction hub. 
  - **Messaging Mode**: Direct Human-to-Human contact, synchronized with the global messaging store.
  - **AI Mode**: Role-aware assistant ("User Assistant" vs. "Vendor Assistant"). Includes placeholder logic for API-driven autonomous tasks.

#### `components/shared/AuthModal.tsx`
- **Logic**: Unified authentication gateway. Supports multi-role user accounts with a "Role Selection" phase. Implements role-based redirection: `SuperAdmin` -> `/admin`, `Vendor` -> `/dashboard`, `Customer` -> `/account`.

#### `components/shared/Jobs.tsx`
- **Purpose**: Career discovery interface.
- **Logic**: Multi-dimensional filtering (Job Type, Sector) and real-time search across job titles and vendor names.

---

## 4. IMPLEMENTATION STATUS

### ✅ Phase 1-5: Core Infrastructure
- Unified App Router, Monochromatic System, Atomic UI.
- Multi-Tenant Storefronts (`/[vendor]`) & Service Economy Hubs.
- Persistence-ready Shopping Cart & WYSIWYG Store Customizer.
- Vendor Dashboard & Super Admin "BAZAR OS".

### ✅ Phase 6: Prototype Readiness
- **Omni-Search Orchestrator**: Global CMD+K discovery.
- **Transactional Flow**: 3-step Checkout (Shipping -> Payment -> Success).
- **Mobile Experience**: PWA Shell Simulator for high-fidelity mobile previews.
- **Linguistic Engine**: Full English & Nepali infrastructure.
- **Authentication**: Role-aware Mock system with selection logic.

### ✅ Phase 7: Adaptive Design System
- **next-themes Integration**: Seamless Dark/Light mode orchestration.
- **Semantic Tokenization**: Tailwind config refactored for theme-aware colors.
- **Iconography**: Dynamic Sun/Moon toggle with state-aware rendering.

### ✅ Phase 8: Social & Discovery Engine
- **Compact Discovery UI**: Refactored Category Catalog with high-density cards and sub-category favoriting.
- **Advanced Partner Filtering**: Vendor discovery hub with category-based radio filtering and real-time craft search.
- **Agentic Messaging Bridge**: Integrated "Message" triggers that bridge discovery and transaction.
- **Career Ecosystem**: Full end-to-end Jobs module with multi-vendor listings and sector-specific discovery.

### ✅ Phase 9: Socio-Ecommerce & Adaptive Layouts
- **MarketPlaceSocio**: Redesign of the storefront as a social-first experience with masonry feeds and interactive tags.
- **Strategic UI Toggling**: Implementation of `marketplaceView` in `useSystemStore` for on-the-fly paradigm transitions.
- **Story Architecture**: Animated vendor stories with immersive full-screen views.

### ✅ Phase 10: High-Fidelity C2C Marketplace
- **P2P Trading Hub**: Dedicated interface for peer-to-peer transactions featuring localized discovery.
- **Trust Infrastructure**: Simulated escrow support and verification signals.

### ✅ Phase 11: Specialized Vertical Templates
- **Advanced Food Templates**: Launch of `GoldFood`, `PlatinumFood`, and `SilverFood` templates with parallax effects and premium menu grids.

### ✅ Phase 12: Bazar Intelligence & AI Integration
- **Agentic Hub**: Enhanced `FloatingDock` with specialized AI assistance for different user roles.
- **AI Configuration**: Secured Zustand-based storage for user/vendor API keys to enable private LLM-driven features.
- **Context-Aware Assistance**: Proactive help system ready for LLM grounding.

### ✅ Phase 13: Advanced Taxonomy & Multi-Tenant Logic (NEW)
- **Two-Column Taxonomy Drill-Down**: Refactored `CategoryManager` for structured Category -> Sub-category management.
- **Strategic vendorId Mapping**: Seamless synchronization between Vendor Users and their Storefronts, resolving legacy ID mismatch bugs.
- **Hamburger-First Navigation**: Global vendor categories moved to a specialized sidebar in `VendorNavbar` for aesthetic minimalism.

### ✅ Phase 14: Loyalty & Campaigns Ecosystem (NEW)
- **Vendor Campaign Architect**: Full-featured creation suite for multi-type campaigns (Flash Sales, Loyalty, Referrals, Occasional, Social Shoutouts, Free Delivery).
- **Targeting Precision**: Logic for applying campaigns to entire catalogs, specific categories, sub-categories, or individual products.
- **Automated Lifecycle Management**: Status orchestration (Upcoming, Active, Expired) based on temporal logic.
- **User Reward Tracking**: Real-time progress visualization in the User Dashboard for loyalty targets with "Cash Out" simulation.

### ✅ Phase 15: Unified Messaging & Navigation Refinement (NEW)
- **Omni-Directional Message Toggle**: Refactored the history sidebar toggle in both Vendor and User dashboards to use dynamic `ChevronLeft` and `ChevronRight` icons for intuitive navigation.
- **Legacy Icon Cleanup**: Systematic replacement of generic `MessageSquare` icons with purpose-driven directional cues in history modules.
- **Enhanced Sidebar Sync**: Seamless integration of message history states across both dashboard architectures for a unified SPA-feel.

---

## 5. STRATEGIC ROADMAP

1.  **AI-Scaffolding Simulation**: Demonstrate how a vendor can "generate" a store description using the platform's AI primitives.
2.  **Live Real-time Mocking**: Integrate WebSockets/SSE mocks for "New Order" notifications in the Vendor Dashboard.
3.  **Analytics Visualization**: Implement GSAP/Framer charts for the "BAZAR OS" platform GMV view.
4.  **Vendor Performance Index**: Create a logic layer that "rates" vendors based on mock delivery speeds and customer feedback.
5.  **Smart AI Assistant**: Activate the "Assistant" tab in the `FloatingDock` to provide context-aware platform help.

---
*Generated by Agentic Truth Engine*
*Last Update: 2026-05-08 | Version 1.8*
