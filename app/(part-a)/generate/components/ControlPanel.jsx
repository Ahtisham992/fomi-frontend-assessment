import * as React from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Sparkles, Image as ImageIcon, Wand2, SlidersHorizontal, ChevronUp, ChevronDown, Crop, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const STYLES = ["Photorealistic", "Illustration", "Cinematic", "Anime", "3D Render", "Pixel Art"];

export function ControlPanel({ 
  prompt, setPrompt, 
  model, setModel, 
  aspectRatio, setAspectRatio,
  imageCount, setImageCount,
  style, setStyle,
  onGenerate, 
  isGenerating 
}) {
  const [activeSection, setActiveSection] = React.useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  const toggleSection = (section) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  return (
    <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[48rem] px-4 z-50">
      <div className="flex flex-col gap-0 rounded-3xl bg-surface-default/90 backdrop-blur-xl border border-border-default p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] ring-1 ring-border-subtle/50 transition-all">
        
        {/* Top Row: Input and Generate Button */}
        <div className="flex items-end gap-2 px-1 pb-1">
          <textarea
            placeholder="Describe your imagination..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            className="flex-1 bg-transparent resize-none text-text-primary placeholder:text-text-muted focus:outline-none min-h-[44px] max-h-[120px] py-3 px-3 text-sm md:text-base font-medium [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            rows={1}
            style={{ height: "44px" }}
          />
          <Button 
            onClick={onGenerate} 
            disabled={!prompt.trim() || isGenerating}
            isLoading={isGenerating}
            className="h-11 w-11 sm:w-auto sm:px-6 rounded-full shrink-0 shadow-md mb-0.5"
          >
            {!isGenerating && <Sparkles className="h-5 w-5 sm:mr-2" />}
            <span className="hidden sm:inline">Generate</span>
          </Button>
        </div>
        
        {/* Collapsible Sections */}
        <AnimatePresence>
          {activeSection === "styles" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-3 py-3 border-t border-border-subtle">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setStyle("")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                      !style ? "bg-accent-default/10 text-accent-default border-accent-default/30" : "bg-surface-active text-text-secondary border-border-subtle hover:text-text-primary hover:bg-surface-hover"
                    )}
                  >
                    None
                  </button>
                  {STYLES.map(s => (
                    <button 
                      key={s}
                      onClick={() => setStyle(s)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                        style === s ? "bg-accent-default/10 text-accent-default border-accent-default/30" : "bg-surface-active text-text-secondary border-border-subtle hover:text-text-primary hover:bg-surface-hover"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "advance" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-3 py-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Negative Prompt</label>
                  <textarea 
                    className="w-full bg-surface-active border border-border-subtle rounded-xl p-2 text-xs text-text-primary resize-none focus:outline-none focus:ring-1 focus:ring-accent-default"
                    placeholder="Things to exclude..."
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Seed</label>
                  <input 
                    type="text" 
                    className="w-full bg-surface-active border border-border-subtle rounded-xl p-2 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-default"
                    placeholder="Random"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Row: Controls */}
        <div className="flex flex-wrap items-center justify-between px-2 pt-2 border-t border-border-subtle gap-y-2 pb-1">
          <div className="flex items-center gap-1 shrink-0">
            <button 
              onClick={() => toggleSection("styles")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                activeSection === "styles" ? "bg-surface-active text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              )}
            >
              <Wand2 className="h-3.5 w-3.5" />
              Styles
              {activeSection === "styles" ? <ChevronUp className="h-3 w-3 opacity-50" /> : <ChevronDown className="h-3 w-3 opacity-50" />}
            </button>
            <button 
              onClick={() => toggleSection("advance")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                activeSection === "advance" ? "bg-surface-active text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Advance
              {activeSection === "advance" ? <ChevronUp className="h-3 w-3 opacity-50" /> : <ChevronDown className="h-3 w-3 opacity-50" />}
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0 pr-1">
            <div className="w-[95px]">
              <Select
                value={imageCount}
                onChange={(e) => setImageCount(e.target.value)}
                disabled={isGenerating}
                icon={<ImageIcon className="h-3.5 w-3.5" />}
                className="!h-8 !text-xs !bg-transparent hover:!bg-surface-active !border-transparent focus-visible:!ring-accent-default/50"
                options={[
                  { label: "1 Image", value: "1" },
                  { label: "2 Images", value: "2" },
                  { label: "3 Images", value: "3" },
                  { label: "4 Images", value: "4" }
                ]}
              />
            </div>
            <div className="w-[72px]">
              <Select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                disabled={isGenerating}
                icon={<Crop className="h-3.5 w-3.5" />}
                className="!h-8 !text-xs !bg-transparent hover:!bg-surface-active !border-transparent focus-visible:!ring-accent-default/50"
                options={[
                  { label: "1:1", value: "1:1" },
                  { label: "16:9", value: "16:9" },
                  { label: "4:3", value: "4:3" },
                  { label: "9:16", value: "9:16" }
                ]}
              />
            </div>
            <div className="w-[105px]">
              <Select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={isGenerating}
                icon={<Cpu className="h-3.5 w-3.5" />}
                className="!h-8 !text-xs !bg-transparent hover:!bg-surface-active !border-transparent focus-visible:!ring-accent-default/50"
                options={[
                  { label: "Fomi V2", value: "fomi-v2-hq" },
                  { label: "Fomi V1", value: "fomi-v1-fast" }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
