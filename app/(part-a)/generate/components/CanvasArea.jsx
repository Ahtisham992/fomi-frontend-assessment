import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CanvasArea({ status, result, error, onRetry, onTryPrompt, aspectRatio }) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background p-4 md:p-8">
      
      {/* Top Loading Bar */}
      {status === "loading" && (
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "80%" }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="absolute top-0 left-0 h-1 bg-accent-default z-50 shadow-[0_0_10px_var(--accent-default)]"
        />
      )}

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-8 text-center max-w-xl mx-auto relative z-10 pb-32 md:pb-40"
          >
            {/* Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-default/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-surface-active shadow-2xl overflow-hidden border border-border-subtle/50 mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-default/20 to-transparent" />
              <ImageIcon className="h-10 w-10 text-accent-default/80 relative z-10" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl leading-tight font-semibold text-text-primary tracking-tight font-[family-name:var(--font-outfit)]">
                Materialize your imagination.
              </h2>
              <p className="text-lg font-light text-text-secondary max-w-lg mx-auto">
                Describe your vision in the command center below to generate a high-quality AI asset.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mr-1">Try:</span>
              <button onClick={() => onTryPrompt?.("A firefly on a wet leaf")} className="px-4 py-2 rounded-full border border-border-default bg-surface-default/50 backdrop-blur-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent-default/50 hover:bg-surface-active transition-all">A firefly on a wet leaf</button>
              <button onClick={() => onTryPrompt?.("Cyberpunk city skyline at sunset")} className="px-4 py-2 rounded-full border border-border-default bg-surface-default/50 backdrop-blur-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent-default/50 hover:bg-surface-active transition-all">Cyberpunk city skyline at sunset</button>
            </div>
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="relative flex h-full w-full max-w-6xl items-center justify-center p-4 pb-40"
          >
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ aspectRatio: aspectRatio.replace(':', '/') }}
              className="relative flex flex-col items-center justify-center max-h-full w-full md:w-auto md:h-full max-w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-border-subtle shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] group bg-surface-default"
            >
              <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
              <div className="relative flex flex-col items-center justify-center pointer-events-none z-10 bg-surface-default/80 p-6 rounded-2xl backdrop-blur-md border border-border-subtle shadow-xl">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-active border-t-accent-default" />
                <p className="mt-4 text-sm font-medium text-text-primary animate-pulse">Generating masterpiece...</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-state-error/20 bg-state-error/5 p-8 text-center shadow-sm"
          >
            <AlertCircle className="h-10 w-10 text-state-error" />
            <div>
              <h3 className="font-semibold text-text-primary">Generation Failed</h3>
              <p className="mt-2 text-sm text-text-muted">{error || "Something went wrong. Please try again."}</p>
            </div>
            <Button variant="primary" onClick={onRetry} className="mt-2">
              Retry Generation
            </Button>
          </motion.div>
        )}

        {status === "success" && result && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex h-full w-full max-w-6xl items-center justify-center p-4 pb-40"
          >
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ aspectRatio: aspectRatio.replace(':', '/') }}
              className="relative max-h-full w-full md:w-auto md:h-full max-w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-border-subtle shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] group"
            >
              <Image 
                src={result.url} 
                alt={result.prompt} 
                fill
                className="object-contain md:object-cover transition-transform duration-700" 
                priority
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-medium text-lg leading-snug">{result.prompt}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-white/20 text-white backdrop-blur-md">Generated</span>
                  <span className="text-xs text-white/70">{result.model} • {aspectRatio}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
