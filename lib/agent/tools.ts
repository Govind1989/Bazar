import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { KnowledgeEngine } from "../ai/knowledge";

/**
 * CUSTOMER TOOLS
 */
export const productSearchTool = new DynamicStructuredTool({
  name: "search_products",
  description: "Search for products in the Bazar marketplace. Use for queries like 'find me', 'show me', 'available'.",
  schema: z.object({
    query: z.string().describe("The search query (e.g., 'bakery', 'pashmina').")
  }),
  func: async ({ query }) => {
    const data = KnowledgeEngine.getProductKnowledge(query);
    return data; // Returns JSON string of products
  }
});

/**
 * VENDOR TOOLS
 */
export const inventoryCheckTool = new DynamicStructuredTool({
  name: "check_inventory",
  description: "Check current stock levels for a product. Exclusive to vendors.",
  schema: z.object({
    productId: z.string().describe("The ID of the product.")
  }),
  func: async ({ productId }) => {
    // In a real app, this would query the DB. Mocking for now.
    return JSON.stringify({ status: "success", productId, stock: 42 });
  }
});

export const priceUpdateTool = new DynamicStructuredTool({
  name: "update_price",
  description: "Update the price of a specific product. Exclusive to vendors.",
  schema: z.object({
    productId: z.string().describe("The ID of the product."),
    newPrice: z.number().describe("The new price value.")
  }),
  func: async ({ productId, newPrice }) => {
    return JSON.stringify({ status: "success", productId, newPrice });
  }
});

/**
 * TOOL REGISTRY
 */
export const ALL_TOOLS = [
  productSearchTool,
  inventoryCheckTool,
  priceUpdateTool
];

export const getToolsForRole = (role: string) => {
  if (role === 'VENDOR') return [inventoryCheckTool, priceUpdateTool, productSearchTool];
  if (role === 'SUPERADMIN') return ALL_TOOLS;
  return [productSearchTool];
};
