import { PRODUCTS, VENDORS, CATEGORIES, SERVICES, JOBS } from "@/data/mock";
import { MOCK_CONVERSATIONS } from "@/data/messages";

/**
 * BAZAR KNOWLEDGE ENGINE
 * 
 * This module transforms our static prototype data into structured context
 * that can be consumed by the LLM during agentic reasoning.
 */

export const KnowledgeEngine = {
  getPlatformOverview: () => {
    return `
      BAZAR is a multi-tenant e-commerce platform in Nepal.
      Categories: ${CATEGORIES.map(c => c.name).join(', ')}
      Vendors: ${VENDORS.map(v => v.name).join(', ')}
    `;
  },

  getVendorContext: (vendorId: string) => {
    const vendor = VENDORS.find(v => v.id === vendorId);
    if (!vendor) return "Vendor not found.";
    
    const products = PRODUCTS.filter(p => p.vendorId === vendorId);
    const services = SERVICES.filter(s => s.vendorId === vendorId);
    const jobs = JOBS.filter(j => j.vendorId === vendorId);

    return `
      Vendor: ${vendor.name}
      Description: ${vendor.description}
      Catalog: ${products.map(p => p.name).join(', ')}
      Services: ${services.map(s => s.name).join(', ')}
      Openings: ${jobs.map(j => j.title).join(', ')}
    `;
  },

  getProductKnowledge: (query: string) => {
    // Simple mock search for the LLM
    const relevant = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    
    return JSON.stringify(relevant.map(p => ({
      name: p.name,
      price: p.price,
      stock: p.stock,
      vendor: VENDORS.find(v => v.id === p.vendorId)?.name
    })));
  },

  getConversationalContext: (userId: string) => {
    const conversations = MOCK_CONVERSATIONS.filter(c => c.participantId === userId);
    return JSON.stringify(conversations.map(c => ({
      with: c.participantName,
      lastMsg: c.lastMessage
    })));
  }
};
