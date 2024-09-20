"use client";

import LoadingComponent from "@/app/components/LoadingComponent";
import { days } from "@/app/extra-services/constants";
import getJsonPatchObj from "@/app/extra-services/getJsonPatchObj";
import useSendAuthRequest from "@/app/extra-services/useSendAuthRequest";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function UpdateShift(props) {
  const [isLoading, setIsLoading] = useState();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [data,setData]=useState(null)
  const sendReq=useSendAuthRequest()
  useEffect(_=>{
    sendReq(`/Account/doctor/schedule/${props.shiftId}`).then(res=>{
        if(res.status===200){
            setData(res.data)
        }
        else{
            Swal.fire({title:"Something went wrong",icon:"error"})
        }
    })
  },[])
  if(data ===null){
    return(
        <LoadingComponent/>
    )
  }
  async function submitForm(e) {
    e.preventDefault()
    const json=[]
    if(startTime)
      json.push(getJsonPatchObj("startTime",startTime))
    if(endTime)
      json.push(getJsonPatchObj("endTime",endTime))
    if(day)
      json.push(getJsonPatchObj("day",day))
    if(json.length===0)
      return
    setIsLoading(true)
    const res=await sendReq(`/Account/doctor/schedule/${props.shiftId}`,"patch",json)
    setIsLoading(false)
    if(res.status===200)
      Swal.fire({title:"Updated Successfully",icon:"success"})
    else{
      if(res.data.dayIsRepeated){
        Swal.fire({title:"Day is already exists",icon:"error"})
      }else
       Swal.fire({title:"Something went wrong",icon:"error"})
    }

  }
  return (
    <div class="container p-5 d-flex justify-content-center align-items-center vh-100">
      <form
        class="form-control p-5 "
        onSubmit={async (e) => await submitForm(e)}
        id="add-patient-form"
      >
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Day</span>
            </div>
            <select required defaultValue={days[data.day]} onChange={e=>setDay(e.target.value)} className="form-select">
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">StartTime</span>
            </div>
            <input
              type="time"
              defaultValue={data.startTime}
              onChange={(e) => setStartTime(e.target.value)}
              class="form-control"
              id="startTime"
              required
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">EndTime</span>
            </div>
            <input
              type="time"
              defaultValue={data.endTime}
              onChange={(e) => setEndTime(e.target.value)}
              class="form-control"
              id="endTime"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-outline-primary form-control mt-3 d-flex justify-content-center gap-1 align-items-center"
          id="addShift"
        >
          Update Shift
          {isLoading && (
            <Oval
              visible={true}
              height="18"
              width="18"
              color="#0d6efd"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperclassName="mt-1 ms-1"
            />
          )}
        </button>
      </form>
    </div>
  );
}
