"use client"
import useSendAuthRequest from '@/app/extra-services/useSendAuthRequest'
import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import Swal from 'sweetalert2'

export default function AddShift(props) {
const [startTime,setStartTime]=useState("")
const [endTime,setEndTime]=useState("")
const [day,setDay]=useState("Sunday")
const [isLoading,setIsLoading]=useState(false);
const sendReq=useSendAuthRequest()
async function submitForm(e){
e.preventDefault()
setIsLoading(true)
const result=await sendReq(`/Account/${props.id}/schedule`,"post",{
    day:day,
    startTime:startTime,
    endTime:endTime
})
if(result.status===200)
    Swal.fire({title:"Added Successfully",icon:"success"})
else Swal.fire({title:"Something went wrong",icon:"error"})

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
           <select onChange={e=>setDay(e.target.value)} required className="form-select">
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
          Add Shift
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
  )
}
