import { TokenInput, TokensReset } from "@/components";
import { Button, Form } from "@/components/common";
import { useTokenConvertForm } from "@/hooks/useTokenConvertForm";
import { NullableToken } from "@/schemas/token";
import { useState } from "react";
import { TokensSwap } from "./TokensSwap";

export const TokenConvertForm = () => {
  const { form, resetForm, onSubmit } = useTokenConvertForm();

  const [tokenA, setTokenA] = useState<NullableToken>(null);
  const [tokenB, setTokenB] = useState<NullableToken>(null);

  const swapTokens = () => {
    setTokenA(tokenB);
    setTokenB(tokenA);
  };

  return (
    <div className="max-w-[550px] w-full">
      <div className="px-4 md:px-10 pt-8 md:pt-10 lg:pt-16 pb-10 flex flex-col">
        <div className="flex justify-end mb-4">
          <TokensReset resetTokens={resetForm} />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative w-full flex flex-col gap-1"
          >
            <Form.Field
              control={form.control}
              name="tokenA"
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <TokenInput
                      label="Sell"
                      {...field}
                      token={tokenA}
                      setToken={setTokenA}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <TokensSwap
              type="button"
              className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
              swapTokens={swapTokens}
            />

            <Form.Field
              control={form.control}
              name="tokenB"
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <TokenInput
                      label="Buy"
                      {...field}
                      token={tokenB}
                      setToken={setTokenB}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </form>
        </Form>
        <Button
          size="xl"
          fullWidth
          className="rounded-2xl mt-1 bg-opacity-50 text-text-primary"
        >
          Convert
        </Button>
      </div>
    </div>
  );
};
