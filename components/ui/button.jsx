import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const buttonVariants = {
  primary: "bg-accent-default text-white hover:bg-accent-hover active:bg-accent-muted shadow-sm disabled:bg-surface-active disabled:text-text-muted disabled:shadow-none",
  secondary: "bg-surface-active text-text-primary hover:bg-border-default active:bg-border-strong border border-border-subtle",
  ghost: "bg-transparent text-text-primary hover:bg-surface-hover active:bg-surface-active",
  icon: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover active:bg-surface-active p-2",
};

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  isLoading = false, 
  disabled, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-default disabled:pointer-events-none disabled:opacity-50";
  const variantStyles = buttonVariants[variant] || buttonVariants.primary;
  const sizeStyles = variant === 'icon' ? 'aspect-square' : 'h-10 px-4 py-2';

  return (
    <motion.button
      ref={ref}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      className={cn(baseStyles, variantStyles, sizeStyles, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";
export { Button };
