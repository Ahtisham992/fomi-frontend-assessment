import * as React from "react";
import { Settings2, Paintbrush, SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { MousePointer2, Eraser } from "lucide-react";

export function PropertiesPanel({ activeTool, brushStrength, setBrushStrength }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [styleMode, setStyleMode] = React.useState('seamless');

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
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Brush Strength</label>
              <span className="text-xs font-semibold text-text-primary bg-surface-active px-2 py-0.5 rounded border border-border-subtle tabular-nums">{brushStrength}%</span>
            </div>
            <div className="relative flex items-center h-4">
              <input 
                type="range" 
                min="0" max="100" 
                value={brushStrength}
                onChange={(e) => setBrushStrength(Number(e.target.value))}
                className="absolute inset-0 w-full h-1.5 bg-border-default rounded-full appearance-none outline-none focus-visible:ring-2 focus-visible:ring-accent-default/50 z-10 cursor-pointer" 
                style={{
                  background: `linear-gradient(to right, hsl(15, 80%, 57%) ${brushStrength}%, transparent ${brushStrength}%)`
                }}
              />
              <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: hsl(15, 80%, 57%);
                  box-shadow: 0 0 0 2px var(--color-surface-default), 0 2px 4px rgba(0,0,0,0.5);
                  cursor: pointer;
                  transition: transform 0.1s;
                }
                input[type='range']::-webkit-slider-thumb:hover {
                  transform: scale(1.15);
                }
              `}</style>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Edit Style</label>
            <div className="flex p-1 bg-surface-active border border-border-subtle rounded-lg relative">
              <div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-surface-default border border-border-default rounded-md shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ left: styleMode === 'seamless' ? '4px' : 'calc(50%)' }}
              />
              <button 
                onClick={() => setStyleMode('seamless')}
                className={`relative z-10 flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${styleMode === 'seamless' ? 'text-accent-default' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Seamless
              </button>
              <button 
                onClick={() => setStyleMode('surreal')}
                className={`relative z-10 flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${styleMode === 'surreal' ? 'text-accent-default' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Surreal
              </button>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-border-subtle">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Model</label>
            <select className="w-full bg-surface-active border border-border-subtle rounded-lg px-3 py-2 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-default/50 hover:bg-surface-hover transition-colors appearance-none cursor-pointer">
              <option>Fomi V2 (High Quality)</option>
              <option>Fomi V1 (Fast)</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
