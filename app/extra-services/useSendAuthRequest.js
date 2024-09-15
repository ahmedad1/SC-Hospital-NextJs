import axios from 'axios'

import { BACKEND_BASEURL, WITH_CREDENTIALS } from './constants'
import { useRouter } from 'next/navigation'
import Cookies from "cookie-universal"

export default function useSendAuthRequest() {
    const router=useRouter()
    const cookies=Cookies()
    return async function sendRequest(pathAfterApi,method="get",data=null){
        try{
        const response=await axios({url:`${BACKEND_BASEURL}api${pathAfterApi}`,method:method,data:data,withCredentials:WITH_CREDENTIALS})
        return response;
        }
        catch(e){
            if(e.response.status===401){
                try{
                    await axios.post(`${BACKEND_BASEURL}api/Account/tokens`,null,{withCredentials:WITH_CREDENTIALS})
                    return await sendRequest(pathAfterApi,method,data)
                }
                catch(ex){
                    if(ex.response.status===401){
                        cookies.removeAll()
                        router.replace("/")
                        router.refresh()
                        return 
                    }

                }
            }
            return e.response
        }
    }
}
