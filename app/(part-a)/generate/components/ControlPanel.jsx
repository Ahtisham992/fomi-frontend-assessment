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
    <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[56rem] px-4 z-50">
      <div className="flex flex-col gap-2 rounded-[2rem] bg-[#1c1a19]/40 backdrop-blur-3xl border border-white/10 p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/5 transition-all">
        <textarea
          placeholder="Describe your imagination to be converted to piece of art..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isGenerating}
          className="w-full bg-transparent resize-none text-text-primary placeholder:text-text-muted focus:outline-none min-h-[40px] px-3 pt-2 text-sm font-medium"
          rows={1}
        />
        
        <div className="h-px w-full bg-border-subtle/40 mx-2 w-[calc(100%-16px)]" />
        
        <div className="flex flex-wrap items-center justify-between px-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-28">
              <Select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                disabled={isGenerating}
                className="!h-10 !bg-[#312e2c] !border-transparent hover:!bg-[#3b3531] focus-visible:!ring-accent-default/50"
                options={[
                  { label: "1:1", value: "1:1" },
                  { label: "16:9", value: "16:9" },
                  { label: "4:3", value: "4:3" },
                  { label: "9:16", value: "9:16" }
                ]}
              />
            </div>
            <div className="w-40">
              <Select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={isGenerating}
                className="!h-10 !bg-[#312e2c] !border-transparent hover:!bg-[#3b3531] focus-visible:!ring-accent-default/50"
                options={[
                  { label: "Fomi V2 (HQ)", value: "fomi-v2-hq" },
                  { label: "Fomi V1 (Fast)", value: "fomi-v1-fast" }
                ]}
              />
            </div>
          </div>
          <Button 
            onClick={onGenerate} 
            disabled={!prompt.trim() || isGenerating}
            isLoading={isGenerating}
            className="w-full sm:w-auto px-8 h-10 md:h-12 font-semibold shadow-lg shrink-0 rounded-full"
          >
            {!isGenerating && <Sparkles className="mr-2 h-5 w-5" />}
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
