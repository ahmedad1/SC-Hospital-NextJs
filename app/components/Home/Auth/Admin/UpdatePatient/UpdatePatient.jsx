"use client";

import LoadingComponent from "@/app/components/LoadingComponent";
import getJsonPatchObj from "@/app/extra-services/getJsonPatchObj";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function UpdatePatient(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isConfirmed, setIsConfirmed] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sendReq = useSendAuthRequest();
  useEffect((_) => {
    sendReq(`/Account/${props.id}?role=patients`).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      } else {
        Swal.fire({ title: "Something went wrong", icon: "error" });
      }
    });
  }, []);

  if (data == null) {
    return <LoadingComponent />;
  }
  async function submitForm(e) {
    e.preventDefault();
    if (isLoading) return;
    const json = [];
    if (firstName) json.push(getJsonPatchObj("firstName", firstName));
    if (lastName) json.push(getJsonPatchObj("lastName", lastName));
    if (userName) json.push(getJsonPatchObj("userName", userName));
    if (email) json.push(getJsonPatchObj("email", email));
    if (password) json.push(getJsonPatchObj("password", password));
    if (gender) json.push(getJsonPatchObj("gender", gender));
    if (birthDate) json.push(getJsonPatchObj("birthdate", birthDate));
    if(isConfirmed)json.push(getJsonPatchObj("EmailConfirmed",isConfirmed));
    setIsLoading(true);
    if (json.length) {
      const result = await sendReq(
        `/Account/patient/${props.id}`,
        "patch",
        json
      );
      if (result.status === 200)
        Swal.fire({
          title: "Data has been updated successfully",
          icon: "success",
        });
      else if (result.data.userNameIsExist) {
        Swal.fire({
          title: "The username is already exist",
          icon: "error",
        });
      } else if (result.data.newEmailIsExist) {
        Swal.fire({
          title: "The email is already exist",
          icon: "error",
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="container p-5">
      <form
        className="form-control p-5 "
        onSubmit={async (e) => await submitForm(e)}
        id="add-doctor-form"
      >
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="form-control"
              id="firstName"
              defaultValue={data.firstName}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              id="lastName"
              defaultValue={data.lastName}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Username</span>
            </div>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
              id="userName"
              defaultValue={data.userName}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Email</span>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              defaultValue={data.email}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Password</span>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Gender</span>
            </div>
            <select
              onChange={(e) => setGender(e.target.value)}
              id="gender"
              className="form-control"
              defaultValue={data.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Birthdate</span>
            </div>
            <input
              onChange={(e) => setBirthDate(e.target.value)}
              type="date"
              id="dateOnly"
              className="form-control"
              defaultValue={data.birthdate}
            />
          </div>
        </div>
        <div className="form-group mt-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Is Confirmed</span>
            </div>
            <select
              onChange={(e) => setIsConfirmed(e.target.value)}
              id="confirmed"
              className="form-control"
              defaultValue={data.emailConfirmed.toString()}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-outline-primary form-control mt-3 d-flex justify-content-center gap-1 align-items-center"
          id="addDoctor"
        >
          Update Patient
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
  );
}
