import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function HistoryPanel({ history, isLoading, onSelect, selectedId }) {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border-default bg-surface-default shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
          <Clock className="h-4 w-4" />
          <span>Recent Work</span>
        </div>
        <LayoutGrid className="h-4 w-4 text-text-muted cursor-pointer hover:text-text-primary transition-colors" />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
          ))
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={cn(
                "group relative aspect-square w-full overflow-hidden rounded-2xl border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_30px_-10px_rgba(232,104,61,0.2)]",
                selectedId === item.id ? "border-accent-default" : "border-transparent"
              )}
            >
              <Image 
                src={item.thumbnailUrl} 
                alt={item.prompt}
                fill
                sizes="256px"
                className="object-cover transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-3">
                <div className="flex justify-start">
                  <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-white/90 border border-white/10">
                    Image Edit
                  </span>
                </div>
                <p className="text-xs text-white line-clamp-2 text-left font-medium leading-snug drop-shadow-md">{item.prompt}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
