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
    <div className="border-t border-border-default bg-surface-default p-4 sm:p-6 shrink-0 z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 w-full relative group">
            <Textarea
              placeholder="Describe what you want to see... (Press Enter to generate)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
              className="min-h-[60px] resize-none overflow-hidden bg-background focus-visible:ring-accent-default/50"
            />
          </div>
          <div className="flex w-full sm:w-auto shrink-0 gap-3">
            <div className="w-full sm:w-36">
              <Select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={isGenerating}
                options={[
                  { label: "Fomi V2 (HQ)", value: "fomi-v2-hq" },
                  { label: "Fomi V1 (Fast)", value: "fomi-v1-fast" }
                ]}
              />
            </div>
            <div className="w-full sm:w-24">
              <Select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                disabled={isGenerating}
                options={[
                  { label: "1:1", value: "1:1" },
                  { label: "16:9", value: "16:9" },
                  { label: "4:3", value: "4:3" },
                  { label: "9:16", value: "9:16" }
                ]}
              />
            </div>
            <Button 
              onClick={onGenerate} 
              disabled={!prompt.trim() || isGenerating}
              isLoading={isGenerating}
              className="w-full sm:w-auto sm:px-8 h-12 font-semibold shadow-md shrink-0"
            >
              {!isGenerating && <Sparkles className="mr-2 h-5 w-5" />}
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
