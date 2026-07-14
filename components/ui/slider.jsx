import * as React from "react";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, label, value, min = 0, max = 100, step = 1, onChange, ...props }, ref) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <div className="flex justify-between items-center text-sm font-medium text-text-primary">
          <label>{label}</label>
          <span className="text-text-muted">{value}</span>
        </div>
      )}
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full h-2 bg-surface-active rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default accent-accent-default",
          className
        )}
        {...props}
      />
    </div>
  );
});

Slider.displayName = "Slider";
export { Slider };
