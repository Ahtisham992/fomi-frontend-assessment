"use client";

import * as React from "react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function FloatingInfo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const getInfoContent = () => {
    if (pathname === "/workspace") {
      return {
        title: "Workspace Mode",
        desc: "Use the Brush-to-Prompt tool to draw a box over an area, then describe what you want to generate inside that box. The canvas state tracks your history."
      };
    }
    return {
      title: "Generate Mode",
      desc: "Describe what you want to see to generate a new asset. Use the aspect ratio and model toggles to fine-tune your results."
    };
  };

  const content = getInfoContent();

  return (
    <div className="fixed top-24 right-4 sm:top-auto sm:bottom-6 sm:right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 right-0 mb-2 w-72 rounded-xl border border-border-default bg-surface-default p-4 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4 className="text-sm font-semibold text-text-primary">{content.title}</h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-default rounded-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {content.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-active border border-border-subtle shadow-lg hover:ring-2 hover:ring-accent-default hover:text-accent-default text-text-secondary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default"
        aria-label="Information"
      >
        <Info className="h-5 w-5" />
      </button>
    </div>
  );
}
