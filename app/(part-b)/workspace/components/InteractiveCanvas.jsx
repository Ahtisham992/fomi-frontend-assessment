import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Wand2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function InteractiveCanvas({ currentAsset, isGenerating, onGenerateEdit, activeTool }) {
  const containerRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [box, setBox] = React.useState(null);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");

  const handlePointerDown = (e) => {
    if (!currentAsset || isGenerating || showPrompt || activeTool !== 'brush') return;
    e.target.setPointerCapture(e.pointerId);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setBox({ x, y, w: 0, h: 0 });
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    setBox(prev => ({
      ...prev,
      w: currentX - prev.x,
      h: currentY - prev.y
    }));
  };

  const handlePointerUp = (e) => {
    if (!isDrawing) return;
    e.target.releasePointerCapture(e.pointerId);
    setIsDrawing(false);
    
    // Fallback for tap/click for mobile support
    if (Math.abs(box.w) < 10 && Math.abs(box.h) < 10) {
      setBox({ x: box.x - 50, y: box.y - 50, w: 100, h: 100 });
      setShowPrompt(true);
    } else if (Math.abs(box.w) > 5 || Math.abs(box.h) > 5) {
      setShowPrompt(true);
    } else {
      setBox(null);
    }
  };

  const cancelSelection = () => {
    setShowPrompt(false);
    setBox(null);
    setPrompt("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setShowPrompt(false);
    onGenerateEdit(prompt, box);
    setPrompt("");
    setBox(null);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showPrompt) {
        cancelSelection();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPrompt]);

  if (!currentAsset) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-text-muted flex flex-col items-center gap-4">
          <Wand2 className="h-12 w-12 opacity-20" />
          <p className="font-medium">Select an image from history to start editing</p>
        </div>
      </div>
    );
  }

  const renderBox = box ? {
    left: box.w < 0 ? box.x + box.w : box.x,
    top: box.h < 0 ? box.y + box.h : box.y,
    width: Math.abs(box.w),
    height: Math.abs(box.h),
  } : null;

  return (
    <div className="relative flex-1 flex items-center justify-center bg-[#09090b] overflow-hidden p-8">
      <div 
        ref={containerRef}
        className="relative inline-flex max-w-full max-h-[85vh] rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] touch-none select-none"
        style={{ cursor: showPrompt || isGenerating ? "default" : activeTool === 'brush' ? "crosshair" : "default" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image 
          src={currentAsset.url} 
          alt={currentAsset.prompt} 
          width={1024}
          height={1024}
          className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-md pointer-events-none"
          draggable={false}
          priority
        />

        <AnimatePresence>
          {renderBox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute border-2 border-dashed border-accent-default bg-accent-default/10 backdrop-blur-[1px]"
              style={{
                left: renderBox.left,
                top: renderBox.top,
                width: renderBox.width,
                height: renderBox.height,
              }}
            >
              {showPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 flex w-[320px] items-center gap-2 rounded-xl border border-border-default bg-surface-default p-2 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                  onPointerDown={e => e.stopPropagation()}
                >
                  <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center">
                    <input
                      autoFocus
                      type="text"
                      placeholder="What do you want here?"
                      className="w-full bg-transparent text-sm font-medium text-text-primary placeholder:text-text-muted focus:outline-none px-2"
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                    />
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-lg text-text-muted hover:text-text-primary" onClick={cancelSelection}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button type="submit" variant="primary" size="icon" className="h-8 w-8 shrink-0 rounded-lg">
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {isGenerating && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-md bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-default p-6 shadow-2xl border border-border-subtle">
              <Loader2 className="h-8 w-8 animate-spin text-accent-default" />
              <p className="text-sm font-medium text-text-primary animate-pulse">Applying edits...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
