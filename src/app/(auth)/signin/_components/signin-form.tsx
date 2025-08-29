"use client";

import Button from "@/app/_components/button/Button";
import { useForm } from "react-hook-form";
import { Signin } from "../_types/signin.types";
import { TextInput } from "@/app/_components/form-input";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/stores/notification.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../_types/signin.schema";
import { signinAction } from "@/actions/auth";
import React, { useEffect, useTransition } from "react";

const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Signin>({
    resolver: zodResolver(signinSchema),
  });

  const [formState, action] = React.useActionState(signinAction, null);
  const [isPending , startTransition] = useTransition();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const router = useRouter();

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.error) {
      showNotification({
        message: formState.error.detail!,
        type: "error",
      });
    } else if (formState && formState.isSuccess) {
      router.push(`/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: `کد تایید شما ${formState.response}`,
        type: "info",
        duration: 5000,
      });
    }
  }, [showNotification, formState , getValues , router]);

  function onSubmit(data: Signin) {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    startTransition(async () => {
      await action(formData);
    })
    
  }

  return (
    <>
      <h5 className="text-2xl">ورود | ثبت نام</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        className="flex flex-col gap-6 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput<Signin>
          register={register}
          name={"mobile"}
          errors={errors}
        />
        <Button type="submit" variant="primary" isLoading={isPending}>
          تایید و دریافت کد
        </Button>
      </form>
    </>
  );
};

export default SigninForm;
