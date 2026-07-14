import * as React from "react";
import { motion } from "framer-motion";
import { MousePointer2, Brush, Eraser, Undo2, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingControls({ activeTool, setActiveTool, onUndo }) {
  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'brush', icon: Brush, label: 'Freehand Masking' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
  ];

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-8 left-1/2 lg:left-[calc(50%+128px)] -translate-x-1/2 flex items-center gap-2 rounded-full border border-border-default bg-surface-default/80 p-1.5 shadow-2xl backdrop-blur-xl z-40"
    >
      <div className="flex items-center gap-1">
        {tools.map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default",
                isActive ? "bg-text-primary text-text-inverse shadow-sm" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              )}
              title={tool.label}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      <div className="h-6 w-px bg-border-strong mx-1" />
      <div className="flex items-center gap-1">
        <button onClick={onUndo} title="Undo" className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default">
          <Undo2 className="h-4 w-4" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default">
          <ArrowLeftRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
