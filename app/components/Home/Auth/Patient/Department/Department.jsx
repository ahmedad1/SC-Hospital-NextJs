import DoctorsOfDept from "./DoctorsOfDept";




export default function Department(props) {

  function capitalize(str){
    const uppered=str[0].toUpperCase()
    return uppered+str.slice(1)
  }
  return (
    <div class="container mt-5">
      <div class="text-center text-primary">
        <h4> Department Of {capitalize(props.department)} </h4>
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
