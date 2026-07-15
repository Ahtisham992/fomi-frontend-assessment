import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function PromptLogArea({ sessionLogs, isGenerating, currentPrompt, aspectRatio, imageCount, error, onRetry, onTryPrompt }) {
  const containerRef = React.useRef(null);

  // Auto-scroll to bottom when new items are added or generating
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [sessionLogs.length, isGenerating]);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-background p-4 md:p-8 custom-scrollbar pb-64"
    >
      {/* Background Depth: subtle radial gradient */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-active/40 via-background to-background" />

      {sessionLogs.length === 0 && !isGenerating && (
        <motion.div
          key="idle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col items-center justify-center gap-8 text-center max-w-xl mx-auto relative z-10"
        >
          {/* Ambient Radial Glow / Pulse Animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-default/15 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-surface-active shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden border border-border-subtle/50 mb-4 animate-[pulse_4s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-default/20 to-transparent" />
            <ImageIcon className="h-10 w-10 text-accent-default/80 relative z-10" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl leading-tight font-semibold text-text-primary tracking-tight font-[family-name:var(--font-outfit)]">
              Materialize your imagination.
            </h2>
            <p className="text-lg font-light text-text-muted max-w-lg mx-auto opacity-80">
              Describe your vision in the command center below to generate a high-quality AI asset.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mr-1">Try:</span>
            <button onClick={() => onTryPrompt?.("A firefly on a wet leaf")} className="px-4 py-2 rounded-full border border-border-default bg-surface-default/80 backdrop-blur-sm shadow-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent-default/50 hover:bg-surface-active transition-all">A firefly on a wet leaf</button>
            <button onClick={() => onTryPrompt?.("Cyberpunk city skyline at sunset")} className="px-4 py-2 rounded-full border border-border-default bg-surface-default/80 backdrop-blur-sm shadow-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent-default/50 hover:bg-surface-active transition-all">Cyberpunk city skyline at sunset</button>
          </div>
        </motion.div>
      )}

      <div className="w-full max-w-5xl mx-auto space-y-12">
        {sessionLogs.map((log) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Prompt Bubble */}
            <div className="self-end max-w-[85%] sm:max-w-[70%]">
              <div className="bg-surface-active/60 border border-border-subtle backdrop-blur-sm shadow-md rounded-2xl rounded-tr-sm px-5 py-3 text-sm font-medium text-text-primary leading-relaxed">
                "{log.prompt}"
              </div>
              <div className="flex items-center justify-end gap-2 mt-1.5 opacity-60">
                <span className="text-[10px] font-bold tracking-wider uppercase">{log.model}</span>
                <span className="text-[10px]">&bull;</span>
                <span className="text-[10px] font-bold tracking-wider uppercase">{log.aspectRatio}</span>
                {log.style && log.style !== "None" && (
                  <>
                    <span className="text-[10px]">&bull;</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase">{log.style}</span>
                  </>
                )}
              </div>
            </div>

            {/* Image Grid */}
            <div className={`grid gap-4 ${log.urls.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : log.urls.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
              {log.urls.map((url, i) => (
                <div 
                  key={i} 
                  style={{ aspectRatio: log.aspectRatio.replace(':', '/') }}
                  className="relative w-full overflow-hidden rounded-xl border border-border-subtle shadow-lg group bg-surface-default"
                >
                  <Image 
                    src={url} 
                    alt={`${log.prompt} - ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Prompt Bubble (Pending) */}
            <div className="self-end max-w-[85%] sm:max-w-[70%] opacity-70">
              <div className="bg-surface-active/60 border border-border-subtle backdrop-blur-sm shadow-md rounded-2xl rounded-tr-sm px-5 py-3 text-sm font-medium text-text-primary leading-relaxed flex items-center gap-3">
                <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-text-muted border-t-accent-default" />
                "{currentPrompt}"
              </div>
            </div>

            {/* Skeleton Grid */}
            <div className={`grid gap-4 ${Number(imageCount) === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : Number(imageCount) === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
              {Array.from({ length: Number(imageCount) || 1 }).map((_, i) => (
                <div 
                  key={i} 
                  style={{ aspectRatio: aspectRatio.replace(':', '/') }}
                  className="relative w-full overflow-hidden rounded-xl border border-border-subtle shadow-lg bg-surface-default"
                >
                  <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex w-full max-w-md mx-auto flex-col items-center gap-4 rounded-xl border border-state-error/20 bg-state-error/5 p-8 text-center shadow-md mt-4"
          >
            <AlertCircle className="h-10 w-10 text-state-error" />
            <div>
              <h3 className="font-semibold text-text-primary">Generation Failed</h3>
              <p className="mt-2 text-sm text-text-muted">{error || "Something went wrong. Please try again."}</p>
            </div>
            <Button variant="primary" onClick={onRetry} className="mt-2 shadow-sm">
              Retry Generation
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
