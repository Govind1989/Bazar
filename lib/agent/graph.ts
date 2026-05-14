import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { BaseMessage, HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";
import { ToolExecutor } from "@langchain/langgraph/prebuilt";
import { AgentContext, AgentLog } from "./types";
import { getToolsForRole } from "./tools";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Define the State for our Graph
const AgentState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  context: Annotation<AgentContext>(),
  logs: Annotation<Omit<AgentLog, 'id' | 'timestamp'>[]>({
    reducer: (x, y) => x.concat(y),
  }),
});

export class BazarGraph {
  private tools: any[];
  private toolExecutor: ToolExecutor;
  private model: any;
  private onStream: (log: Omit<AgentLog, 'id' | 'timestamp'>) => void;

  constructor(context: AgentContext, onStream: (log: Omit<AgentLog, 'id' | 'timestamp'>) => void) {
    this.onStream = onStream;
    this.tools = getToolsForRole(context.role);
    this.toolExecutor = new ToolExecutor({ tools: this.tools });
    
    // Initialize model (assuming Google Gemini as primary)
    // Keys will be passed from the frontend and handled via environment/proxy
    this.model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      maxOutputTokens: 2048,
    }).bindTools(this.tools);
  }

  // Node 1: Thought & Planning
  private async callModel(state: typeof AgentState.State) {
    const { messages } = state;
    
    this.onStream({
      role: state.context.role,
      type: 'THOUGHT',
      content: "Reasoning about user intent and selecting appropriate system modules...",
    });

    const response = await this.model.invoke(messages);
    return { messages: [response] };
  }

  // Node 2: Tool Execution
  private async executeTools(state: typeof AgentState.State) {
    const { messages } = state;
    const lastMessage = messages[messages.length - 1] as AIMessage;
    
    const toolCalls = lastMessage.tool_calls || [];
    const outputs: BaseMessage[] = [];

    for (const toolCall of toolCalls) {
      this.onStream({
        role: state.context.role,
        type: 'TOOL_CALL',
        content: `Accessing system module: ${toolCall.name}...`,
        metadata: { tool: toolCall.name, args: toolCall.args }
      });

      const result = await this.toolExecutor.invoke(toolCall);
      
      // Special logic for product selection modal
      if (toolCall.name === 'search_products') {
        const products = JSON.parse(result);
        if (products.length > 0) {
          this.onStream({
            role: state.context.role,
            type: 'ACTION',
            content: `Found ${products.length} matches. Presenting for selection.`,
            metadata: {
              selection: {
                title: "Bazar Intelligence Matches",
                items: products.map((p: any) => ({
                  ...p,
                  id: Math.random().toString(36).substring(7),
                  type: 'PRODUCT',
                  description: `Vendor: ${p.vendor} | Stock: ${p.stock}`
                }))
              }
            }
          });
        }
      }

      outputs.push(new ToolMessage({
        content: result,
        tool_call_id: toolCall.id!,
      }));
    }

    return { messages: outputs };
  }

  // Router logic
  private shouldContinue(state: typeof AgentState.State) {
    const { messages } = state;
    const lastMessage = messages[messages.length - 1] as AIMessage;
    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
      return "tools";
    }
    return END;
  }

  public async run(userInput: string, context: AgentContext) {
    const workflow = new StateGraph(AgentState)
      .addNode("agent", this.callModel.bind(this))
      .addNode("tools", this.executeTools.bind(this));

    workflow.addEdge(START, "agent");
    workflow.addConditionalEdges("agent", this.shouldContinue.bind(this));
    workflow.addEdge("tools", "agent");

    const app = workflow.compile();
    
    const finalState = await app.invoke({
      messages: [new HumanMessage(userInput)],
      context: context,
      logs: []
    });

    const lastMsg = finalState.messages[finalState.messages.length - 1];
    this.onStream({
      role: context.role,
      type: 'CONTENT',
      content: lastMsg.content as string,
    });

    return finalState;
  }
}
