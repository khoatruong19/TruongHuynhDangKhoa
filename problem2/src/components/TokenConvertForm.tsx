import { TokenInput, TokensReset } from "@/components";
import { Button, Form } from "@/components/common";
import { useTokenConvertForm } from "@/hooks/useTokenConvertForm";
import { TokensSwap } from "./TokensSwap";

export const TokenConvertForm = () => {
  const {
    form,
    isSwaping,
    isDisabled,
    tokenA,
    tokenB,
    setTokenA,
    setTokenB,
    swapTokens,
    resetForm,
    onSubmit,
  } = useTokenConvertForm();

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
                      label="1st"
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
                      label="2nd"
                      {...field}
                      token={tokenB}
                      setToken={setTokenB}
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </form>
        </Form>
        <Button
          size="xl"
          fullWidth
          className="rounded-2xl mt-1 bg-opacity-50 text-text-primary"
          disabled={isDisabled}
          isLoading={isSwaping}
          onClick={form.handleSubmit(onSubmit)}
        >
          Convert
        </Button>
      </div>
    </div>
  );
};
