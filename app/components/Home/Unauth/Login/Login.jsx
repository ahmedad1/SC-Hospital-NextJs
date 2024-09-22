"use client";
import {
  BACKEND_BASEURL,
  WITH_CREDENTIALS,
} from "@/app/extra-services/constants";
import userlogo from "@/app/public/userlogo.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useReCaptcha();
  const passwordRef = useRef();
  const router = useRouter();
  const [googleLoginIsLoading, setGoogleLoginIsLoading] = useState(false);
  async function submitForm(e) {
    e.preventDefault();
    if (isLoading) return;
    if (!userName || !password) return;
    try {
      const token = await executeRecaptcha("login");

      setIsLoading(true);
      await axios.post(
        `${BACKEND_BASEURL}api/Account/log-in`,
        {
          userName: userName,
          password: password,
          RecaptchaToken: token,
        },
        { withCredentials: WITH_CREDENTIALS }
      );
      router.replace("/", { scroll: true });
      router.refresh();
    } catch {
      setIsLoading(false);
      Swal.fire({ title: "Invalid username or password", icon: "error" });
    }
  }
const loginGoogle=useGoogleLogin({
  onSuccess:async e=>{
    
    setGoogleLoginIsLoading(true)
    const token=e.access_token
    if (!token) return;
    try {
      const result = await axios.post(
        `${BACKEND_BASEURL}api/Account/google-oauth`,
        {
          accessToken: token,
        }
        ,{ withCredentials: WITH_CREDENTIALS }
      );
      setGoogleLoginIsLoading(false)
     
      if (result.data.success && result.data.emailConfirmed) {
        router.replace("/")
        router.refresh()
        return;
      } else {
        Swal.fire({ title: "Your email is not confirmed", icon: "error" });
        return;
      }
    } catch {
      setGoogleLoginIsLoading(false)
      Swal.fire({ title: "Bad Credentials" ,icon:"error"});
    }
  },
  onError:e=>{
    setGoogleLoginIsLoading(false)
  },
  onNonOAuthError:e=>{
    setGoogleLoginIsLoading(false)
  }
})
  return (
    <section className="container mt-5" id="login">
      <div className="d-flex justify-content-center">
        <h3>Login</h3>
      </div>
      <div className="mt-5">
        <form
          onSubmit={async (e) => {
            await submitForm(e);
          }}
          method="POST"
          className=" mt-4 form-control formlog p-4"
        >
          <div className="usrlogo d-flex justify-content-center">
            <Image src={userlogo} alt="reload the page" />
          </div>

          <div className="form-group">
            <label htmlFor="userName">UserName</label>
            <input
              name="userNameLog"
              id="userName"
              className="form-control"
              type="text"
              required
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="passwd">Password</label>
            <input
              name="passwordLog"
              type="password"
              ref={passwordRef}
              className="form-control"
              required
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-check mt-3">
            <input
              id="showPassLogin"
              className="form-check-input"
              type="checkbox"
              onChange={(e) => {
                passwordRef.current.type = e.target.checked
                  ? "text"
                  : "password";
              }}
            />
            <label style={{ cursor: "pointer" }} htmlFor="showPassLogin">
              Show my password
            </label>
          </div>
          <div className="form-group mt-5">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-outline-primary w-100 loginBtn d-flex justify-content-center gap-1 align-items-center"
            >
              Login
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
          </div>
          <div className="d-flex my-3 align-items-center">
            <hr style={{ width: "46%" }} />
            <small className="text-center">or conitinue with</small>
            <hr style={{ width: "45%" }} />
          </div>
          <button
            type="button"
         
            onClick={(e) => {
              if (googleLoginIsLoading || isLoading) return;
              setGoogleLoginIsLoading(true);
              loginGoogle();
            }}
            className="btn btn-social btn-google  form-control d-flex justify-content-center align-items-center "
          >
            <i className="bi bi-google me-2"></i> Log in with Google
            {googleLoginIsLoading && (
              <Oval
                visible={true}
                height="18"
                width="18"
                color="#ed6aab"
                secondaryColor="#000"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass="ms-2"
              />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
