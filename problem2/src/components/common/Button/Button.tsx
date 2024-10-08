import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/libs/clsx";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-text-primary hover:bg-primary/70",
        secondary: "bg-background text-text-secondary hover:bg-background/70",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        icon: "h-fit w-fit p-2",
        sm: "h-9 px-3 rounded-md",
        lg: "h-12 px-4 rounded-md text-xl",
        xl: "h-14 px-8 rounded-md text-xl font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
  isLoading?: boolean;
  loaderClassname?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      loaderClassname,
      ...props
    },
    ref
  ) => {
    const width = {
      "w-full": fullWidth,
    };

    const children = isLoading ? (
      <>
        <Loader2 className={cn("h-7 w-7 animate-spin mr-2", loaderClassname)} />
        {props.children}
      </>
    ) : (
      props.children
    );

    props.disabled = isLoading || props.disabled;
    props.children = children;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), width)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
