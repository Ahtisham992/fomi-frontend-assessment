import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

export function ControlPanel({ 
  prompt, setPrompt, 
  model, setModel, 
  aspectRatio, setAspectRatio, 
  onGenerate, 
  isGenerating 
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[48rem] px-4 z-50">
      <div className="flex flex-col gap-1.5 rounded-3xl bg-[#1c1a19]/70 backdrop-blur-xl border border-white/10 p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/5 transition-all">
        
        {/* Top Row: Input and Generate Button */}
        <div className="flex items-end gap-2 px-1">
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
        
        {/* Bottom Row: Controls */}
        <div className="flex items-center gap-2 px-2 pb-1">
          <div className="w-24">
            <Select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              disabled={isGenerating}
              className="!h-8 !text-xs !bg-transparent hover:!bg-white/5 !border-transparent focus-visible:!ring-accent-default/50"
              options={[
                { label: "1:1", value: "1:1" },
                { label: "16:9", value: "16:9" },
                { label: "4:3", value: "4:3" },
                { label: "9:16", value: "9:16" }
              ]}
            />
          </div>
          <div className="w-32">
            <Select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={isGenerating}
              className="!h-8 !text-xs !bg-transparent hover:!bg-white/5 !border-transparent focus-visible:!ring-accent-default/50"
              options={[
                { label: "Fomi V2", value: "fomi-v2-hq" },
                { label: "Fomi V1", value: "fomi-v1-fast" }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
