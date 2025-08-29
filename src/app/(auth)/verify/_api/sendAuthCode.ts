import { createData } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";

export const SendAuthCode = (mobile: string): Promise<any> => {
  return createData("/send-auth-code", { mobile });
};

type UseSendAuthCodeOptions = {
  onSuccess?: () => void;
};

export const useSendAuthCode = ({ onSuccess }: UseSendAuthCodeOptions = {}) => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: SendAuthCode,
    onSuccess: onSuccess,
  });

  return { submit, isPending };
};
