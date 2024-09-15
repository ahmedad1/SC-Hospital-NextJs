
import "./LandingSection.css"


export default function LandingSection() {
  return (
    <section
      className="landing d-flex justify-content-center align-items-center flex-column"
      style={{lineHeight:"2"}}
    >
      <h1 className="text-center text-primary " style={{fontWeight:"300"}}>
        Experience In All Medical Departments
      </h1>
      <p className=" text-wrap text-center"style={{color:"rgba(255,255,255,.2)"}}>
        Find good doctors and book appointment, You can find any
        departement, Join Us Now{" "}
      </p>
      <a className="btn btn-outline-warning" href="#sign-up">
        Join Us
      </a>
    </section>
  );
}
