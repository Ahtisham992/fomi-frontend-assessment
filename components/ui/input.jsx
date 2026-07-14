import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Input = React.forwardRef(({ className, label, error, helperText, id, ...props }, ref) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border bg-surface-default px-3 py-2 text-sm text-text-primary transition-colors",
          "placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          error 
            ? "border-state-error focus-visible:ring-state-error/50" 
            : "border-border-default focus-visible:ring-accent-default focus-visible:border-accent-default",
          className
        )}
        {...props}
      />
      <AnimatePresence>
        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={cn("text-xs", error ? "text-state-error" : "text-text-muted")}
          >
            {error || helperText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = "Input";
export { Input };
