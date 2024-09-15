import { cookies } from "next/headers";


export default function checkCookies() {
    if(cookies().get("refreshToken")&&cookies().get("email")&&cookies().get("role")&&cookies().get("birthDate")&&cookies().get("firstName")&&cookies().get("lastName")&&cookies().get("userName"))
        return cookies().get("role").value
    return false
  
}
