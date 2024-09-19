import UpdateShift from '@/app/components/Home/Auth/Admin/ScheduleOfDoctor/UpdateShift/UpdateShift'
import checkDynamicRoute from '@/app/extra-services/checkDynamicRoute'
import { redirect } from 'next/navigation'
import React from 'react'

export default function page({params}) {
    checkDynamicRoute(params.shiftId)

   

    
  return (
    <UpdateShift shiftId={params.shiftId}/>
  )
}
