import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

export function HistoryStrip({ history, isLoading }) {
  if (isLoading) {
    return (
      <div className="w-full border-b border-border-default bg-surface-default/50 px-4 sm:px-6 py-4 flex flex-col gap-3 relative z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
            <Clock className="h-4 w-4" />
            <span>History</span>
          </div>
          <button className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors">
            View All
          </button>
        </div>
        <div className="flex items-center gap-3 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!history || history.length === 0) return null;

  return (
    <div className="w-full border-b border-border-default bg-surface-default/50 px-4 sm:px-6 py-4 flex flex-col gap-3 relative z-40 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
          <Clock className="h-4 w-4" />
          <span>History</span>
        </div>
        <button className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default rounded px-1">
          View All
        </button>
      </div>
      
      {/* Scrollable strip */}
      <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 -mx-2 px-2">
        {history.map((item) => (
          <button
            key={item.id}
            className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border-default bg-surface-active transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default"
            title={item.prompt}
          >
            <Image
              src={item.thumbnailUrl}
              alt={item.prompt}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
