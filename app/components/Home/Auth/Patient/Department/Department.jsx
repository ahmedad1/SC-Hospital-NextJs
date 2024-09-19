import DoctorsOfDept from "./DoctorsOfDept";




export default function Department(props) {


  return (
    <div class="container mt-5">
      <div class="text-center text-primary">
        <h4> Department Of {props.department} </h4>
        <small class="text muted text-dark" style={{ letterSpacing: "2px" }}>
          Many Professionals & Experts Doctors
        </small>
      </div>
      <div class="row mt-5">
        <DoctorsOfDept department={props.department}/>
      </div>
    </div>
  );
}
