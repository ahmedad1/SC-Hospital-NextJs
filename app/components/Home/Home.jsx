import checkCookies from "@/app/extra-services/checkCookies";
import Patient from "./Auth/Patient/Patient";
import Unauth from "./Unauth/Unauth";
import Doctor from "./Auth/Doctor/Doctor";


export default function Home() {
  const role=checkCookies()
 
  return (
    <>
    {role?(role==="Doc"?<Doctor/>:<Patient/>):<Unauth/>}
    </>
  )
}
