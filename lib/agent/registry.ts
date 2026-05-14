import { z } from "zod";
import { BazarTool, UserRole } from "./types";
import { KnowledgeEngine } from "../ai/knowledge";

export const InventoryTools: BazarTool[] = [
  {
    name: "check_inventory",
    description: "Check stock levels for a specific product.",
    role: "VENDOR",
    schema: z.object({
      productId: z.string().describe("The ID of the product to check stock for.")
    }),
    execute: async (args, context) => {
      // In a real app, this would use a DB call, but we'll use KnowledgeEngine if we had a specific method
      return { status: "success", stock: 42, productId: args.productId };
    }
  }
];

export const PricingTools: BazarTool[] = [
  {
    name: "update_price",
    description: "Update the price of a product.",
    role: "VENDOR",
    schema: z.object({
      productId: z.string(),
      newPrice: z.number()
    }),
    execute: async (args, context) => {
      return { status: "success", productId: args.productId, newPrice: args.newPrice };
    }
  }
];

export const ConciergeTools: BazarTool[] = [
  {
    name: "search_products",
    description: "Search for products across the platform. Use this for 'find me', 'available', or 'show me' queries related to products.",
    role: "CUSTOMER",
    schema: z.object({
      query: z.string().describe("The search query for products (e.g., 'bakery', 'pashmina')."),
      category: z.string().optional()
    }),
    execute: async (args, context) => {
      const knowledge = KnowledgeEngine.getProductKnowledge(args.query);
      const results = JSON.parse(knowledge);
      
      return { 
        status: "success", 
        results: results.map((p: any) => ({
          ...p,
          id: Math.random().toString(36).substring(7), // Ensure IDs for the selection modal
          type: 'PRODUCT',
          description: `Available at ${p.vendor}. Stock: ${p.stock}`
        }))
      };
    }
  }
];

export const ToolRegistry: BazarTool[] = [
  ...InventoryTools,
  ...PricingTools,
  ...ConciergeTools,
];

export const getToolsForRole = (role: UserRole) => 
  ToolRegistry.filter(t => t.role === role || t.role === 'ALL');
