import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import useFormField from "./useFormField";
import { Label } from "../Label/Label";
import { cn } from "@/libs/clsx";

const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

export { FormLabel };
