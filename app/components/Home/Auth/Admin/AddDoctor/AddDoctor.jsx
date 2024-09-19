"use client";

import isValidImage from "@/app/extra-services/isValidImage";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function AddDoctor() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [isConfirmed, setIsConfirmed] = useState("true");
  const [department, setDepartment] = useState("Dental");
  const [price, setPrice] = useState(null);
  const [bio, setBio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const profilePictureRef = useRef();
  const sendReq = useSendAuthRequest();
  async function submitForm(e) {
    e.preventDefault();
    if (isLoading) return;
    if (!isValidImage(profilePictureRef)) return;
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("UserName", userName);
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("Birthdate", birthDate);
    formData.append("Gender", gender);
    formData.append("EmailConfirmed", isConfirmed);
    formData.append("department", department);
    formData.append("price",price)
    if(bio)
    formData.append("biography",bio)
    if (profilePictureRef.current.files[0])
      formData.append("ProfilePicture", profilePictureRef.current.files[0]);
    setIsLoading(true);
    const res = await sendReq("/Account/new-doctor-account", "post", formData);
    setIsLoading(false);
    if (res.status === 200)
      Swal.fire({ title: "Added Successfully", icon: "success" });
    else if (res.status === 400) {
      if (res.data.alreadyExistField) {
        Swal.fire({
          title: `${res.data.alreadyExistField} is already registered`,
          icon: "error",
        });
      }
    }
  }
  return (
    <div class="container p-5">
      <form
        class="form-control p-5 "
        onSubmit={async (e) => await submitForm(e)}
        id="add-doctor-form"
      >
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">First Name</span>
            </div>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              class="form-control"
              id="firstName"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              class="form-control"
              id="lastName"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Username</span>
            </div>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              class="form-control"
              id="userName"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Email</span>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              class="form-control"
              id="email"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Password</span>
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              class="form-control"
              id="password"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Gender</span>
            </div>
            <select
              onChange={(e) => setGender(e.target.value)}
              id="gender"
              class="form-control"
              defaultValue={"Male"}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Birthdate</span>
            </div>
            <input
              onChange={(e) => setBirthDate(e.target.value)}
              type="date"
              id="dateOnly"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Price of booking</span>
            </div>
            <input
              onChange={(e) => setPrice(e.target.value)}
              required
              step={0.1}
              type="number"
              id="price"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group mt-4">
          <label class="form-label">Biography (Optional)</label>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Department Name</span>
            </div>
            <select
              onChange={(e) => setDepartment(e.target.value)}
              id="departmentName"
              class="form-control"
              defaultValue={"Dental"}
            >
              <option value="Dental">Dental</option>
              <option value="Opthalmology">Opthalmology</option>
              <option value="Internal_Medicine">Internal Medicine</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Analysis">Analysis & Radiology</option>
              <option value="Neurology">Neurology</option>
            </select>
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Is Confirmed</span>
            </div>
            <select
              onChange={(e) => setIsConfirmed(e.target.value)}
              id="confirmed"
              class="form-control"
              defaultValue={"true"}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>
        <div class="form-group mt-4">
          <label class="form-label">Profile Picture (Optional)</label>

          <input
            ref={profilePictureRef}
            type="file"
            accept="image/*"
            id="image"
            class="form-control mt-1"
          />
        </div>

        <button
          type="submit"
          class="btn btn-outline-primary form-control mt-3 d-flex justify-content-center gap-1 align-items-center"
          id="addDoctor"
        >
          Add Doctor
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
