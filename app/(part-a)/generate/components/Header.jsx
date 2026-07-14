import * as React from "react";
import { Sparkles, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border-default px-6 bg-surface-default shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-default text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Fomi</span>
        </div>
        <nav className="hidden sm:flex items-center gap-1 bg-surface-active p-1 rounded-lg border border-border-subtle">
          <Link href="/generate" className="px-3 py-1.5 text-sm font-medium rounded-md bg-surface-default text-text-primary shadow-sm">
            Generate (Part A)
          </Link>
          <Link href="/workspace" className="px-3 py-1.5 text-sm font-medium rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors">
            Workspace (Part B)
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="h-9 w-9 p-0" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 overflow-hidden rounded-full bg-surface-active border border-border-subtle flex items-center justify-center">
          <User className="h-5 w-5 text-text-muted" />
        </div>
      </div>
    </header>
  );
}
