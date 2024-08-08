import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TokenConvertFormSchema = z.object({
  tokenA: z.number().min(0),
  tokenB: z.number().min(0),
});

const TokenConvertFormValues = z.infer<typeof TokenConvertFormSchema>;

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

  const handleResetForm = () => form.reset();

  const handleOnSubmit = (data: TokenConvertFormValues) => {
    alert(data);
  };

  useEffect(() => {
    if (tokenBValue !== 0) {
      form.setValue("tokenB", 0);
    }
  }, [tokenAValue]);

  useEffect(() => {
    if (tokenAValue !== 0) {
      form.setValue("tokenA", 0);
    }
  }, [tokenBValue]);

  return {
    form,
    resetForm: handleResetForm,
    onSubmit: handleOnSubmit,
  };
};
