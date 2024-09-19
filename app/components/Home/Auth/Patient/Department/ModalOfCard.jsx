import React from "react";

export default function ModalOfCard(props) {
  return (
    <div
      class="modal fade"
      id={props.data.firstName+props.data.id.toString()}
      tabIndex="-1"
      aria-labelledby={props.data.id.toString()}
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Dr.{props.data.firstName + " " + props.data.lastName}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <span className="text-muted " style={{ fontFamily: "auto" }}>
              {props.data.biography}
            </span>
            <hr />
            <p className=" text-info mt-3  mb-0">
              Available All Days From 10:00 Am To 10:00 Pm
            </p>
            <hr />
            <p className="text-primary">Book now any time you want</p>
            <hr />
            <form action="">
              <div className="input-group">
                <span className="input-group-text">Choose The Day</span>
                <select className="form-select form-select-sm form-control">
                  <option>Choose A Day</option>
                  <option value="sat">Saturday</option>
                  <option value="sun">Sunday</option>
                  <option value="mon">Monday</option>
                  <option value="tue">Tuesday</option>
                  <option value="wed">Wednesday</option>
                  <option value="thu">Thursday</option>
                  <option value="fri">Friday</option>
                </select>
              </div>
              <input type="submit" className="d-none" />
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
