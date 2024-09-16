"use client";

import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function FetchPatients() {
  const sendReq = useSendAuthRequest();
  const [data, setData] = useState(null);
  useEffect((_) => {
    sendReq("/Account/patients?page=1")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        Swal.fire({ title: "Something went wrong", icon: "error" });
      });
  }, []);

  if (data==null) {
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
      {data.map((e) => {
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
              <button className="btn btn-outline-primary">Update</button>
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
