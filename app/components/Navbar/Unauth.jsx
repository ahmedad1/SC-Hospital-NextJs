import Link from "next/link";
import React from "react";

export default function Unauth() {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light ">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand text-primary">
          S.C Hospital
        </Link>

        <Link href="#N" data-bs-toggle="collapse" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </Link>

        <div className="collapse navbar-collapse" id="N">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#about" className="nav-link">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#serv" className="nav-link">
                Services
              </Link>
            </li>
          </ul>
          <Link
            href="#login"
            className=" btn btn-outline-primary ml-lg-2 mt-sm-3 mt-lg-0  "
            style={{ maxWidth: "78px" }}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
