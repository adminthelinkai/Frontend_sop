"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Zap, Database, Palette, Bug, Rocket, CheckCircle2, ArrowRight, Wrench } from "lucide-react"
import { RequirementsModal } from "./requirements-modal"

export default function FrontendSOPDiagram() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [showRequirementsModal, setShowRequirementsModal] = useState(false)

  const stepIcons = [
    <Zap key="0" className="w-5 h-5" />,
    <Wrench key="1" className="w-5 h-5" />, // added Wrench icon for Tools Setup
    <Database key="2" className="w-5 h-5" />,
    <Palette key="3" className="w-5 h-5" />,
    <CheckCircle2 key="4" className="w-5 h-5" />,
    <Bug key="5" className="w-5 h-5" />,
    <Rocket key="6" className="w-5 h-5" />,
    <ArrowRight key="7" className="w-5 h-5" />,
  ]

  // Step data
  const steps = [
    {
      title: "Requirement Understanding",
      short: "Gather PRD, client site, and clarify with PM",
      detail:
        "From the client we collect the full Product Requirement Document (PRD) and any existing materials. Review the client's current website to align design, color palette, and UX patterns. Work with the Project Manager to achieve 90–95% clarity on scope, deliverables, and acceptance criteria before writing any code.",
      checklist: [
        "Gather the full PRD and existing client documentation",
        "Review client's current website for theme and UX patterns",
        "Confirm scope with PM until 90-95% clarity achieved",
        "Use Notebook LLM to simplify unclear requirements",
        "Produce 1-page summary with goals and must-have features",
        "Get formal sign-off from PM and client",
      ],
    },
    {
      title: "Tools Setup",
      short: "Configure development environment & tools",
      detail:
        "Set up your development environment with the right tools for efficient frontend development. Configure Cursor IDE (or VSCode) with essential extensions, set up Supabase integration, and prepare MCP (Model Context Protocol) configurations for AI-assisted development. Ensure all tools are properly connected and ready for productive coding.",
      checklist: [
        "Install and configure Cursor IDE or VSCode",
        "Add essential extensions (Tailwind, Prettier, ESLint, Supabase)",
        "Set up Supabase MCP configuration in your development environment",
        "Configure environment variables for Cursor/VSCode",
        "Test Supabase connection with sample queries",
        "Review and bookmark training resources for quick reference",
        "Set up preferred AI helper tools for development acceleration",
      ],
    },
    {
      title: "Project Setup",
      short: "Initialize repo, toolchain and envs",
      detail:
        "Set up a clean GitHub/GitLab repository, initialize React or Vite with TypeScript, configure a scalable folder structure, install essential UI and utility libraries, apply ESLint, Prettier and Husky for clean commits, prepare .env files for development, staging, and production.",
      checklist: [
        "Create clean GitHub/GitLab repository with branch rules",
        "Initialize React or Vite with TypeScript enabled",
        "Create scalable folder structure",
        "Install Tailwind, Axios, Zustand/Redux, shadcn/ui",
        "Configure ESLint, Prettier, Husky, and lint-staged",
        "Prepare .env files for dev, staging, and production",
        "Set up CI to run build, lint, test on every PR",
      ],
    },
    {
      title: "UI Design & Component Planning",
      short: "Design screens + component breakdown",
      detail:
        "This stage focuses on understanding the UI/UX clearly and preparing a clean, reusable frontend structure. Create basic wireframes and convert them into high-fidelity screens. Define a reusable component list and prepare design tokens.",
      checklist: [
        "Create wireframes for all core screens",
        "Convert approved wireframes into high-fidelity screens",
        "Define reusable component list (atoms, molecules, organisms)",
        "Document props, states, spacing, and responsive rules",
        "Prepare design tokens: typography, spacing, shadows, radius",
        "Export icons and assets properly compressed",
        "Ensure accessibility basics and get stakeholder approval",
      ],
    },
    {
      title: "API Integration",
      short: "API setup + frontend integration",
      detail:
        "Connect the frontend to Supabase for database, authentication, and AI features. Set up the Supabase client, configure environment variables, build clean CRUD services, implement authentication flows, and ensure all API calls include proper loading, empty, and error handling.",
      checklist: [
        "Create Supabase client and configure .env correctly",
        "Write CRUD API service functions in clean structure",
        "Implement Authentication (login/logout/session)",
        "Test every API method manually in localhost",
        "Add loading, empty, and error states for all screens",
        "Use AI helper functions for advanced queries if needed",
        "Ensure zero console errors before continuing",
      ],
    },
    {
      title: "Testing & Bug Fixing",
      short: "Manual testing before push",
      detail:
        "Quick testing on localhost to ensure everything works perfectly. Test UI layout, spacing, responsiveness, all buttons, forms, navigation flows, and API calls. Fix all console warnings and errors.",
      checklist: [
        "Test UI spacing, layout, and responsiveness",
        "Test all forms, buttons, and navigation flows",
        "Verify API success and error handling manually",
        "Fix all console warnings and errors",
        "Test empty, loading, and failed API screens",
        "Push only to feature branch after clean testing",
      ],
    },
    {
      title: "Deployment",
      short: "CI/CD deploy flow",
      detail:
        "Move the project from localhost → testing → production using CI/CD. Ensure the CI/CD pipeline is stable and safe with rollback options available.",
      checklist: [
        "Ensure localhost build is fully clean",
        "Push to feature/sub-branch for testing deployment",
        "Validate CI/CD logs and fix any build issues",
        "After testing approval, merge to main",
        "Verify production deployment carefully",
        "Keep rollback plan ready for emergencies",
      ],
    },
    {
      title: "Client Submission",
      short: "Frontend delivery & explanation",
      detail:
        "Deliver the final frontend build and explain UI/UX clearly. Ensure client understands all screens and that the UI matches their taste exactly.",
      checklist: [
        "Prepare and deliver the final frontend build",
        "Explain UI/UX decisions during client call",
        "Demonstrate each module clearly",
        "Ensure UI matches client's exact taste",
        "Take feedback and apply fixes immediately",
        "Re-demo and get final approval",
      ],
    },
  ]

  const trainingLinks = [
    { label: "Supabase Basics 1", url: "https://youtu.be/FmUkuzcoTDU" },
    { label: "Supabase Basics 2", url: "https://youtu.be/7w7kd-4ew2I" },
    { label: "Supabase CRUD Guide", url: "https://youtu.be/yfpVU_uEpy4" },
    { label: "Notion Basics", url: "https://youtu.be/kOf3QSBV29Y" },
    { label: "N8N Basics 1", url: "https://youtu.be/4o0AJYBEiBo" },
    { label: "N8N Basics 2", url: "https://youtu.be/Ey18PDiaAYI" },
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 md:p-10">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <span className="text-sm font-semibold text-cyan-400">Frontend Development Workflow</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-cyan-200 bg-clip-text text-transparent">
            Your Complete SOP Guide
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive roadmap from requirements to delivery. Follow each step carefully to ensure project success.
          </p>
        </motion.div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Steps list */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-3">
              {steps.map((step, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                    activeIndex === index
                      ? "bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                      : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600"
                  }`}
                >
                  {/* Background shine effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      activeIndex === index ? "bg-cyan-500/10" : ""
                    }`}
                  />

                  <div className="relative flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm mt-0.5 transition-all ${
                        activeIndex === index
                          ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950"
                          : "bg-slate-700 text-slate-300 group-hover:bg-slate-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm">{step.title}</div>
                      <div className="text-xs text-slate-400 mt-1 truncate group-hover:text-slate-300 transition-colors">
                        {step.short}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Progress indicator */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="indicator"
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-500"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right content area - Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeIndex !== null ? (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 20, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-xl shadow-2xl"
                >
                  {/* Header with icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      {stepIcons[activeIndex]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{steps[activeIndex].title}</h2>
                      <p className="text-sm text-slate-400 mt-1">{steps[activeIndex].short}</p>
                    </div>
                  </div>

                  {/* Main description */}
                  <p className="text-slate-300 leading-relaxed mb-6">{steps[activeIndex].detail}</p>

                  {/* Guidance checklist */}
                  <div className="mb-6 p-5 rounded-xl bg-slate-700/20 border border-slate-600/30">
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                      Guidance & Checklist
                    </h3>
                    <ul className="space-y-2.5">
                      {steps[activeIndex].checklist?.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-300">
                          <span className="text-cyan-400 font-semibold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                    <button
                      onClick={() => {
                        setShowRequirementsModal(true)
                        // Pass the current step index to modal
                      }}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                    >
                      View Details
                    </button>
                    <button className="flex-1 py-2.5 px-4 rounded-lg bg-slate-700/40 text-slate-200 font-medium text-sm border border-slate-600/50 hover:bg-slate-700/60 transition-all duration-300">
                      Get Help
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-12 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/20 backdrop-blur-xl flex flex-col items-center justify-center min-h-96"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-700/30 flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-300">Select a step to explore</p>
                  <p className="text-sm text-slate-400 mt-2 text-center">
                    Click any step on the left to view detailed instructions and guidance
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <RequirementsModal
        isOpen={showRequirementsModal}
        onClose={() => setShowRequirementsModal(false)}
        stepIndex={activeIndex}
      />
    </div>
  )
}
