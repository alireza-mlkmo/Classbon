import {
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { TextboxProps } from "../../textbox/textbox-types";

export type TextInputProps<TformValues extends FieldValues> = Omit<
  TextboxProps,
  "name"
> & {
  register: UseFormRegister<TformValues>;
  name: Path<TformValues>;
  rules?: RegisterOptions<TformValues, Path<TformValues>>;
  errors?: FieldErrors<TformValues>;
};
