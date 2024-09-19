"use client";
import LoadingComponent from "@/app/components/LoadingComponent";
import { days } from "@/app/extra-services/constants";
import convertTimeTo12HoursBased from "@/app/extra-services/convertTimeTo12HoursBased";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Schedule(props) {
    const sendReq=useSendAuthRequest()
    const [data,setData]=useState(null)
    useEffect(_=>{
        sendReq(`/Account/${props.id}/schedules`).then(res=>{
            if(res.status===200){
                setData(res.data)
            }else{
                Swal.fire({title:"Something went wrong",icon:"error"})
            }
        })   
    },[])
    async function DeleteHandler(shiftId) {
        const ans=await Swal.fire({title:"Are you sure you want to delete this",icon:"question",showCancelButton:true,confirmButtonText:"Yes"})
        if(ans.isDenied||ans.isDismissed)
            return
        const res=await sendReq(`/Account/doctor/schedule/${shiftId}`,"delete")
        if(res.status===200)
        {
            Swal.fire({title:"Deleted Successfully",icon:"success"})
           
            
            const newData=data.filter(x=>x.shiftId!==shiftId)
            setData(newData)
        }
        else{
            Swal.fire({title:"Something went wrong",icon:"error"})
        }
    }
    if(data===null){
        return <LoadingComponent/>
    }
  return (
    <>
      <section
        className="section p-0 table-responsive ms-lg-0 ms-2 vh-100"
        style={{ paddingRight: "9.26px" }}
      >
        <Link href={`/${props.id}/add-shift`} className="btn btn-info form-control">
          Add Shift
        </Link>

        <table className="table ">
          <thead className="bg-primary text-light">
            <tr>
              <th scope="col"style={{textAlign:"center"}}>Day</th>
              <th scope="col"style={{textAlign:"center"}}>Start Time</th>
              <th scope="col"style={{textAlign:"center"}}>End Time</th>
              <th scope="col"style={{textAlign:"center"}}>Update</th>
              <th scope="col"style={{textAlign:"center"}}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map(e=>{
                    return(
                        <tr key={e.shiftId}>
                            <td className="text-center">{days[e.day]}</td>
                            <td className="text-center">{convertTimeTo12HoursBased(e.startTime)}</td>
                            <td className="text-center">{convertTimeTo12HoursBased(e.endTime)}</td>
                            <td className="text-center"><Link href={`/shift/${e.shiftId}`} className="btn btn-outline-primary">Update</Link></td>
                            <td className="text-center"><button onClick={async ev=>await DeleteHandler(e.shiftId)} className="btn btn-outline-danger">Delete</button></td>
                        </tr>
                    )
                })
            }

          </tbody>
        </table>
      </section>
    </>
  );
}
