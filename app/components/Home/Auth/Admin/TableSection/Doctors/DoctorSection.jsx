import Link from "next/link";
import "../../Admin.css";
import FetchDoctors from "./FetchDoctors";


export default function DoctorSection() {

  return (
    <>
      <section
        className="section col-lg-11 col-12 p-0 table-responsive ms-lg-0 ms-2 "
        style={{ paddingRight: "9.26px" }}
      >
        <Link
          href="/add-doctor"
          className="btn btn-info form-control"
        >
          Add Doctor
        </Link>

        <table className="table ">
          <thead className="bg-primary text-light">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">BirthDate</th>
              <th scope="col">EmailConfirmed</th>
              <th scope="col">Department</th>
              <th scope="col">Schedule</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody><FetchDoctors/></tbody>
        </table>
      </section>
    </>
  );
}
