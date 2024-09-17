import React from 'react'
import UpdateDoctor from '../../components/Home/Auth/Admin/UpdateDoctor/UpdateDoctor'

export default function page({params}) {
  return (
    <UpdateDoctor id={params.doctorId}/>
  )
}
