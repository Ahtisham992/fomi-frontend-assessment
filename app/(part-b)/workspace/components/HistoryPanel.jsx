import * as React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Clock, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function HistoryPanel({ history, isLoading, onSelect, selectedId }) {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border-default bg-surface-default shrink-0">
      <div className="flex h-14 items-center gap-2 border-b border-border-default px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-default text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-semibold text-text-primary">Fomi Workspace</span>
      </div>
      
      <div className="p-3 border-b border-border-subtle">
        <div className="flex flex-col gap-1 bg-surface-active p-1 rounded-lg border border-border-subtle shadow-inner">
          <Link href="/generate" className="px-3 py-2 text-sm font-semibold rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors text-left w-full">
            Generate (Part A)
          </Link>
          <div className="px-3 py-2 text-sm font-semibold rounded-md bg-surface-default text-text-primary shadow-sm border border-border-subtle w-full">
            Workspace (Part B)
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-4 border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-2 text-[11px] font-bold text-text-muted uppercase tracking-widest">
          <Clock className="h-3.5 w-3.5" />
          <span>Recent Work</span>
        </div>
        <LayoutGrid className="h-4 w-4 text-text-muted cursor-pointer hover:text-text-primary transition-colors" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={cn(
                "group relative aspect-square w-full overflow-hidden rounded-xl bg-surface-active transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default shadow-sm hover:shadow-md",
                selectedId === item.id ? "ring-2 ring-accent-default ring-offset-2 ring-offset-surface-default scale-[0.98]" : "border border-border-subtle hover:border-border-default hover:-translate-y-0.5"
              )}
            >
              <Image 
                src={item.thumbnailUrl} 
                alt={item.prompt}
                fill
                sizes="256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                <p className="text-[11px] text-white/90 line-clamp-3 text-left font-medium leading-snug">{item.prompt}</p>
              </div>
              
              {/* Active Badge */}
              {selectedId === item.id && (
                <div className="absolute top-2 right-2 bg-accent-default text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                  Active
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
