import React from "react";
import Image from "next/image";
import "./FeaturesSection.css";
import analysis from "@/app/public/analysis.jpg";
import bonedept from "@/app/public/bonedept.jpg";
import braindept from "@/app/public/braindept.jpg";
import Dental from "@/app/public/Dental.webp";
import EyeDepart from "@/app/public/EyeDepart.jpg";
import internalmedicine from "@/app/public/internalmedicine.jpg";
export default function FeaturesSection({className}) {
  return (
    <section className={`container ${className??""}`} style={{transform:"scale(.9)"}} id="serv">
      <div className="features container d-flex flex-column align-items-center mt-5">
        <h3>Services & Features</h3>
        <p className="text-center">
          All departments with many professional doctors and you can book an
          appointment{" "}
        </p>
        <div className="row container">
          <a
            href="dentistdep.html"
            className="col-lg-4 col-md-6 col-12"
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <Image src={Dental} className="card-img-top feature" alt="reload the page" />
              <div className="card-body ">
                <h6 className="card-title text-primary">Department of Dental</h6>
                <div className="card-text text-muted">
                  Many Professional & Experts Dentists For Diagnose Your Teeth
                  And Trying To Getting Rid of Your toothache
                </div>
              </div>
            </div>
          </a>
          <a
            href="eyedep.html"
            className="col-lg-4 col-md-6 col-12"
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <Image
                src={EyeDepart}
                className="card-img-top feature "
                alt="reload the page"
              />
              <div className="card-body mt-lg-3" style={{ marginTop: "-.4em" }}>
                <h6 className="card-title text-primary">Department of Ophthalmology</h6>
                <div className="card-text text-muted">
                  Many Professional & Experts Optometrists For Diagnose Your
                  Eyes And Trying To Getting Rid of Your week looking
                </div>
              </div>
            </div>
          </a>
          <a
            href="internal.html"
            className="col-lg-4 col-md-6 col-12"
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <Image
                src={internalmedicine}
                className="card-img-top feature"
                alt="reload the page"
              />
              <div className="card-body">
                <h6 className="card-title text-primary">Department of Internal Medicine</h6>
                <div className="card-text text-muted">
                  Many Professional & Experts Doctors For Diagnose Your Body And
                  Trying To Getting Rid of Your Viruses & Cough
                </div>
              </div>
            </div>
          </a>
          <a
            href="bones.html"
            className="col-lg-4 col-md-6 col-12"
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
                <h6 className="card-title text-primary">Department of Orthopedic</h6>
                <div className="card-text text-muted">
                  Many Professional & Experts Orthopedists For Diagnose Your
                  Bones And Trying To Treat broken bones
                </div>
              </div>
            </div>
          </a>
          <a
            href="#exampleModal"
            data-bs-toggle="modal"
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
                <h6 className="card-title text-primary">Analysis & Radiology Department</h6>
                <div className="card-text text-muted">
                  Many Professional & Experts Lab Doctors For Making Sevral
                  Tests For You And Trying To Get The Most Accurate Possible
                  Results
                </div>
              </div>
            </div>
          </a>
          <a
            href="brain.html"
            className="col-lg-4 col-md-6 col-12"
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <Image
                src={braindept}
                className="card-img-top feature"
                alt="reload the page"
              />
              <div className="card-body mt-2">
                <h6 className="card-title text-primary">Department of Neurology</h6>
                <div className="card-text text-muted">
                  Many Professional & Experts Neurologist For Diagnose Your
                  Brain And Trying To Keep Your Brain Cells Healthy
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
