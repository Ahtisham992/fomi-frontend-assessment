"use client";

import * as React from "react";
import { User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border-default px-6 bg-surface-default shrink-0 z-[100] relative">
      <div className="flex items-center gap-6 relative z-50">
        <div className="flex items-center gap-3 text-text-primary">
          <div className="flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="var(--accent-default)" fillOpacity="0.15" />
              <path d="M12 10C12 8.89543 12.8954 8 14 8H28C29.1046 8 30 8.89543 30 10V14C30 15.1046 29.1046 16 28 16H18V20H26C27.1046 20 28 20.8954 28 22V26C28 27.1046 27.1046 28 26 28H18V32C18 33.1046 17.1046 34 16 34H14C12.8954 34 12 33.1046 12 32V10Z" fill="url(#paint0_linear)"/>
              <path d="M18 16V20H26V16H18Z" fill="white" fillOpacity="0.25"/>
              <path d="M12 10V32H14V10H12Z" fill="black" fillOpacity="0.15"/>
              <defs>
                <linearGradient id="paint0_linear" x1="12" y1="8" x2="30" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--accent-default)" />
                  <stop offset="1" stopColor="var(--accent-hover)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-2xl font-semibold tracking-tight font-[family-name:var(--font-outfit)]">Fomi</span>
        </div>
      </div>

      {/* Centered Pill Navigation */}
      <nav className="hidden sm:flex items-center bg-surface-active p-1 rounded-full border border-border-subtle absolute left-1/2 -translate-x-1/2 z-[60] shadow-sm pointer-events-auto">
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

      <div className="flex items-center gap-2 relative z-50">
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
