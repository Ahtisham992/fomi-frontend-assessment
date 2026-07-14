import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-border-default bg-background text-text-primary shadow-sm overflow-hidden",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export { Card };
