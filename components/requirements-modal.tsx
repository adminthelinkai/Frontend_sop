"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface RequirementsModalProps {
  isOpen: boolean
  onClose: () => void
  stepIndex?: number
}

const sectionContent: { [key: number]: any[] } = {
  0: [
    // Requirement Understanding (7 pages)
    {
      title: "Pre-Project Client Discovery Questions",
      icon: "🤔",
      items: [
        "What is the primary purpose of this application?",
        "Who are your target users and what are their needs?",
        "What are the main business goals we're solving for?",
        "Do you have existing design systems or brand guidelines?",
        "Are there any compliance or accessibility requirements?",
      ],
      description:
        "Before starting any frontend development, it's critical to ask the client these questions to align expectations, understand project scope, and identify potential blockers early.",
    },
    {
      title: "Understand Client Brand Guidelines",
      icon: "🎨",
      items: [
        "Logo usage rules",
        "Fonts they prefer",
        "Color palette restrictions",
        "Button styles (sharp/rounded)",
        "Spacing style (tight/loose)",
      ],
      description: "Ensures your UI/UX matches the client's brand personality from Day 1.",
    },
    {
      title: "Identify Mandatory UI/UX Elements",
      icon: "✓",
      items: [
        "Standard header/footer pattern",
        "Preferred form layout",
        "Card styles",
        "Icon types (line/bold/custom)",
      ],
      description: "Some clients have fixed elements that must be included in the design.",
    },
    {
      title: "Map the Complete User Flow",
      icon: "🔄",
      items: ["Flow diagrams", "Step-by-step process (Login → Home → Function → Logout)", "Error states per flow"],
      description:
        "A new frontend engineer must understand the entire journey before writing code. This removes confusion and avoids redoing screens later.",
    },
    {
      title: "UI/UX Pain Points from Client Website",
      icon: "⚠",
      items: [
        "Client hates slow-loading animations",
        "Client doesn't want small text",
        "Client prefers minimal, clean UI",
      ],
      description: "This helps the engineer understand what to avoid and what to improve.",
    },
    {
      title: "Clarify All Hidden Requirements Early",
      icon: "❓",
      items: [
        'Ask the client: "What UI do you absolutely NOT want?"',
        'Ask: "What examples do you like?"',
        "Check: Are there compliance needs? (Accessibility, etc.)",
      ],
      description: "Most problems happen due to assumptions. Use this checklist to clarify early.",
    },
    {
      title: "Acceptance Criteria Per Screen",
      icon: "✅",
      items: ["All text readable", "No overflow issues", "Mobile responsive", "Works on standard breakpoints"],
      description: "Helps frontend engineers know EXACTLY when a screen is considered done.",
    },
  ],
  1: [
    // Tools Setup (4 pages)
    {
      title: "Development Tools Setup",
      icon: "🛠️",
      items: [
        "Cursor IDE (AI-powered development with MCP support)",
        "Agentic AI capabilities for autonomous code generation",
        "VSCode with extensions (alternative option)",
        "Git for version control",
        "Docker for database (optional)",
      ],
      description:
        "Choose and configure your development environment. Cursor provides agentic AI features that autonomously generate, test, and optimize code through MCP integration. Example: Cursor can automatically implement database schemas, generate API endpoints, and refactor components based on natural language requests.",
      hasButton: true,
      buttonText: "View MCP Samples",
    },
    {
      title: "Agentic AI Coding Workflow",
      icon: "🤖",
      items: [
        "Step 1: Brainstorm with LLMs (ChatGPT, Claude, Grok) to explore ideas and approach",
        "Step 2: Refine your requirements and create a detailed prompt",
        "Step 3: Paste the prompt into Cursor as context",
        "Step 4: Use Cursor's Plan Mode to generate an execution strategy",
        "Step 5: Review and approve the plan before proceeding",
        "Step 6: Switch to Agent Mode to autonomously execute the plan",
        "Step 7: Monitor progress and make adjustments as needed",
      ],
      description:
        "The optimal workflow for agentic AI development combines human strategy with AI execution. Start by thinking through your problem with various LLMs to brainstorm approaches. Once you have a solid idea, craft a detailed prompt explaining what you want to build. In Cursor, use Plan Mode to let the AI create a step-by-step implementation strategy. This gives you a chance to review and refine before letting the Agent handle the actual coding. Once approved, switch to Agent Mode to let the AI autonomously write, test, and refine your code.",
    },
    {
      title: "Model Selection Strategy",
      icon: "🧠",
      items: [
        "Auto Mode: Use for simpler tasks like form components, basic CRUD operations, and standard UI elements",
        "Specific Model Selection: Use Claude for complex business logic, GPT-4 for creative solutions, Grok for performance optimization",
        "Codebase Complexity Handling: If codebase size is high and model doesn't understand the prompt, switch models to get better results",
        "Model Fallback Plan: Start with default model, if results aren't satisfactory, try a different model with refined prompt",
        "Specialized Models: Use domain-specific models for database queries, API integration, and performance optimization",
      ],
      description:
        "Different AI models have different strengths. Use Auto Mode for straightforward tasks where any capable model will work well. For complex requirements—especially in large codebases—select a specific model known for your task type. If the AI model struggles to understand your prompt or produces suboptimal code in a large codebase, switching to a different model with a refined prompt often yields better results. Keep this in mind: sometimes a different perspective (model) solves the problem faster.",
    },
    {
      title: "Supabase MCP Configuration",
      icon: "🔌",
      items: [
        "MCP (Model Context Protocol) enables AI tools to access Supabase",
        "Configure API keys for local development",
        "Link database schema to your AI tools",
        "Enable real-time collaboration with AI",
      ],
      description:
        "Model Context Protocol allows your development tools to understand your database structure. This is essential for Cursor and other AI-powered editors to provide accurate suggestions.",
      isMcpSection: true,
      mcpSamples: [
        {
          title: "Supabase MCP Configuration",
          code: `{
  "mcpServers": {
    "supabase": {
      "command": "node",
      "args": ["./mcp-server.js"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_ANON_KEY": "your-anon-key",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
      }
    }
  }
}`,
        },
      ],
      showMcpSamples: false,
    },
    {
      title: "Self-Hosted MCP Server Setup",
      icon: "🖥️",
      items: [
        "Run MCP servers locally for complete control",
        "Connect custom backend services to AI tools",
        "Use for on-premise or private infrastructure",
        "Configure environment variables for local development",
        "Integrate with private databases and APIs",
      ],
      description:
        "Self-hosted MCP servers allow you to run Model Context Protocol on your own infrastructure. This is ideal for teams that need complete control over data, want to keep everything on-premise, or need to integrate with private systems.",
      hasButton: true,
      buttonText: "View MCP Samples",
      isMcpSection: true,
      mcpSamples: [
        {
          title: "Self-Hosted MCP Server Setup",
          code: `{
  "mcpServers": {
    "local-backend": {
      "command": "node",
      "args": ["./local-mcp-server.js"],
      "env": {
        "MCP_HOST": "localhost",
        "MCP_PORT": "3001",
        "API_BASE_URL": "http://localhost:3000",
        "DB_CONNECTION": "postgresql://user:pass@localhost/dbname"
      }
    }
  }
}`,
        },
      ],
      showMcpSamples: false,
    },
    {
      title: "Learning Resources",
      icon: "📚",
      items: [],
      description:
        "Essential learning materials for mastering your development stack. Click on the links below to explore each topic.",
      isResourcePage: true,
      resources: {
        notion: [
          { label: "Notion Basic Understanding", url: "https://youtu.be/kOf3QSBV29Y?si=eAuLnqVjVxGaRxbY" },
          { label: "Advanced Notion Workflows", url: "https://youtu.be/4o0AJYBEiBo?si=FiZloN-pJ0Zm4qxb" },
          { label: "Notion for Team Collaboration", url: "https://youtu.be/Ey18PDiaAYI?si=UOb469LbwVVayijn" },
        ],
        cursor: [
          { label: "Cursor IDE Exploration", url: "https://youtu.be/7w7kd-4ew2I?si=aUDZ3j-y4X9TmMKT" },
          { label: "Cursor Integration & MCP Setup", url: "https://youtu.be/yfpVU_uEpy4?si=GmdyC_s9OWYLARib" },
        ],
        aiStartups: [
          { label: "Building with AI: 10 Brutal Lessons", url: "https://youtu.be/FmUkuzcoTDU?si=fvevuKfXfk8zLUR6" },
          {
            label: "AI Startup Insights",
            url: "https://www.linkedin.com/posts/paoloperrone_10-brutal-lessons-from-shipping-6-ai-startups-activity-7358877017385160704-tcae",
          },
          { label: "Advanced AI Development Patterns", url: "https://youtu.be/gGCwSIlIRlY?si=K0WskbqARIbBFRLi" },
        ],
      },
    },
  ],
  2: [
    // Project Setup (11 pages)
    {
      title: "Initialize Git Repository",
      icon: "📦",
      items: [
        "Create GitHub/GitLab repository",
        "Clone repository locally",
        "Set up main and dev branches",
        "Add .gitignore for Next.js",
      ],
      description: "Sets up version control and collaboration framework.",
    },
    {
      title: "Create Next.js Project",
      icon: "⚡",
      items: [
        "Run: npx create-next-app@latest",
        "Select TypeScript, ESLint, Tailwind CSS",
        "Configure App Router",
        "Setup src/ folder structure",
      ],
      description: "Initializes the core Next.js application with recommended settings.",
    },
    {
      title: "Setup Supabase Connection",
      icon: "🗄️",
      items: [
        "Create Supabase project",
        "Get SUPABASE_URL and SUPABASE_ANON_KEY",
        "Install @supabase/supabase-js",
        "Create Supabase client instance",
      ],
      description: "Connects the application to Supabase for database and authentication.",
    },
    {
      title: "Configure Environment Variables",
      icon: "🔐",
      items: [
        ".env.local for development",
        ".env.example for team reference",
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      ],
      description: "Securely manages API keys and configuration across environments.",
    },
    {
      title: "Setup Project Folder Structure",
      icon: "📁",
      items: [
        "/app - Next.js pages and layouts",
        "/components - Reusable UI components",
        "/lib - Utility functions and helpers",
        "/hooks - Custom React hooks",
        "/types - TypeScript interfaces",
        "/public - Static assets",
      ],
      description: "Organizes code for scalability and team collaboration.",
    },
    {
      title: "Create Base Layouts & Components",
      icon: "🧩",
      items: ["Root layout (RootLayout.tsx)", "Navigation component", "Footer component", "Button and Form components"],
      description: "Establishes reusable components that other pages will use.",
    },
  ],
  3: [
    // UI Design & Component Planning (1 page)
    {
      title: "UI Design & Component Planning",
      icon: "🖌️",
      items: ["Wireframes and mockups", "Component hierarchy", "State management strategy"],
      description: "Plan the UI design and component structure to ensure consistency and efficiency.",
    },
  ],
  4: [
    // API Integration (1 page)
    {
      title: "API Integration",
      icon: "🔗",
      items: ["Define API endpoints", "Implement API calls", "Handle API responses"],
      description: "Integrate the backend API to fetch and display data.",
    },
  ],
  5: [
    // Testing & Bug Fixing (1 page)
    {
      title: "Testing & Bug Fixing",
      icon: "🔍",
      items: ["Unit tests", "Integration tests", "Bug tracking"],
      description: "Ensure the application is robust and free of bugs through thorough testing.",
    },
  ],
  6: [
    // Deployment (1 page)
    {
      title: "Deployment",
      icon: "🚀",
      items: ["CI/CD pipeline setup", "Environment variables management", "Monitoring and logging"],
      description: "Prepare the application for deployment with a reliable CI/CD pipeline.",
    },
  ],
  7: [
    // Client Submission (1 page)
    {
      title: "Client Submission",
      icon: "📤",
      items: ["Final review with client", "Documentation for client", "Support plan for client"],
      description: "Submit the project to the client with all necessary documentation and support.",
    },
  ],
  8: [
    // Component Connectivity Checking (1 page)
    {
      title: "Pre-Execution Component Connectivity Check",
      icon: "🔗",
      items: [
        "Before executing larger tasks, create a connectivity prompt for the AI to analyze",
        "Ask AI to map component dependencies and data flow",
        "Verify that changes won't break existing workflows or features",
        "Get AI validation of state management and prop drilling implications",
        "Check for potential naming conflicts or duplicate functionality",
        "Review database query impacts on other screens/features",
      ],
      description:
        "For larger, more complex tasks, always ask the AI to perform a connectivity check before execution. Create a specific prompt asking it to analyze how your new component/feature connects to the existing system. This prevents introducing bugs that break other workflows. The AI should identify all dependencies, data flows, and potential side effects. Once you've reviewed and approved the connectivity analysis, you can confidently switch to Agent Mode for implementation.",
    },
  ],
}

