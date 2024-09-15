import Image from "next/image";
import doctor from "@/app/public/doctor-14044.png";
import "./Landing.css";
import ParticlesComponent from "../Particles/ParticlesComponent";

export default function Landing() {
  return (
    <>
      <ParticlesComponent />

      <div className="container landd " style={{ position: "relative" }}>
        <div className="row mt-5 justify-content-between">
          <div className="col-lg-6 col-12 align-self-center text-center">
            <h3 className="text-primary wrapp z-2">
              Experience In All Medical Departments
            </h3>
            <p className="mt-3 text-muted " style={{ lineHeight: "1.6" }}>
              Search on best doctors and book appointment, You can find any
              departement , High efficiency, easy payment and instant booking
              Regular appointments{" "}
            </p>
            <a className="btn btn-warning z-2 position-relative " href="#serv">
              Departments
            </a>
          </div>
          <div className="col-lg-6 col-12 d-flex justify-content-center">
            <Image
              alt="reload the page"
              height="480"
              className="mt-lg-0 land z-3"
              style={{ marginTop: "3rem" }}
              src={doctor}
            />
          </div>
        </div>
      </div>
    </>
  );
}
