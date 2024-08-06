import { Button, Input, Typography, Form } from "@/components/common";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const CurrencySwapForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(data);
  }
  return (
    <div className="max-w-[600px] h-[700px] w-full border rounded-md">
      <div className="px-10 pt-4 pb-10 flex flex-col items-center justify-center">
        <Typography level="h3" className="mb-3">
          Concurrency Converter
        </Typography>
        <Button size="lg" fullWidth>
          Swap
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Field
              control={form.control}
              name="username"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Username</Form.Label>
                  <Form.Control>
                    <Input placeholder="shadcn" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
