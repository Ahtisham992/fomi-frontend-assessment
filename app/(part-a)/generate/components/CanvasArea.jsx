import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CanvasArea({ status, result, error, onRetry, onTryPrompt }) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background p-4 md:p-8">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6 text-center max-w-lg mx-auto"
          >
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-surface-active shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-default/20 to-transparent" />
              <ImageIcon className="h-10 w-10 text-text-muted relative z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary tracking-tight">What will you create today?</h2>
              <p className="mt-2 text-sm text-text-muted">Enter a prompt below to generate a high-quality AI asset.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider mr-2">Try:</span>
              <button onClick={() => onTryPrompt?.("A firefly on a wet leaf")} className="px-3 py-1.5 rounded-full border border-border-default bg-surface-default text-xs text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors">A firefly on a wet leaf</button>
              <button onClick={() => onTryPrompt?.("Cyberpunk city skyline at sunset")} className="px-3 py-1.5 rounded-full border border-border-default bg-surface-default text-xs text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors">Cyberpunk city skyline at sunset</button>
            </div>
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex w-full max-w-3xl flex-col items-center justify-center aspect-square md:aspect-video rounded-xl border border-border-subtle bg-surface-default shadow-md overflow-hidden relative"
          >
            <Skeleton className="h-full w-full absolute inset-0 rounded-none" />
            <div className="relative flex flex-col items-center justify-center pointer-events-none z-10 bg-surface-default/50 p-6 rounded-2xl backdrop-blur-sm border border-border-subtle">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-active border-t-accent-default" />
              <p className="mt-4 text-sm font-medium text-text-primary animate-pulse">Generating masterpiece...</p>
            </div>
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
            className="relative flex h-full w-full items-center justify-center"
          >
            <div className="relative overflow-hidden rounded-xl border border-border-default shadow-xl w-full h-full min-h-[500px]">
              <Image
                src={result.url}
                alt={result.prompt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p className="text-sm font-medium text-white line-clamp-2 shadow-sm">{result.prompt}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-md bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-md">{result.model}</span>
                  <span className="rounded-md bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-md">{result.aspectRatio}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
