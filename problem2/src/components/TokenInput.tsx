import { Input, InputProps, Typography } from "@/components/common";
import { cn } from "@/libs/clsx";
import { forwardRef, useState } from "react";
import { TokenSelect } from "./TokenSelect";
import { NullableToken } from "@/schemas/token";

type TokenInputProps = InputProps & {
  label: string;
  token: NullableToken;
  setToken: React.Dispatch<React.SetStateAction<NullableToken>>;
};

export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  (props, ref) => {
    const { label, token, setToken, ...inputProps } = props;

    const [isOnFocus, setIsOnFocus] = useState(false);

    return (
      <div
        className={cn("w-full p-4 bg-secondary rounded-2xl border-[0.5px]", {
          "border-primary": isOnFocus,
          "border-transparent": !isOnFocus,
        })}
      >
        <div className="h-20 md:h-[90px] flex flex-col gap-1">
          <Typography level="p5" className="text-text-secondary font-medium ">
            {label}
          </Typography>
          <div className="flex items-center gap-3">
            <Input
              ref={ref}
              {...inputProps}
              type="number"
              inputMode="decimal"
              variant="flat"
              outline="none"
              fontSize="4xl"
              min={0}
              placeholder="0"
              className="px-0"
              onFocus={() => setIsOnFocus(true)}
              onBlur={() => setIsOnFocus(false)}
            />
            <TokenSelect token={token} setToken={setToken} />
          </div>
        </div>
      </div>
    );
  }
);
