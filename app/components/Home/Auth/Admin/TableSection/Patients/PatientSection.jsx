import Link from "next/link";
import "../../Admin.css";
import FetchPatients from "./FetchPatients";
export default function PatientSection() {
  return (
    <>
      <section
        className="section col-lg-11 col-12 p-0 table-responsive ms-lg-0 ms-2 "
        style={{ paddingRight: "9.26px" }}
      >
        <Link href="/add-patient" className="btn btn-info form-control">
          Add Patient
        </Link>
        <table className="table ">
          <thead className="bg-primary text-light">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Birthdate</th>
              <th scope="col">Is Confirmed</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <FetchPatients />
          </tbody>
        </table>
      </section>
      <div className="modal fade" id="confirmDelete">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Alert</div>
              <button className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body text-info">
              Are you sure for deleteing this user
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary "
                id="confirmYes"
                data-dismiss="modal"
              >
                confirm
              </button>
              <button
                className="closemodal btn btn-secondary"
                data-dismiss="modal"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
