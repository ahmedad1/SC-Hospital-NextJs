"use client"

import usePaginateFetch from "@/app/extra-services/usePaginateFetch";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


export default function FetchDoctors() {
  const [data,setData]=useState(null);
  const sendReq=useSendAuthRequest()
  const dataRef=useRef(data)
  const searchResult=useSelector(x=>x.searchResult)
  useEffect(_=>{
    dataRef.current=data
  })
  const event=usePaginateFetch("/Account/doctors","doctors",dataRef,setData,true)

  useEffect(_=>{
    if(searchResult===false)
      window.onscroll=event
    return function(){
      window.onscroll=undefined
    }
    },[searchResult])
  usePaginateFetch("/Account/doctors","doctors",dataRef,setData)

 
  if(data ===null){
    return<>
    <tr className="position-relative ms-5"style={{height:"90vh",border:"none"}}>
    <td style={{border:"none"}} className="d-flex mt-2 ms-5 justify-content-center gap-1 align-items-center display-4 position-absolute top-0">
      Loading
      <Oval
        visible={true}
        height="50"
        width="50"
        color="#0d6efd"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperclassName="mt-2 ms-1"
      />
    </td>
  </tr>
  </>
  }
  async function handleDelete(id){
    const ans=await Swal.fire({title:"Are you sure you want to delete this user?",icon:"question",showCancelButton:true,cancelButtonText:"Close",confirmButtonText:"Yes"})
    if(ans.isDismissed||ans.isDenied)
      return
    const response=await sendReq(`/Account/doctors/${id}`,"delete")
    if(response.status===200)
    {
      Swal.fire({title:"Deleted Successfully",icon:"success"})
      const newData=data.filter(e=>e.id!==id)
      setData(newData)
    }
    else{
      Swal.fire({title:"Something went wrong",icon:"error"})

    }
  }
  return (
    <>
    {(searchResult!==false?searchResult:data).map(x=>{
      return(
        <tr key={x.id}>
          <td>{x.firstName}</td>
          <td>{x.lastName}</td>
          <td>{x.userName}</td>
          <td>{x.email}</td>
          <td>{x.gender}</td>
          <td>{x.birthDate}</td>
          <td>{x.emailConfirmed.toString()}</td>
          <td>{x.departmentName}</td>
          <td>{x.price}</td>
          <td>{x.biography.length>10?x.biography.slice(0,10)+"...":x.biography}</td>
          <td><Link href={`/${x.id}/schedule`} className="btn btn-outline-primary">Schedule</Link></td>
          <td><Link href={`/doctor/${x.id}`} className="btn btn-outline-primary">Update</Link></td>
          <td><button onClick={async e=>await handleDelete(x.id) } className="btn btn-outline-danger">Delete</button></td>

        </tr>

      )

    })}
    </>
  )
}
