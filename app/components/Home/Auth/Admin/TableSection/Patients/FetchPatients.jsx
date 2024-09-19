"use client";

import usePaginateFetch from "@/app/extra-services/usePaginateFetch";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function FetchPatients() {
  const sendReq = useSendAuthRequest();
  const [data, setData] = useState(null);
  const dataRef=useRef(data)
  useEffect(_=>{
    window.scrollTo({top:0,behavior:"instant"})

  },[])
  useEffect(_=>{
    dataRef.current=data
  })
  usePaginateFetch("/Account/patients","patients",dataRef,setData)
  const searchResult=useSelector(x=>x.searchResult)
  const event=  usePaginateFetch("/Account/patients","patients",dataRef,setData,true)

  useEffect(_=>{
  if(searchResult===false)
    window.onscroll=event
  return function(){
    window.onscroll=undefined
  }
  },[searchResult])


  if (data===null) {
    return (
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
    );
  }
  async function handleDelete(id){
    const ans=await Swal.fire({title:"Are you sure you want to delete this user?",icon:"question",showCancelButton:true,cancelButtonText:"Close",confirmButtonText:"Yes"})
    if(ans.isDismissed||ans.isDenied)
      return
    const response=await sendReq(`/Account/patients/${id}`,"delete")
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
      {(searchResult !==false?searchResult:data).map((e) => {
        return (
          <tr key={e.id}>
            <td>{e.firstName}</td>
            <td>{e.lastName}</td>
            <td>{e.userName}</td>
            <td>{e.email}</td>
            <td>{e.gender}</td>
            <td>{e.birthDate}</td>
            <td>{e.emailConfirmed.toString()}</td>
            <td>
              <Link href={`patient/${e.id}`} className="btn btn-outline-primary">Update</Link>
            </td>
            <td>
              <button onClick={async ev=>await handleDelete(e.id)} className="btn btn-outline-danger">Delete</button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
