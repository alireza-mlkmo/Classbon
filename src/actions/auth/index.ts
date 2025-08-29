"use server";

import { signinSchema } from "@/app/(auth)/signin/_types/signin.schema";
import { OperationResult } from "@/types/operation-result";
import { serverActionWrapper } from "../server-action-wrapper";
import { createData } from "@/core/http-service/http-service";
import { Signin } from "@/app/(auth)/signin/_types/signin.types";
import {
  SendAuthCode,
  VerifyUserModel,
} from "@/app/(auth)/verify/_types/verify-user.type";
import { Token } from "@/types/token.type";
import { jwtDecode } from "jwt-decode";
import { JwtPayload, UserSession } from "@/types/auth.types";
import { cookies } from "next/headers";
import { encryptSession } from "@/utils/session";

export async function signinAction(
  formState: OperationResult<string> | null,
  formData: FormData
) {
  const mobile = formData.get("mobile") as string;

  //   const validatedData = signinSchema.safeParse({
  //     mobile,
  //   });

  //   if (!validatedData.success) {
  //     return {
  //       message: "Error",
  //     };
  //   }
  //   else {
  return serverActionWrapper(
    async () => await createData<Signin, string>("/signin", { mobile })
  );
  //   }
}

export async function sendAuthCode(
  formState: OperationResult<string> | null,
  mobile: string
) {
  return serverActionWrapper(
    async () =>
      await createData<SendAuthCode, string>("/send-auth-code", { mobile })
  );
}

export async function getToken(
  formState: OperationResult<Token> | null,
  data: VerifyUserModel
) {
  const token = await serverActionWrapper(
    async () => await createData<VerifyUserModel, Token>("/verify", data)
  );

  if (token.response) await setAuthCookieAction(token.response);
  return token;
}

export async function setAuthCookieAction(token: Token) {
  const decoded = jwtDecode<JwtPayload>(token.token);

  const session: UserSession = {
    accessToken: token.token,
    refreshToken: token.refreshToken,
    sub: decoded.sub,
    mobile: decoded.mobile,
    nbf: decoded.nbf,
    exp: decoded.exp * 1000,
    iat: decoded.iat,
    iss: decoded.iss,
  };

  const cookieStore = await cookies();
  const encryptedSession = await encryptSession(session);

  cookieStore.set("clb-session", JSON.stringify(encryptedSession), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}


export async function signoutAction(){
  const cookieStore = await cookies();
  (await cookieStore).delete('clb-session');
}