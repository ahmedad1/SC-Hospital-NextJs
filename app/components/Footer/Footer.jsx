
export default function Footer() {
  return (
    <section className="mt-5 z-3 position-relative">
      <footer className="text-center text-white" style={{backgroundColor: "#0a4275"}}>
        <div className="container p-4 pb-0">
          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Developed by <a href="https://www.linkedin.com/in/ahmed-omar-765a43245/" target={"_blank"} style={{textDecoration:"none"}} className="text-light">Ahmed Omar</a></span>
              
            </p>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
        >
          © 2024 Copyright :&nbsp;
          <a className="text-white" href="/">
            SCHospital.com
          </a>
        </div>
      </footer>
    </section>
  );
}
