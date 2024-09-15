"use client";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function SignOutBtn() {
  const sendReq = useSendAuthRequest();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function signOutHandler() {
    if (isLoading) return;
    setIsLoading(true);
    const response = await sendReq("/Account/sign-out", "delete");
    if (response.status === 200) {
      router.replace("/");
      router.refresh();
    } else {
      setIsLoading(false);
      Swal.fire({ title: "Something went wrong", icon: "error" });
    }
  }
  return (
    <button
      disabled={isLoading}
      onClick={async (e) => await signOutHandler()}
      className=" btn btn-outline-primary ms-lg-3 mt-3 mt-lg-0 signout d-flex justify-content-center gap-1 align-items-center"
    >
      Sign out
      {isLoading && (
        <Oval
          visible={true}
          height="18"
          width="18"
          color="#0d6efd"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass="mt-1 ms-1"
        />
      )}
    </button>
  );
}
