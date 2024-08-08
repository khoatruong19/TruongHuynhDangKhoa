import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NullableToken, Token, TokenWithAmount } from "@/schemas/token";
import { useSwapToken } from "./mutation/useSwapToken";

const TokenConvertFormSchema = z.object({
  tokenA: z.number().min(0),
  tokenB: z.number().min(0),
});

export type TokenConvertFormValues = z.infer<typeof TokenConvertFormSchema>;

export const useTokenConvertForm = () => {
  const form = useForm<TokenConvertFormValues>({
    resolver: zodResolver(TokenConvertFormSchema),
    defaultValues: {
      tokenA: 0,
      tokenB: 0,
    },
  });

  const tokenAValue = form.watch("tokenA");
  const tokenBValue = form.watch("tokenB");

  const [tokenA, setTokenA] = useState<NullableToken>(null);
  const [tokenB, setTokenB] = useState<NullableToken>(null);
  const [isSwaped, setIsSwaped] = useState(false);

  const { mutate, isPending } = useSwapToken();

  const handleSetTokenA = (token: Token) => {
    setTokenA(token);
    form.setValue("tokenA", 0);
  };

  const handleSetTokenB = (token: Token) => {
    setTokenB(token);
    form.setValue("tokenB", 0);
  };

  const handleResetForm = () => form.reset();

  const handleSwapTokens = () => {
    setTokenA(tokenB);
    setTokenB(tokenA);
    handleResetForm();
  };

  const handleOnSubmit = async (data: TokenConvertFormValues) => {
    const { tokenA: tokenAAmount, tokenB: tokenBAmount } = data;
    if (tokenAAmount === 0 && tokenBAmount === 0) return;

    let fromToken: TokenWithAmount;
    let toToken: TokenWithAmount;

    if (tokenAAmount !== 0) {
      fromToken = { ...tokenA, amount: tokenAAmount } as TokenWithAmount;
      toToken = { ...tokenB, amount: tokenBAmount } as TokenWithAmount;
    } else {
      fromToken = { ...tokenB, amount: tokenBAmount } as TokenWithAmount;
      toToken = { ...tokenA, amount: tokenAAmount } as TokenWithAmount;
    }

    mutate(
      {
        priceFrom: fromToken.price,
        priceTo: toToken.price,
        amount: fromToken.amount,
      },
      {
        onSuccess(data) {
          setIsSwaped(true);
          tokenAValue === 0
            ? form.setValue("tokenA", data)
            : form.setValue("tokenB", data);
        },
      }
    );
  };

  useEffect(() => {
    if (!isSwaped && tokenAValue !== 0 && tokenBValue !== 0) {
      form.setValue("tokenB", 0);
    }
    setIsSwaped(false);
  }, [tokenAValue]);

  useEffect(() => {
    if (!isSwaped && tokenBValue !== 0 && tokenAValue !== 0) {
      form.setValue("tokenA", 0);
    }
    setIsSwaped(false);
  }, [tokenBValue]);

  return {
    form,
    tokenA,
    tokenB,
    isSwaping: isPending,
    isDisabled:
      (tokenAValue > 0 && tokenBValue > 0) ||
      (tokenAValue === 0 && tokenBValue === 0) ||
      !tokenA ||
      !tokenB,
    setTokenA: handleSetTokenA,
    setTokenB: handleSetTokenB,
    swapTokens: handleSwapTokens,
    resetForm: handleResetForm,
    onSubmit: handleOnSubmit,
  };
};
