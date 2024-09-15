
import "../Admin.css"
export default function PatientSection({ children }) {
  return (
    <>
      <section
        className="section col-lg-11 col-12 p-0 table-responsive ms-lg-0 ms-2 "
        style={{ paddingRight: "9.26px" }}
      >
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
              <th scope="col">Options</th>
              <th scope="col">Commit</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
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
