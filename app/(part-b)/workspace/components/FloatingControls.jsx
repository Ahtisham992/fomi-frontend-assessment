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
      className="fixed bottom-8 left-1/2 lg:left-[calc(50%+128px)] -translate-x-1/2 flex items-center gap-2 rounded-full border border-border-default/50 bg-surface-default/60 p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] backdrop-blur-2xl z-40"
    >
      <div className="flex items-center gap-1 relative">
        {tools.map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default z-10",
                isActive ? "text-text-inverse" : "text-text-secondary hover:text-text-primary"
              )}
              title={tool.label}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeToolBubble"
                  className="absolute inset-0 bg-text-primary rounded-full shadow-md -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {/* Hover background for inactive state */}
              {!isActive && (
                <div className="absolute inset-0 bg-surface-hover rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              )}
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      <div className="h-6 w-px bg-border-strong mx-1" />
      <div className="flex items-center gap-1">
        <button onClick={onUndo} title="Undo" className="group relative flex h-10 w-10 items-center justify-center rounded-full text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default">
          <div className="absolute inset-0 bg-surface-hover rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          <Undo2 className="h-4 w-4" />
        </button>
        <button className="group relative flex h-10 w-10 items-center justify-center rounded-full text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default">
          <div className="absolute inset-0 bg-surface-hover rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          <ArrowLeftRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
