"use client";
import { useRef, useState } from "react";
import Unsensitive from "./Unsensitive/Unsensitive";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import Swal from "sweetalert2";

export default function ProfileSettings() {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const newPasswordRef=useRef()
  const sendReq = useSendAuthRequest();
  async function submitPassword(e) {
    e.preventDefault();
    const response = await sendReq("/Account/password", "post", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    if(response.status==200){
      Swal.fire({title:"Updated Successfully",icon:"success"})
    }
    else{
      Swal.fire({title:"Old password you entered is wrong",icon:"error"})
    }
  }
  return (
    <>
      <div className="container align-items-center ">
        <h4 className="mt-5 text-primary" style={{ fontSize: "1.9em" }}>
          Profile Settings
        </h4>
        <form onSubmit={async e=>await submitPassword(e)} className="form-control px-5 p-5 mt-5 passwordChangingForm">
          <label htmlFor="oldPassword" className="text-muted mt-2">
            Old Password
          </label>
          <input
            onChange={e=>setOldPassword(e.target.value)}
            type="password"
            id="oldPassword"
            required
            className="form-control mt-2"
          />

          <label htmlFor="newPassword" className="text-muted mt-2">
            New Password
          </label>
          <input
            onChange={e=>setNewPassword(e.target.value)}
            ref={newPasswordRef}
            type="password"
            id="newPassword"
            className="form-control mt-2"
            required
            maxLength="100"
            minLength="8"
          />
          <input type="checkbox"onChange={e=>newPasswordRef.current.type=e.target.checked?"text":"password"} id="showNewPass" className="mt-2" />
          <label htmlFor="showNewPass" className="mt-2 ms-1">
            Show New Password
          </label>
          <br />
          <button
            type="submit"
            className="btn btn-outline-primary mt-3 saveNewPassword"
          >
            Save
          </button>
        </form>
        <Unsensitive />
      </div>
    </>
  );
}
