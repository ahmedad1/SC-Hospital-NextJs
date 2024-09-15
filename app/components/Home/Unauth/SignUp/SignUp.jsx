import React from "react";

export default function SignUp() {
  return (
    <div className="container mt-5" id="sign-up">
      <div id="contact" className="d-flex justify-content-center">
        <h3>Sign Up</h3>
      </div>
      <form action="" method="post" className="form-control p-5 mt-4 formsignup">
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              name="fname"
              type="text"
              className="form-control"
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
            <input name="bDate" type="date" required className="form-control" />
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
            />
            <label htmlFor="Male" className="d-flex align-items-center mb-0 ms-2 ">
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="Female"
              className="ms-2"
              value="Female"
              required
            />
            <label htmlFor="Female" className="d-flex align-items-center mb-0 ms-2 ">
              Female
            </label>
          </div>
        </div>
        <div className="form-check mt-3">
          <input type="checkbox"  id="showPassSignUp" className="form-check-input " />
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
          className="btn btn-outline-primary w-100 mt-2 signUpBtn"
        >
          Create My Account
        </button>
      </form>
    </div>
  );
}
