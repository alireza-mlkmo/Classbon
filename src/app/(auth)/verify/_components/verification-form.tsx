"use client";

import { AuthCodeRef } from "@/app/_components/auth-code/auth-code.types";
import AuthCode from "@/app/_components/auth-code/AuthCode";
import Button from "@/app/_components/button/Button";
import { Timer } from "@/app/_components/timer/Timer";
import { TimerRef } from "@/app/_components/timer/timer.types";
import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState, useTransition } from "react";
import { useNotificationStore } from "@/stores/notification.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { VerifyUserModel } from "../_types/verify-user.type";
import { getToken, sendAuthCode } from "@/actions/auth";
import { useSessionStore } from "@/stores/auth.store";

const getTwoMinutesFromNow = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  return time;
};

const VarificationForm: React.FC = () => {
  const [showResendCode, setShowResendCode] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter()
  const authCodeRef = useRef<AuthCodeRef>(null);
  const timerRef = useRef<TimerRef>(null);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<VerifyUserModel>();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const updateSession = useSessionStore(state => state.updateSession)

  const [sendAuthCodeState, sendAuthCodeAction] = React.useActionState(
    sendAuthCode,
    null
  );

  const [getTokenState, getTokenAction] = React.useActionState(getToken, null);

  const params = useSearchParams();
  const mobile = params.get("mobile")!;

useEffect(() => {
  if (
    sendAuthCodeState &&
    !sendAuthCodeState.isSuccess &&
    sendAuthCodeState.error
  ) {
    showNotification({
      message: sendAuthCodeState.error.detail!,
      type: "error",
    });
  } else if (sendAuthCodeState && sendAuthCodeState.isSuccess) {
    showNotification({
      message: `کد تایید شما ${sendAuthCodeState.response}`,
      duration: 5000,
      type: "info",
    });
  }

  if (getTokenState && !getTokenState.isSuccess && getTokenState.error) {
    showNotification({
      message: getTokenState.error.detail!,
      type: "error",
    });
  } else if (getTokenState && getTokenState.isSuccess) {
    showNotification({
      message: "شما با موفقیت وارد شدید",
      type: "success",
    });

    (async () => {
      await updateSession();
      router.push('/student/courses')
    })();
  }
}, [sendAuthCodeState, getTokenState, showNotification, updateSession]);

  function onSubmit(data: VerifyUserModel) {
    data.username = mobile;
    startTransition(async () => {
      await getTokenAction(data);      
    });
  }

  register("code", {
    validate: (value: string) => (value ?? "").length === 5,
  });

  function resendAuthCode() {
    timerRef.current?.restart(getTwoMinutesFromNow());
    setShowResendCode(false);
    authCodeRef.current?.clear();
    sendAuthCodeAction(mobile);
  }
  return (
    <>
      <h5 className="text-2xl">کد تایید</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-10 flex-1"
      >
        <AuthCode
          className="mt-10"
          ref={authCodeRef}
          onChange={(value) => {
            setValue("code", value, { shouldValidate: true });
          }}
        />
        <Timer
          ref={timerRef}
          className="my-8"
          size="small"
          expiryTimestamp={getTwoMinutesFromNow()}
          showDays={false}
          showHours={false}
          onExpire={() => {
            setShowResendCode(true);
          }}
        />
        <Button
          isDisabled={!showResendCode}
          isLink={true}
          onClick={resendAuthCode}
        >
          ارسال مجدد کد تایید
        </Button>
        <Button
          type="submit"
          variant="primary"
          isDisabled={!isValid}
          isLoading={isPending}
        >
          تایید و ادامه
        </Button>
        <div className="flex items-start gap-1 justify-center mt-auto">
          <span>برای اصلاح شماره موبایل</span>
          <Link href="/signin">اینجا</Link>
          <span>کلیک کنید</span>
        </div>
      </form>
    </>
  );
};

export default VarificationForm;
