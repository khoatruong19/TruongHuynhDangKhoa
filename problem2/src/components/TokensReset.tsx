import { Tooltip, TooltipProvider, Typography } from "@/components/common";
import { RotateCcw } from "lucide-react";

type TokensResetProps = {
  resetTokens: () => void;
};

export const TokensReset = ({ resetTokens }: TokensResetProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <RotateCcw
            className="text-text-secondary hover:opacity-70 cursor-pointer"
            size={20}
            onClick={resetTokens}
          />
        </Tooltip.Trigger>
        <Tooltip.Content className="">
          <Typography level="p5" className="tracking-wide">
            Reset
          </Typography>
        </Tooltip.Content>
      </Tooltip>
    </TooltipProvider>
  );
};
