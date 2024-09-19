import React from "react";
import Image from "next/image";
import "./FeaturesSection.css";
import analysis from "@/app/public/analysis.jpg";
import bonedept from "@/app/public/bonedept.jpg";
import braindept from "@/app/public/braindept.jpg";
import Dental from "@/app/public/Dental.webp";
import EyeDepart from "@/app/public/EyeDepart.jpg";
import internalmedicine from "@/app/public/internalmedicine.jpg";
import Link from "next/link";
export default function FeaturesSection({ className, isAuth }) {
  return (
    <>
      <section
        className={`container ${className ?? ""}`}
        style={{ transform: "scale(.9)" }}
        id="serv"
      >
        <div className="features container d-flex flex-column align-items-center mt-5">
          <h3>Services & Features</h3>
          <p className="text-center">
            All departments with many professional doctors and you can book an
            appointment{" "}
          </p>
          <div className="row container">
            <Link
              href={isAuth ? "/department/Dental" : `#UnAuth`}
              className="col-lg-4 col-md-6 col-12"
              data-bs-toggle={!isAuth&&"modal"}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <Image
                  src={Dental}
                  className="card-img-top feature"
                  alt="reload the page"
                />
                <div className="card-body ">
                  <h6 className="card-title text-primary">
                    Department of Dental
                  </h6>
                  <div className="card-text text-muted">
                    Many Professional & Experts Dentists For Diagnose Your Teeth
                    And Trying To Getting Rid of Your toothache
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href={isAuth ? "/department/Opthalmology" : "#UnAuth"}
              className="col-lg-4 col-md-6 col-12"
              data-bs-toggle={!isAuth&&"modal"}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <Image
                  src={EyeDepart}
                  className="card-img-top feature "
                  alt="reload the page"
                />
                <div
                  className="card-body mt-lg-3"
                  style={{ marginTop: "-.4em" }}
                >
                  <h6 className="card-title text-primary">
                    Department of Opthalmology
                  </h6>
                  <div className="card-text text-muted">
                    Many Professional & Experts Optometrists For Diagnose Your
                    Eyes And Trying To Getting Rid of Your week looking
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href={isAuth ? "/department/Internal_Medicine" : "#UnAuth"}
              className="col-lg-4 col-md-6 col-12"
              data-bs-toggle={!isAuth&&"modal"}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <Image
                  src={internalmedicine}
                  className="card-img-top feature"
                  alt="reload the page"
                />
                <div className="card-body">
                  <h6 className="card-title text-primary">
                    Department of Internal Medicine
                  </h6>
                  <div className="card-text text-muted">
                    Many Professional & Experts Doctors For Diagnose Your Body
                    And Trying To Getting Rid of Your Viruses & Cough
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href={isAuth ? "/department/Orthopedic" : "#UnAuth"}
              className="col-lg-4 col-md-6 col-12"
              data-bs-toggle={!isAuth&&"modal"}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <Image
                  src={bonedept}
                  className="card-img-top feature "
                  style={{ height: "13.5em" }}
                  alt="reload the page"
                />
                <div className="card-body mt-2 ">
                  <h6 className="card-title text-primary">
                    Department of Orthopedic
                  </h6>
                  <div className="card-text text-muted">
                    Many Professional & Experts Orthopedists For Diagnose Your
                    Bones And Trying To Treat broken bones
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href={isAuth ? "/department/Analysis" : "#UnAuth"}
              data-bs-toggle={!isAuth&&"modal"}
              className="col-lg-4 col-md-6 col-12 analysisanchor"
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <Image
                  src={analysis}
                  className="card-img-top feature "
                  alt="reload the page"
                />
                <div className="card-body mt-4">
                  <h6 className="card-title text-primary">
                    Analysis & Radiology Department
                  </h6>
                  <div className="card-text text-muted">
                    Many Professional & Experts Lab Doctors For Making Sevral
                    Tests For You And Trying To Get The Most Accurate Possible
                    Results
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href={isAuth ? "/department/Neurology" : "#UnAuth"}
              className="col-lg-4 col-md-6 col-12"
              data-bs-toggle={!isAuth&&"modal"}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <Image
                  src={braindept}
                  className="card-img-top feature"
                  alt="reload the page"
                />
                <div className="card-body mt-2">
                  <h6 className="card-title text-primary">
                    Department of Neurology
                  </h6>
                  <div className="card-text text-muted">
                    Many Professional & Experts Neurologist For Diagnose Your
                    Brain And Trying To Keep Your Brain Cells Healthy
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <div
        className="modal fade"
        id="UnAuth"
        tabIndex="-1"
        aria-labelledby="UnAuth"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="UnAuth">
                Unauthenticated
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-danger">You must login first</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
