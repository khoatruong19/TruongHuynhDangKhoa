import { TokenInput, TokensReset } from "@/components";
import { Button, Form } from "@/components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TokensSwap } from "./TokensSwap";

const FormSchema = z.object({
  tokenA: z.number().min(0),
  tokenB: z.number().min(0),
});

export const TokenConvertForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tokenA: 0,
      tokenB: 0,
    },
  });

  const handleResetForm = () => form.reset();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    alert(data);
  };

  return (
    <div className="max-w-[550px] w-full">
      <div className="px-4 md:px-10 pt-8 md:pt-10 lg:pt-16 pb-10 flex flex-col">
        <div className="flex justify-end mb-4">
          <TokensReset resetTokens={handleResetForm} />
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
                    <TokenInput label="Sell" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <TokensSwap
              type="button"
              className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
              swapTokens={() => {}}
            />

            <Form.Field
              control={form.control}
              name="tokenB"
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <TokenInput label="Buy" {...field} />
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
