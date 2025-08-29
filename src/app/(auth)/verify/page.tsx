import { Suspense } from "react";
import VarificationForm from "./_components/verification-form";

export default function Verify() {
  return (
    <Suspense>
      <VarificationForm />
    </Suspense>
  );
}
