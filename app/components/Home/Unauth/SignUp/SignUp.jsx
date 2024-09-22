"use client";

import {
  BACKEND_BASEURL,
  WITH_CREDENTIALS,
} from "@/app/extra-services/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "cookie-universal";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import { useReCaptcha } from "next-recaptcha-v3";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const {executeRecaptcha}=useReCaptcha()
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoginIsLoading, setGoogleLoginIsLoading] = useState(false);
  const inputPasswordRef = useRef();
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
  const router = useRouter();
  const cookies = Cookies();
  async function submitForm(e) {
    e.preventDefault();
    if (isLoading) return;
    try {
      const token=await executeRecaptcha("signup")
      setIsLoading(true);
      await axios.post(
        `${BACKEND_BASEURL}api/Account/sign-up`,
        {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          birthDate: birthDate,
          gender: gender,
          email: email,
          password: password,
          RecaptchaToken:token
        },
        { withCredentials: WITH_CREDENTIALS }
      );
      cookies.set("email", email, {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        secure: true,
      });
      router.push("/email-confirmation");
    } catch (e) {
      setIsLoading(false);
      if (e.response.data.success === false) {
        Swal.fire({
          title: `${e.response.data.alreadyExistField} is already registered`,
          icon: "error",
        });
      }
    }
  }
  return (
    <div className="container mt-5" id="sign-up">
      <div id="contact" className="d-flex justify-content-center">
        <h3>Sign Up</h3>
      </div>
      <form
        onSubmit={async (e) => {
          await submitForm(e);
        }}
        className="form-control p-5 mt-4 formsignup"
      >
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              name="fname"
              type="text"
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter Your First Name"
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              name="lname"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              required
              placeholder="Enter Your Last Name"
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Email Address</span>
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="emailsign"
              required
              placeholder="example@example.com"
              className="form-control"
              pattern="\w+@\w+\.\w+(\.\w+)*"
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">UserName</span>
            </div>
            <input
              name="userNameSign"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Your UserName"
              maxLength="100"
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">&nbsp;Birthday&nbsp;</span>
            </div>
            <input
              onChange={(e) => setBirthDate(e.target.value)}
              name="bDate"
              type="date"
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">&nbsp;Password&nbsp;</span>
            </div>
            <input
              name="passwordsign"
              type="password"
              placeholder="Enter A Strong Password"
              maxLength="100"
              minLength="8"
              onChange={(e) => setPassword(e.target.value)}
              ref={inputPasswordRef}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="input-group mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text">&nbsp;Gender&nbsp;</span>
          </div>
          <div className="d-flex form-control">
            <input
              type="radio"
              name="gender"
              id="Male"
              value="Male"
              className="ms-2"
              required
              onChange={(e) => {
                if (e.target.checked) setGender(e.target.value);
              }}
            />
            <label
              htmlFor="Male"
              className="d-flex align-items-center mb-0 ms-2 "
            >
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="Female"
              className="ms-2"
              value="Female"
              onChange={(e) => {
                if (e.target.checked) setGender(e.target.value);
              }}
              required
            />
            <label
              htmlFor="Female"
              className="d-flex align-items-center mb-0 ms-2 "
            >
              Female
            </label>
          </div>
        </div>
        <div className="form-check mt-3">
          <input
            type="checkbox"
            onChange={(e) => {
              inputPasswordRef.current.type = e.target.checked
                ? "text"
                : "password";
            }}
            id="showPassSignUp"
            className="form-check-input "
          />
          <label
            htmlFor="showPassSignUp"
            className="form-check-label"
            style={{ cursor: "pointer" }}
          >
            Show My Password
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-outline-primary w-100 mt-2 signUpBtn d-flex justify-content-center gap-1 align-items-center"
        >
          Create My Account
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
            <i className="bi bi-google me-2"></i> Sign Up with Google
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
  );
}
