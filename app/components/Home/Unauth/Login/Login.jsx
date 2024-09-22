"use client";
import {
  BACKEND_BASEURL,
  WITH_CREDENTIALS,
} from "@/app/extra-services/constants";
import userlogo from "@/app/public/userlogo.png";
import axios from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {executeRecaptcha}=useReCaptcha()
  const passwordRef=useRef()
  const router = useRouter();
  async function submitForm(e) {
    e.preventDefault();
    if (isLoading) return;
    if (!userName || !password) return;
    try {
      const token=await executeRecaptcha("login")
    
      
      setIsLoading(true)
      await axios.post(
        `${BACKEND_BASEURL}api/Account/log-in`,
        {
          userName: userName,
          password: password,
          RecaptchaToken:token
        },
        { withCredentials: WITH_CREDENTIALS }
      );
      router.replace("/",{scroll:true});
      router.refresh();
    } catch {
      setIsLoading(false)
      Swal.fire({ title: "Invalid username or password", icon: "error" });
    }
  }
  return (
    <section className="container mt-5" id="login">
      <div className="d-flex justify-content-center">
        <h3>Login</h3>
      </div>
      <div className="mt-5">
        <form onSubmit={async e=>{await submitForm(e)}} method="POST" className=" mt-4 form-control formlog p-4">
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
              onChange={e=>{
                passwordRef.current.type=e.target.checked?"text":"password";
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
        </form>
      </div>
    </section>
  );
}
