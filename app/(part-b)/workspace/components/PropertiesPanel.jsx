import * as React from "react";
import { Settings2, Paintbrush, SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { MousePointer2, Eraser } from "lucide-react";

export function PropertiesPanel({ activeTool, brushStrength, setBrushStrength }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="absolute right-4 top-4 z-40 lg:hidden">
        <Button variant="secondary" size="icon" className="bg-surface-default shadow-md rounded-full" onClick={() => setIsOpen(true)}>
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <div className={`
        fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-border-default bg-surface-default transition-transform duration-300 lg:static lg:flex lg:h-full lg:w-64 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle shrink-0">
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <Settings2 className="h-4 w-4" />
            <span>Properties</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 custom-scrollbar">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Active Tool</label>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-active border border-border-subtle">
                {activeTool === 'select' && <MousePointer2 className="h-3.5 w-3.5 text-accent-default" />}
                {activeTool === 'brush' && <Paintbrush className="h-3.5 w-3.5 text-accent-default" />}
                {activeTool === 'eraser' && <Eraser className="h-3.5 w-3.5 text-accent-default" />}
                <span className="text-xs font-medium text-text-primary capitalize">
                  {activeTool === 'brush' ? 'Brush Edit' : activeTool}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Brush Strength</label>
              <span className="text-xs text-text-muted">{brushStrength}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={brushStrength}
              onChange={(e) => setBrushStrength(Number(e.target.value))}
              className="w-full accent-accent-default" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Edit Style</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 text-xs font-medium rounded-md border border-accent-default bg-accent-default/10 text-accent-default text-center">Seamless</button>
              <button className="px-3 py-2 text-xs font-medium rounded-md border border-border-default bg-surface-active text-text-secondary text-center hover:text-text-primary hover:border-border-subtle transition-colors">Surreal</button>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-border-subtle">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Model</label>
            <select className="w-full bg-surface-active border border-border-subtle rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-default">
              <option>Fomi V2 (High Quality)</option>
              <option>Fomi V1 (Fast)</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
