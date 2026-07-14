"use client";

import * as React from "react";
import { Sparkles, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border-default px-6 bg-surface-default shrink-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-default text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Fomi</span>
        </div>
        <nav className="hidden sm:flex items-center bg-surface-active p-1 rounded-lg border border-border-subtle relative">
          {/* Animated active background indicator */}
          <div 
            className="absolute top-1 bottom-1 w-[100px] rounded-md bg-surface-default shadow-sm transition-transform duration-300 ease-out"
            style={{ transform: pathname === "/workspace" ? "translateX(100px)" : "translateX(0)" }}
          />
          <Link href="/generate" className="relative z-10 px-4 py-1.5 text-sm font-medium rounded-md text-text-primary transition-colors w-[100px] text-center">
            Generate
          </Link>
          <Link href="/workspace" className="relative z-10 px-4 py-1.5 text-sm font-medium rounded-md text-text-primary transition-colors w-[100px] text-center">
            Workspace
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="h-9 w-9 p-0" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        <button className="h-8 w-8 overflow-hidden rounded-full bg-surface-active border border-border-subtle flex items-center justify-center hover:ring-2 hover:ring-accent-default transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default">
          <User className="h-5 w-5 text-text-muted" />
        </button>
      </div>
    </header>
  );
}
