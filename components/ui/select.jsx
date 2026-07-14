import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const Select = React.forwardRef(({ className, label, options, id, ...props }, ref) => {
  const generatedId = React.useId();
  const selectId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "flex h-12 w-full appearance-none rounded-full border border-border-default bg-surface-default px-5 py-2 pr-10 text-sm text-text-primary transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default focus-visible:border-accent-default disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 text-text-muted" />
        </div>
      </div>
    </div>
  );
});

Select.displayName = "Select";
export { Select };
