import { FormProvider } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormMessage } from "./FormMessage";

const Form = Object.assign(FormProvider, {
  Item: FormItem,
  Field: FormField,
  Label: FormLabel,
  Control: FormControl,
  Message: FormMessage,
});

export { Form };
