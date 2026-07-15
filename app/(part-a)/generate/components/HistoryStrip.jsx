import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HistoryStrip({ history, isLoading, onPreview, isOpen, onToggle }) {
  if (isLoading) {
    return (
      <div className="relative w-full border-b border-border-default bg-surface-default shrink-0 z-40 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
            <Clock className="h-4 w-4" />
            <span>History</span>
          </div>
          <button className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors">
            View All
          </button>
        </div>
        <div className="flex items-center gap-3 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!history || history.length === 0) return null;

  return (
    <div className="w-full border-b border-border-default bg-surface-default/70 backdrop-blur-md px-4 sm:px-6 py-4 flex flex-col gap-3 relative z-40 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
          <Clock className="h-4 w-4" />
          <span>History</span>
        </div>
      </div>
      
      {/* Scrollable strip */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 -mx-2 px-2">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPreview && onPreview(item.thumbnailUrl || item.url)}
                  className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border-default bg-surface-active transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default cursor-zoom-in"
                  title={item.prompt}
                >
                  <Image
                    src={item.thumbnailUrl || item.url}
                    alt={item.prompt}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={onToggle}
        className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-surface-default border border-border-default rounded-full p-1 text-text-muted hover:text-text-primary transition-colors z-50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default"
        title={isOpen ? "Collapse History" : "Expand History"}
      >
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
    </div>
  );
}
