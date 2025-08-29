import { FieldValues, get } from "react-hook-form";
import { TextInputProps } from "./text-input.types";
import TextBox from "../../textbox/Textbox";

const TextInput = <TformValues extends FieldValues>({
  name,
  register,
  errors,
  variant,
  ...rest
}: TextInputProps<TformValues>) => {
  const error = get(errors, name);
  const hasError = !!error;

  return (
    <>
      <TextBox
        {...register(name)}
        {...(hasError ? { variant: "error" } : { variant: variant })}
        {...rest}
      />
      {
        hasError && (
            <p className="mt-2 text-sm text-error">{error?.message}</p>
        )
      }
    </>
  );
};

export default TextInput;
