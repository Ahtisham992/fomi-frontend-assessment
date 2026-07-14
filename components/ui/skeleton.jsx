import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-active", className)}
      {...props}
    />
  );
}

export { Skeleton };
