"use client";
import Link from "next/link";
import "../Admin.css";
import { useRef } from "react";
export default function AsideAdmin() {
  const patientRef = useRef();
  const doctorRef = useRef();

  return (
    <aside className="aside-admin col-lg-1 col-12 pe-0 ">
      <ul className="list-unstyled bg-light h-100">
        <li className="nav-item item-aside text-center pt-2 ">
          <Link
            ref={patientRef}
            href="/patients"
            onClick={(e) => {
              if (!e.target.classList.contains("active-aside")) {
                doctorRef.current.classList.remove("active-aside");

                e.target.classList.add("active-aside");
              }
            }}
            className={`d-flex align-items-center justify-content-center patient-sidebar active-aside list-group-item  list-group-item-action  `}
            style={{ border: "none", borderRadius: "0" }}
          >
            Patients
          </Link>
        </li>
        <li className="nav-item item-aside text-center">
          <Link
            onClick={(e) => {
              if (!e.target.classList.contains("active-aside")) {
                patientRef.current.classList.remove("active-aside");
                e.target.classList.add("active-aside");
              }
            }}
            ref={doctorRef}
            href="/doctors"
            className={
              "d-flex align-items-center justify-content-center  doctor-sidebar  list-group-item list-group-item-action bg-light"
            }
            style={{ border: "none", borderRadius: "0" }}
          >
            Doctors
          </Link>
        </li>
      </ul>
    </aside>
  );
}
