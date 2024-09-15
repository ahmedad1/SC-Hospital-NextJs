import Image from "next/image";
import userSolid from "@/app/public/user-solid.svg"
import Link from "next/link";
import { cookies } from "next/headers";
import SignOutBtn from "../../SignOutBtn/SignOutBtn";
export default function NavPatient() {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light position-relative z-3 ">
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

            <li className="nav-item">
              <Link href="#appo" className="nav-link appoints">
                Appointments
              </Link>
            </li>
          </ul>
          <div
            className="nav-link d-flex p-0 mt-lg-0 mt-3"
            style={{ gap: "5px" }}
          >
            <Image
              src={userSolid}
              className="ms-lg-2 mt-1 "
              width="15"
              alt="reload the page"
            />
            <Link href="/profile-settings" className="text-muted text-decoration-none usernamespan">
              {cookies().get("firstName").value}
            </Link>
          </div>
          <SignOutBtn/>
        </div>
      </div>
    </nav>
  );
}
