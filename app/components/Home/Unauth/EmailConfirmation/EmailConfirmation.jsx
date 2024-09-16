"use client";
import { useEffect, useState } from "react";
import "./EmailConfirmation.css";
import Cookies from "cookie-universal";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  BACKEND_BASEURL,
  WITH_CREDENTIALS,
} from "@/app/extra-services/constants";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
export default function EmailConfirmation() {
  const cookies = Cookies();
  const router = useRouter();
  const [code, setCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect((_) => {
    if (!cookies.get("email")) router.replace("/");

    axios
      .post(
        `${BACKEND_BASEURL}api/Account/code-in-email`,
        {
          email: cookies.get("email"),
          reset: false,
        },
        { withCredentials: WITH_CREDENTIALS }
      )
      .catch((e) => {
        Swal.fire({ title: "Something went wrong", icon: "error" });
      });
  }, []);
  async function submitForm(e) {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      await axios.post(
        `${BACKEND_BASEURL}api/Account/confirmation-code`,
        {
          email: cookies.get("email"),
          code: code,
        },
        { withCredentials: WITH_CREDENTIALS }
      );
      setIsLoading(false);
      await Swal.fire({ title: "Confirmed Successfully", icon: "success" });
      cookies.removeAll();
      router.replace("/");
      return;
    } catch {
      setIsLoading(false);
      Swal.fire({ title: "Invalid Code", icon: "error" });
    }
  }
  return (
    <>
      <div
        className="container align-items-center  "
        style={{ height: "90vh" }}
      >
        <h4 className="mt-5 text-primary" style={{ fontSize: "1.9em" }}>
          Email Confiramtion
        </h4>
        <form
          onSubmit={async (e) => await submitForm(e)}
          className="form-control p-5 confirm-form mt-5 "
        >
          <label
            htmlFor="verification"
            className="text-muted"
            style={{ fontSize: "1.2em" }}
          >
            A code has been sent to your email
          </label>
          <input
            type="number"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the verification code"
            style={{ fontSize: "1.05em" }}
            required={true}
            className="form-control mt-3"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-outline-primary mt-4 verifyCodeBtn d-flex justify-content-center gap-1 align-items-center"
          >
            Verify
            {isLoading && (
              <Oval
                visible={true}
                height="18"
                width="18"
                color="#0d6efd"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName="mt-1 ms-1"
              />
            )}
          </button>
        </form>
      </div>
    </>
  );
}
