"use client";
import { useRef, useState } from "react";
import Unsensitive from "./Unsensitive/Unsensitive";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

export default function ProfileSettings() {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const newPasswordRef = useRef();
  const [passwordLoader, setPasswordLoader] = useState(false);
  const [passwordIsVisible,setPasswordIsVisible]=useState(false)
  const sendReq = useSendAuthRequest();
  async function submitPassword(e) {
    e.preventDefault();
    if(passwordLoader)
      return
    setPasswordLoader(true)
    const response = await sendReq("/Account/password", "post", {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    setPasswordLoader(false)
    if (response.status == 200) {
      Swal.fire({ title: "Updated Successfully", icon: "success" });
    } else {
      Swal.fire({ title: "Old password you entered is wrong", icon: "error" });
    }
  }
  return (
    <>
      <div className="container align-items-center ">
        <h4 className="mt-5 text-primary" style={{ fontSize: "1.9em" }}>
          Profile Settings
        </h4>
        <form
          onSubmit={async (e) => await submitPassword(e)}
          className="form-control px-5 p-5 mt-5 passwordChangingForm"
        >
          <label htmlFor="oldPassword" className="text-muted mt-2">
            Old Password
          </label>
          <input
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            id="oldPassword"
            required
            className="form-control mt-2"
          />

          <label htmlFor="newPassword" className="text-muted mt-2">
            New Password
          </label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            ref={newPasswordRef}
            type={passwordIsVisible?"text":"password"}
            id="newPassword"
            className="form-control mt-2"
            required
            maxLength="100"
            minLength="8"
          />
          <input
            type="checkbox"
            onChange={(e) => {
              setPasswordIsVisible ( e.target.checked);
            }}
            id="showNewPass"
            className="mt-2"
          />
          <label htmlFor="showNewPass" className="mt-2 ms-1">
            Show New Password
          </label>
          <br />
          <button
            type="submit"
            className="btn btn-outline-primary mt-3 saveNewPassword d-flex justify-content-center gap-1 align-items-center"
            disabled={passwordLoader}
          >
            Save
            {passwordLoader && (
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
        <Unsensitive />
      </div>
    </>
  );
}
