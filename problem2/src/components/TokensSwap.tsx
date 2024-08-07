import { Button, ButtonProps } from "@/components/common";
import { cn } from "@/libs/clsx";
import { ArrowUpDown } from "lucide-react";
import { ComponentRef, forwardRef } from "react";

type TokensSwapProps = ButtonProps & {
  swapTokens: () => void;
};

export const TokensSwap = forwardRef<
  ComponentRef<typeof Button>,
  TokensSwapProps
>((props, ref) => {
  const { swapTokens, className, ...buttonProps } = props;
  return (
    <Button
      ref={ref}
      size="icon"
      {...buttonProps}
      onClick={swapTokens}
      className={cn(
        "bg-secondary hover:bg-primary border-4 border-background text-text-primary rounded-xl",
        className
      )}
    >
      <ArrowUpDown size={18} />
    </Button>
  );
});
