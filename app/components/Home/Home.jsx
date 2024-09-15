import checkCookies from "@/app/extra-services/checkCookies";
import Patient from "./Auth/Patient/Patient";
import Unauth from "./Unauth/Unauth";
import Admin from "./Auth/Admin/Admin";


export default function Home() {
  const role=checkCookies()
  return (
    <>
    {role?(role==="Adm"?<Admin/>:<Patient/>):<Unauth/>}
    </>
  )
}
