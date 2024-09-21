"use client"

import LoadingComponent from "@/app/components/LoadingComponent"
import usePaginateFetch from "@/app/extra-services/usePaginateFetch"
import { useState } from "react"



export default function Doctor() {
  const [data,setData]=useState(null)
  usePaginateFetch("/Account/appointment","appointments",data,setData)
  if(data===null)
    return <LoadingComponent/>
  return (
    <>
     <section
        className="section col-lg-11 col-12 p-0 table-responsive ms-lg-0 ms-2 w-100 "
        style={{ paddingRight: "9.26px" }}
      >

        <table className="table "  style={{minHeight:"75vh"}}>
          <caption className="caption-top text-center bg-primary text-light">Bookers of today</caption>
          <thead className="bg-primary text-light">
            <tr>
              <th style={{textAlign:"center"}} scope="col">#</th>
              <th style={{textAlign:"center"}} scope="col">FirstName</th>
              <th style={{textAlign:"center"}} scope="col">LastName</th>
              <th style={{textAlign:"center"}} scope="col">Email</th>
              <th style={{textAlign:"center"}} scope="col">Date</th>
            
            </tr>
          </thead>
          <tbody>
            {data.map((e,i)=>{
              return(
              <tr  key={e.email+i}>
                <td style={{textAlign:"center"}}>{i+1}</td>
                <td style={{textAlign:"center"}}>{e.firstName}</td>
                <td style={{textAlign:"center"}}>{e.lastName}</td>
                <td style={{textAlign:"center"}}>{e.email}</td>
                <td style={{textAlign:"center"}}>{e.dateTime.split("T")[0]}</td>
              </tr>)
            })}
            
          </tbody>
        </table>
      </section>
    </>
  )
}
