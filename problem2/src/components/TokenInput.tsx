import { forwardRef, useState } from "react";
import { Input, Typography } from "@/components/common";
import { TokenSelect } from "./TokenSelect";
import { NullableToken, Token } from "@/schemas/token";
import { ControllerRenderProps } from "react-hook-form";
import { TokenConvertFormValues } from "@/hooks/useTokenConvertForm";
import { cn } from "@/libs/clsx";

type TokenInputProps = ControllerRenderProps<TokenConvertFormValues> & {
  label: string;
  token: NullableToken;
  setToken: (token: Token) => void;
};

export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  (props, _) => {
    const { label, token, setToken, onChange, ...inputProps } = props;

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
              {...inputProps}
              type="number"
              inputMode="decimal"
              variant="flat"
              outline="none"
              fontSize="4xl"
              min={0}
              placeholder="0"
              className="px-0 truncate"
              onChange={(event) => onChange(+event.target.value)}
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
