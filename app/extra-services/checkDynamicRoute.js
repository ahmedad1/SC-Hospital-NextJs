import { redirect } from 'next/navigation'

export default function checkDynamicRoute(valueOfDynamicRoute) {
    if(isNaN(valueOfDynamicRoute)){
        redirect("/non-existent-page")
        
    }
    return true

 
}
