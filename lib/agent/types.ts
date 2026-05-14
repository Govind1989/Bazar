import { z } from "zod";

export type UserRole = 'CUSTOMER' | 'VENDOR' | 'SUPERADMIN' | 'ALL';

export interface AgentContext {
  userId: string;
  vendorId?: string;
  role: UserRole;
  preferences: Record<string, any>;
}

export interface BazarTool {
  name: string;
  description: string;
  schema: z.ZodObject<any>;
  role: UserRole;
  execute: (args: any, context: AgentContext) => Promise<any>;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  role: UserRole;
  type: 'THOUGHT' | 'TOOL_CALL' | 'CONTENT' | 'ACTION';
  content: string;
  metadata?: Record<string, any>;
}

export interface MessageHistory {
  id: string;
  timestamp: string;
  role: 'user' | 'agent';
  content: string;
  metadata?: Record<string, any>;
}
