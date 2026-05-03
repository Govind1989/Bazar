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
- **Logic**: Injects fonts, handles `suppressHydrationWarning` for `next-themes`, and sets base semantic colors (`bg-white dark:bg-black`).

#### `app/providers.tsx`
- **Purpose**: Client-side context orchestration.
- **Logic**: Initializes `QueryClient` and wraps the app in `ThemeProvider` (class-attribute, system-preference enabled).

#### `components/ui/button.tsx` & `card.tsx`
- **Logic**: Implements CVA (Class Variance Authority) with theme-aware variants. Primary/Outline/Ghost variants dynamically invert colors based on `html.dark` class.

### 3.2 Dynamic Routing & Navigation
#### `components/shared/Navbar.tsx`
- **Logic**: Orchestrates global navigation, Cart access, and the **Adaptive Theme Toggle**. Uses a `mounted` check to prevent hydration mismatch for theme icons. Includes the `Linguistic Engine` toggle for EN/NP support.

#### `middleware.ts`
- **Logic**: Strategic interceptor for multi-tenant subdomains and route-based session guards.

### 3.3 State & Business Logic Orchestration
#### `store/useUserStore.ts`
- **Logic**: Manages the platform's social graph (Followed Vendors, Favorited Categories).
- **Hierarchical Favoriting**: Implements logic where favoriting a sub-category automatically triggers the "Favorite" state for its parent category, ensuring logical data consistency.
- **Global Modal Sync**: Centralizes `isMessageModalOpen` and `activeConversationVendorId` to allow disparate UI components to trigger the global Messaging interface.

#### `store/useAuthStore.ts`
- **Logic**: Persistent authentication state. Supports role-switching (Customer/Vendor/SuperAdmin) and provides reactive `isAuthenticated` guards for protected actions like direct messaging.

### 3.4 Shared Architectural Components
#### `components/shared/FloatingDock.tsx`
- **Purpose**: The "Agentic Command Center". 
- **Logic**: Centralized hub for Human-to-Human (Messaging) and Human-to-AI (Assistant) interactions. Uses `useEffect` to synchronize its internal modal state with the global `useUserStore` triggers.

#### `components/shared/AuthModal.tsx`
- **Logic**: Unified authentication gateway. Automatically triggered by protected action guards (e.g., "Message Vendor") for non-authenticated sessions.

#### `components/shared/Jobs.tsx` (NEW)
- **Purpose**: Career discovery interface.
- **Logic**: Implements multi-dimensional filtering (Job Type, Sector) and real-time search across job titles and vendor names.

#### `app/(public)/jobs/page.tsx` (NEW)
- **Purpose**: SEO-ready Jobs landing page.
- **Logic**: Integrates the `Jobs` component with a high-fidelity editorial header following the **Cal Sans** aesthetic.

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
- **Authentication**: Role-switching Mock (Customer/Vendor/Admin).

### ✅ Phase 7: Adaptive Design System
- **next-themes Integration**: Seamless Dark/Light mode orchestration.
- **Semantic Tokenization**: Tailwind config refactored for theme-aware colors.
- **Iconography**: Dynamic Sun/Moon toggle with state-aware rendering.

### ✅ Phase 8: Social & Discovery Engine (NEW)
- **Compact Discovery UI**: Refactored Category Catalog with high-density cards and sub-category favoriting.
- **Advanced Partner Filtering**: Vendor discovery hub with category-based radio filtering and real-time craft search.
- **Agentic Messaging Bridge**: Direct-to-Vendor communication infrastructure. Integrated "Message" triggers that bridge the gap between discovery and transaction.
- **Search Architecture**: Multi-level search implementation that traverses both primary and nested data structures (Categories + Sub-categories).
- **Career Ecosystem**: Full end-to-end Jobs module with multi-vendor listings and sector-specific discovery.

---

## 5. STRATEGIC ROADMAP

1.  **AI-Scaffolding Simulation**: Demonstrate how a vendor can "generate" a store description using the platform's AI primitives.
2.  **Live Real-time Mocking**: Integrate WebSockets/SSE mocks for "New Order" notifications in the Vendor Dashboard.
3.  **Analytics Visualization**: Implement GSAP/Framer charts for the "BAZAR OS" platform GMV view.
4.  **Vendor Performance Index**: Create a logic layer that "rates" vendors based on mock delivery speeds and customer feedback.
5.  **Smart AI Assistant**: Activate the "Assistant" tab in the `FloatingDock` to provide context-aware platform help.

---
*Generated by Agentic Truth Engine*
*Last Update: 2026-05-03 | Version 1.3*