export function RequirementsModal({ isOpen, onClose, stepIndex = 0 }: RequirementsModalProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [showMcpSamples, setShowMcpSamples] = useState(false)

  const validStepIndex = stepIndex !== undefined && stepIndex >= 0 ? stepIndex : 0
  const pages = sectionContent[validStepIndex] || sectionContent[0] || []

  useEffect(() => {
    setCurrentPage(0)
  }, [stepIndex])

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const currentPageData = pages[currentPage]
  if (!currentPageData) return null

  return (
    <AnimatePresence>
      {isOpen && pages.length > 0 && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 max-h-[90vh] overflow-y-auto border border-slate-700/50"
          >
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-700/50">
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm z-10">
                <div>
                  <div className="text-3xl mb-2">{currentPageData.icon}</div>
                  <h2 className="text-2xl font-bold text-white">{currentPageData.title}</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {currentPageData.description && <p className="text-slate-300">{currentPageData.description}</p>}

                {currentPageData.items && (
                  <div className="space-y-3">
                    <div className="font-semibold text-white mb-4">Key Details</div>
                    {currentPageData.items.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* MCP Samples Toggle */}
                {currentPageData.showMcpSamples && (
                  <button
                    onClick={() => setShowMcpSamples(!showMcpSamples)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 rounded-lg text-cyan-300 font-medium transition-all"
                  >
                    {showMcpSamples ? "Hide" : "Show"} MCP Samples
                  </button>
                )}

                {showMcpSamples && currentPageData.mcpSamples && (
                  <pre className="bg-slate-950/80 border border-slate-600/50 rounded-lg p-4 overflow-x-auto text-xs text-slate-300">
                    {JSON.stringify(currentPageData.mcpSamples, null, 2)}
                  </pre>
                )}

                {/* Learning Resources */}
                {currentPageData.isResourcePage && currentPageData.resources && (
                  <div className="space-y-4">
                    <div className="font-semibold text-white mb-4">Learning Resources</div>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.values(currentPageData.resources)
                        .flat()
                        .map((resource: any, idx: number) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 rounded-lg text-cyan-300 text-center font-medium transition-all hover:scale-105"
                          >
                            {resource.label}
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="sticky bottom-0 flex items-center justify-between p-6 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pages.length }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentPage ? "bg-cyan-400 w-8" : "bg-slate-600 hover:bg-slate-500"
                      }`}
                    />
                  ))}
                </div>

                <div className="text-sm text-slate-400">
                  Page {currentPage + 1} of {pages.length}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === pages.length - 1}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default RequirementsModal
