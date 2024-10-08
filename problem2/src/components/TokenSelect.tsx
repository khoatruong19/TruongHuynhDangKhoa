import { useMemo, useRef, useState } from "react";
import { Button, Dialog, Input, Label, Typography } from "@/components/common";
import { useGetTokens } from "@/hooks/query/useGetTokens";
import { NullableToken, Token } from "@/schemas/token";
import { ChevronDown, Search } from "lucide-react";
import TokenService from "@/services/token";
import { cn } from "@/libs/clsx";

type TokenSelectProps = {
  token: NullableToken;
  setToken: (token: Token) => void;
};

export const TokenSelect = ({ token, setToken }: TokenSelectProps) => {
  const { data: tokens } = useGetTokens({ allowFetch: true });

  const [searchTokenValue, setSearchTokenValue] = useState("");

  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  const filteredTokens = useMemo(
    () =>
      tokens?.filter((item) =>
        item.currency.toLowerCase().includes(searchTokenValue.toLowerCase())
      ) ?? [],
    [tokens, searchTokenValue]
  );

  const handleSelectToken = (token: Token) => {
    setToken(token);
    dialogTriggerRef.current?.click();
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild className="w-full" ref={dialogTriggerRef}>
        {token ? (
          <Button
            variant="secondary"
            className="px-0  min-w-[140px] w-fit font-semibold gap-2 text-lg rounded-3xl"
          >
            <div className="flex items-center gap-2">
              <img
                alt="token"
                src={TokenService.getTokenSrc(token.currency)}
                className="w-7 h-7 object-cover"
              />
              <Typography level="p5">{token.currency}</Typography>
            </div>
            <ChevronDown size={20} />
          </Button>
        ) : (
          <Button className="px-1.5 w-full md:w-[60%] font-semibold gap-2 text-base md:text-lg rounded-3xl">
            Select token
            <ChevronDown size={20} />
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[450px] text-text-primary px-0 pb-1 overflow-hidden">
        <div className="px-5">
          <Dialog.Header className="mb-6    ">
            <Dialog.Title>Select a token</Dialog.Title>
          </Dialog.Header>
          <div className="flex items-center bg-background rounded-xl">
            <Label htmlFor="token" className="text-right pl-3 py-2.5  ">
              <Search size={20} />
            </Label>
            <Input
              id="token"
              placeholder="Search name"
              variant="flat"
              outline="none"
              value={searchTokenValue}
              onChange={(e) => setSearchTokenValue(e.target.value)}
            />
          </div>
        </div>
        <div className="h-96 overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-secondary scrollbar-thin">
          {filteredTokens.map((item) => (
            <TokenItem
              key={item.currency}
              token={item}
              isSelected={item === token}
              onClick={() => handleSelectToken(item)}
            />
          ))}
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

type TokenItemProps = {
  token: Token;
  isSelected?: boolean;
  onClick: () => void;
};
const TokenItem = ({ token, isSelected = false, onClick }: TokenItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-2.5 hover:bg-background/60 cursor-pointer",
        {
          "bg-background": isSelected,
        }
      )}
      onClick={onClick}
    >
      <img
        alt="token"
        src={TokenService.getTokenSrc(token.currency)}
        className="w-11 h-11 object-cover"
      />
      <div>
        <Typography level="p4">{token.currency}</Typography>
        <Typography level="p7" className="text-text-secondary">
          {token.price}
        </Typography>
      </div>
    </div>
  );
};
