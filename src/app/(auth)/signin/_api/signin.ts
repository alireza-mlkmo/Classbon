import { createData } from "@/core/http-service/http-service";
import { Signin } from "../_types/signin.types";
import { useMutation } from "@tanstack/react-query";

function signin(model: Signin) : Promise<void>{
    return createData<Signin , void>('/signin',model)
}

type UseSigninOptions = {
    onSuccess?: () => void;
}

export const useSignin = ({onSuccess}: UseSigninOptions) => {
    const {mutate: submit , isPending} = useMutation({
        mutationFn: signin,
        onSuccess: onSuccess,
    });

    return{submit , isPending}
}