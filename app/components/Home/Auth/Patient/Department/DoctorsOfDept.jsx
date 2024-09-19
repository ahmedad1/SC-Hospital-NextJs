"use client";
import LoadingComponent from "@/app/components/LoadingComponent";
import usePaginateFetch from "@/app/extra-services/usePaginateFetch";
import Image from "next/image";
import Link from "next/link";
import doctorImage from "@/app/public/doctor.webp";
import doctoressImage from "@/app/public/doctoress.webp";
import React, { useState } from "react";
import ModalOfCard from "./ModalOfCard";

export default function DoctorsOfDept(props) {
  const [data, setData] = useState(null);
  usePaginateFetch(
    `/Account/department/doctors?department=${props.department}`,
    "departmentPage",
    data,
    setData,
    false,
    "&"
  );
  if (data === null) {
    return <LoadingComponent />;
  }
  return (
    <>
      {data.map((e) => {
        return (
          <>
            <Link
              href={"#" + e.firstName + e.id}
              key={e.id}
              data-bs-toggle="modal"
              className="col-lg-3 col-md-4 col-6"
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <Image
                  src={e.gender === "Male" ? doctorImage : doctoressImage}
                  style={{ objectFit: "cover", height: "18em" }}
                  className="card-img-top"
                  alt="reload the page"
                />
                <div className="card-body">
                  <h6 className="card-title">
                    Dr.{e.firstName + " " + e.lastName}{" "}
                  </h6>
                  <p className="card-text text-muted">
                    {e.biography.length > 45
                      ? e.biography.slice(0, 45) + "..."
                      : e.biography}
                  </p>
                  <span className="text-success fs-5" style={{ fontSize: "19px" }}>
                    {e.price}EGP
                  </span>
                </div>

                <div className="btn btn-outline-primary">Book Now</div>
              </div>
            </Link>
            <ModalOfCard data={e} id={e.id} />
          </>
        );
      })}
    </>
  );
}
