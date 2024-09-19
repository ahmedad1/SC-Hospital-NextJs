import React from 'react'
import UpdateDoctor from '../../components/Home/Auth/Admin/UpdateDoctor/UpdateDoctor'

import checkDynamicRoute from '@/app/extra-services/checkDynamicRoute'

export default function page({params}) {
  checkDynamicRoute(params.doctorId)
  return (
    <UpdateDoctor id={params.doctorId}/>
  )
}
