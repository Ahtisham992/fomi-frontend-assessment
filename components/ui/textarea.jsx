import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Textarea = React.forwardRef(({ className, label, error, helperText, id, ...props }, ref) => {
  const generatedId = React.useId();
  const textareaId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border bg-surface-default px-3 py-2 text-sm text-text-primary transition-colors",
          "placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
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

Textarea.displayName = "Textarea";
export { Textarea };
