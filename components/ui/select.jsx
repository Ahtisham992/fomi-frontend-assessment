import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Select = React.forwardRef(({ className, label, options, id, value, onChange, disabled, icon, ...props }, ref) => {
  const generatedId = React.useId();
  const selectId = id || generatedId;
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options?.find((opt) => opt.value === value) || options?.[0];

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          id={selectId}
          ref={ref}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-full border border-border-default bg-surface-default px-5 py-2 text-sm text-text-primary transition-colors text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default focus-visible:border-accent-default disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-1.5 truncate">
            {icon && <span className="text-text-muted">{icon}</span>}
            <span className="truncate pr-2">{selectedOption?.label}</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-text-muted transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-[100] bottom-full mb-2 min-w-[120px] origin-bottom rounded-xl border border-border-default bg-surface-default shadow-2xl overflow-hidden p-1 left-0 right-0"
            >
              {options?.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange({ target: { value: option.value } });
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors text-left",
                    value === option.value 
                      ? "bg-accent-default text-white" 
                      : "text-text-primary hover:bg-surface-hover"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

Select.displayName = "Select";
export { Select };
