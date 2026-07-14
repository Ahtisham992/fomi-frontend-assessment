"use client";

import * as React from "react";
import { Sparkles, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border-default px-6 bg-surface-default shrink-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-default text-white shadow-[0_0_15px_var(--accent-default)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-2xl font-semibold tracking-tight font-[family-name:var(--font-outfit)]">Fomi</span>
        </div>
      </div>

      {/* Centered Pill Navigation */}
      <nav className="hidden sm:flex items-center bg-surface-active p-1 rounded-full border border-border-subtle relative absolute left-1/2 -translate-x-1/2">
        <Link href="/generate" className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors w-[110px] text-center ${pathname === "/generate" || pathname === "/" ? "text-white" : "text-text-secondary hover:text-text-primary"}`}>
          {pathname === "/generate" || pathname === "/" ? (
            <motion.div layoutId="nav-pill" className="absolute inset-0 bg-accent-default rounded-full shadow-[0_4px_12px_rgba(232,104,61,0.3)]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          ) : null}
          <span className="relative z-20">Generate</span>
        </Link>
        <Link href="/workspace" className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors w-[110px] text-center ${pathname === "/workspace" ? "text-white" : "text-text-secondary hover:text-text-primary"}`}>
          {pathname === "/workspace" ? (
            <motion.div layoutId="nav-pill" className="absolute inset-0 bg-accent-default rounded-full shadow-[0_4px_12px_rgba(232,104,61,0.3)]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          ) : null}
          <span className="relative z-20">Workspace</span>
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 p-0 rounded-full hover:bg-surface-active" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        <button className="h-9 w-9 overflow-hidden rounded-full bg-surface-active border border-border-subtle flex items-center justify-center hover:ring-2 hover:ring-accent-default transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default ml-1">
          <User className="h-5 w-5 text-text-muted" />
        </button>
      </div>
    </header>
  );
}
