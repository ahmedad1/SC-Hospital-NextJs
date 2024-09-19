import Schedule from '@/app/components/Home/Auth/Admin/ScheduleOfDoctor/Schedule/Schedule'
import checkDynamicRoute from '@/app/extra-services/checkDynamicRoute'
import React from 'react'

export default function page({params}) {
  checkDynamicRoute(params.id)

    
  return (
    <Schedule id={params.id}/>
  )
}
