import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({ isOpen, onClose, title, description, children, className }) {
  // Simple focus trap and escape listener
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className={cn(
                "relative flex w-full max-w-lg flex-col gap-4 rounded-xl border border-border-default bg-surface-default p-6 shadow-xl pointer-events-auto",
                className
              )}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between">
                  {title && (
                    <h2 id="modal-title" className="text-lg font-semibold text-text-primary leading-none tracking-tight">
                      {title}
                    </h2>
                  )}
                  <button
                    onClick={onClose}
                    className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {description && <p className="text-sm text-text-muted">{description}</p>}
              </div>
              <div className="flex-1">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
