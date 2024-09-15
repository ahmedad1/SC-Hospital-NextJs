"use client";

import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "cookie-universal";
import getJsonPatchObj from "@/app/extra-services/getJsonPatchObj";
import { Oval } from "react-loader-spinner";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
export default function Unsensitive() {
  const [initData, setInitData] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState(null);
  const [password, setPassword] = useState(null);
  const cookies = Cookies();
  const sendReq = useSendAuthRequest();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect((_) => {
    sendReq("/Account").then((res) => {
      if (res.status == 200) {
        setInitData(res.data);
        return;
      }
      Swal.fire({ title: "Something went wrong", icon: "error" });
    });
  }, []);
  async function submition(e) {
    e.preventDefault();
    if (isLoading) return;
    const json = [];
    if (firstName) json.push(getJsonPatchObj("firstName", firstName));
    if (lastName) json.push(getJsonPatchObj("lastName", lastName));
    if (userName) json.push(getJsonPatchObj("userName", userName));
    if (birthDate) json.push(getJsonPatchObj("birthdate", birthDate));
    if (gender) json.push(getJsonPatchObj("gender", gender));
    if (json.length === 0) {
      Swal.fire({
        title: "You haven't updated any of your data",
        icon: "info",
      });
      return;
    }
    setIsLoading(true);
    const result = await sendReq("/Account/insensitive-data", "patch", {
      user: json,
      password: password,
    });
    setIsLoading(false);
    if (result.status == 200) {
      const date = new Date();
      const cookieOpt = {
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      };
      Swal.fire({ title: "Updated Successfully", icon: "success" });
      if (firstName) cookies.set("firstName", firstName, cookieOpt);
      if (lastName) cookies.set("lastName", lastName, cookieOpt);
      if (userName) cookies.set("userName", userName, cookieOpt);
      if (birthDate) cookies.set("birthDate", birthDate, cookieOpt);
      if (gender) cookies.set("gender", gender, cookieOpt);
      router.refresh();
    } else {
      console.log(e);

      if (e.data.wrongPassword) {
        Swal.fire({ title: "Wrong Password", icon: "error" });
        return;
      } else if (e.data.hasRepeatedUserName) {
        Swal.fire({
          title: "The username is already registered",
          icon: "error",
        });
        return;
      }
      Swal.fire({ title: "Something went wrong", icon: "errorF" });
    }
  }

  return (
    <>
      <form className="form-control px-5 pb-5 pt-4 mt-5 ">
        <label htmlFor="firstName" className="text-muted">
          First Name
        </label>
        <input
          placeholder={initData ? initData.firstName : "Loading..."}
          onChange={(e) => {
            e.target.placeholder = "";
            setFirstName(e.target.value);
          }}
          type="text"
          id="firstName"
          className="form-control mt-2"
          readOnly={initData == null}
        />

        <label htmlFor="lastName" className="text-muted mt-2">
          Last Name
        </label>
        <input
          placeholder={initData ? initData.lastName : "Loading..."}
          onChange={(e) => {
            e.target.placeholder = "";
            setLastName(e.target.value);
          }}
          type="text"
          id="lastName"
          className="form-control mt-2"
          readOnly={initData == null}
        />

        <label htmlFor="email" className="text-muted mt-2">
          Email
        </label>
        <input
          placeholder={initData ? initData.email : "Loading..."}
          type="email"
          id="email"
          className="form-control mt-2"
          disabled
        />

        <label htmlFor="userName" className="text-muted mt-2">
          UserName
        </label>
        <input
          placeholder={initData ? initData.userName : "Loading..."}
          onChange={(e) => {
            e.target.placeholder = "";
            setUserName(e.target.value);
          }}
          type="text"
          id="userName"
          className="form-control mt-2"
          readOnly={initData == null}
        />
        <div className="d-flex flex-column">
          <label htmlFor="birthDate" className="text-muted mt-2 form-label">
            BirthDate
          </label>
          <DatePicker
            placeholderText={initData ? initData.birthdate : "Loading..."}
            id="picker"
            className="caret-transparent form-control"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(
                `${e.getFullYear()}-${(e.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${e.getDate().toString().padStart(2, "0")}`
              );
            }}
          />
        </div>
        <label htmlFor="gender" className="text-muted mt-2">
          Gender
        </label>
        <select
          readOnly={initData != null}
          onChange={(e) => setGender(e.target.value)}
          className="form-select mt-2"
          id="gender"
          aria-label="Default select example"
        >
          <option>Choose</option>
          <option
            selected={initData ? initData.gender === "Male" : false}
            value="male"
          >
            Male
          </option>
          <option
            selected={initData ? initData.gender === "Female" : false}
            value="female"
          >
            Female
          </option>
        </select>
        <br />

        <a
          href="#passwordVerification"
          data-bs-toggle="modal"
          className="btn btn-outline-primary mt-3 submitData"
        >
          Save
        </a>
      </form>

      <div
        className="modal fade"
        id="passwordVerification"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="passwordVerification1">
                Verify your password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                id="passwordForm"
                className="form-control"
                onSubmit={async (e) => {
                  await submition(e);
                }}
              >
                <label htmlFor="verifyPassword">
                  Enter your password before saving changes
                </label>
                <input
                  id="verifyPassword"
                  required
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="checkbox"
                  id="showPassword"
                  className="showpass mt-2"
                />
                <label htmlFor="showPassword" className="mt-2 ms-1">
                  Show Password
                </label>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={async (e) => {
                  await submition(e);
                }}
                disabled={isLoading}
                type="submit"
                className="btn btn-primary d-flex justify-content-center gap-1 align-items-center"
              >
                Save
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
