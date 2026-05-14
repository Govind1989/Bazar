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
#### `store/useUserStore.ts`
- **Logic**: Manages the platform's social graph, AI preferences, and **Agentic Sessions**.
- **Agentic Sessions**: Groups messages, internal reasoning (`THOUGHT`), and system executions (`TOOL_CALL`) into coherent, role-segregated conversational threads. Supports full session lifecycle (Create, Update, Resume, Delete).
- **Hierarchical Favoriting**: Favoriting a sub-category automatically triggers the "Favorite" state for its parent category.
- **Dispute Resolution**: Centralizes the `complaints` state and `addComplaint` logic for platform-wide quality governance.
- **Bazar Intelligence**: Stores `aiSettings` (API Keys, Preferred Model) for both Users and Vendors.
- **Global Messaging Sync**: Centralizes human-to-human contact states.

#### `lib/agent/graph.ts`
- **Purpose**: LangGraph Orchestration Engine.
- **Logic**: Implements a stateful **ReAct (Reasoning + Acting)** loop using `@langchain/langgraph`. Orchestrates the flow between the `Planner` (LLM call), `Executor` (Tool dispatch), and `Responder`. Streams multiplexed data chunks (`THOUGHT`, `TOOL_CALL`, `CONTENT`) back to the frontend.

#### `lib/agent/tools.ts`
- **Purpose**: Modular Tool Registry.
- **Logic**: Defines system capabilities using `DynamicStructuredTool`. Enforces strict **Role-Based Tool Access (RBTA)**: Vendors get Inventory/Pricing modules; Customers get Marketplace Discovery. Tools are grounded via the `KnowledgeEngine`.

#### `lib/ai/knowledge.ts`
- **Purpose**: RAG Context Bridge.
- **Logic**: Transforms static prototype data (`PRODUCTS`, `VENDORS`, `SERVICES`) into structured, searchable context for the LLM. Grounding source for all agentic product searches.

### 3.4 Shared Architectural Components
#### `components/shared/FloatingDock.tsx`
- **Purpose**: The "Agentic Command Center". 
- **Logic**: Dual-Mode interaction hub. 
  - **Human Support Channel**: Direct human-to-human contact using `MOCK_CONVERSATIONS`, WebSocket-ready.
  - **Intelligence Assistant**: Session-based agentic interface with auto-scrolling history, interaction-level deletion, and HITL selection triggers.

#### `components/shared/AgenticSelectionModal.tsx`
- **Purpose**: Human-in-the-Loop (HITL) Interceptor.
- **Logic**: Presents matched options (Products/Vendors) for user validation when the agent detects multiple results, ensuring safe autonomous transitions.

#### `components/shared/SessionChatHistory.tsx`
- **Purpose**: Unified Intelligence Hub UI.
- **Logic**: Renders session previews across all dashboards. Supports "Review & Resume" and surgical deletion of interaction threads.

---

## 4. IMPLEMENTATION STATUS

### ✅ Phase 1-21: Foundation & Modular LLM
- Unified App Router, Monochromatic System, Atomic UI.
- Multi-Tenant Storefronts, CMS Customizer, & BAZAR OS.
- LangGraph modular registry & static knowledge bridge.

### ✅ Phase 22: Session-Based Intelligence & HITL (NEW)
- **Unified Agentic Sessions**: Refactored store to group reasoning and messages into coherent threads.
- **Cross-Dashboard Audit Hubs**: Deployment of specialized "Intelligence Hubs" in User, Vendor, and Admin panels.
- **Human-in-the-Loop Orchestration**: Integration of selection modals for multi-match search results.
- **Granular Interaction Control**: Hover-based deletion for both sessions and individual messages.
- **Role-Segregated Auditing**: Automatic filtering of sessions based on user context (Shop Intelligence vs. Personal Audit).

---

## 5. STRATEGIC ROADMAP

1.  **AI-Scaffolding Simulation**: Demonstrate how a vendor can "generate" a store description using the platform's AI primitives.
2.  **Live WebSocket Integration**: Replace static human support data with real-time bidirectional messaging.
3.  **Analytics Visualization**: Implement GSAP/Framer charts for the "BAZAR OS" platform GMV view.
4.  **Vendor Performance Index**: Create a logic layer that "rates" vendors based on mock delivery speeds and customer feedback.

## 6. DEVELOPMENT PROCESS
BAZAR adheres to a rigorous **Research -> Strategy -> Execution -> Validation** lifecycle, optimized for **Agentic Autonomy** and architectural integrity.

### 6.1 Research & Discovery (The "Deep Dive")
- **Codebase Mapping**: Systematic use of `grep` and `glob` to understand existing patterns (e.g., CVA variants, Zustand persistence) before proposing changes.
- **Dependency Orchestration**: Resolving complex peer-dependency conflicts (e.g., `@langchain/core` versioning) using `--legacy-peer-deps` for stable integration.
- **Impact Analysis**: Identification of cross-cutting concerns (e.g., how session persistence affects global layout and sidebar) to ensure zero-regression delivery.

### 6.2 Strategic Architecture (The "Blueprint")
- **Reasoning-First Orchestration**: Designing LangGraph workflows that prioritize transparency (Streaming `THOUGHT` logs) before action.
- **Sovereign Key Management**: Implementing dynamic API key injection at the request level, ensuring no secrets are persisted on central servers.
- **Modular Scalability**: Building self-contained tools with Zod schema validation for type-safe LLM tool-calling.

### 6.3 Implementation & Craft (The "Execution")
- **Multiplexed Streaming**: Engineering an API bridge that delivers raw data chunks for real-time UI synchronization of chat and logs.
- **Fluidic UX Polishing**: Leveraging `Framer Motion` and `Lucide` to deliver a premium, monochromatic "alive" feel in the Floating Dock and Intelligence Hubs.
- **Surgical State Design**: Designing minimal, persistent state extensions in Zustand to support complex session grouping without architectural bloat.

### 6.4 Verification & Finality (The "QA")
- **Role-Aware Validation**: Exhaustive testing of the entire user journey across Customer, Vendor, and Admin roles to ensure strict data segregation.
- **Type Safety Enforcement**: Maintaining strict TypeScript integrity across LangGraph nodes, Tool definitions, and selection schemas.
- **Truth Source Synchronization**: Updating `@AgenticTruth.md` immediately after each major feature deployment to maintain a 1:1 map of the repository state.

---
*Generated by Agentic Truth Engine*
*Last Update: 2026-05-14 | Version 2.2*
