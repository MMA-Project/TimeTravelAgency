import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          // Variants
          variant === "default" &&
            "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === "outline" &&
            "border border-border bg-transparent hover:bg-secondary text-foreground",
          variant === "ghost" &&
            "bg-transparent hover:bg-secondary text-foreground",
          // Sizes
          size === "default" && "h-11 px-6 py-2 rounded-full text-sm",
          size === "sm" && "h-9 px-4 rounded-full text-sm",
          size === "lg" && "h-14 px-8 rounded-full text-base",
          size === "icon" && "h-11 w-11 rounded-full",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
