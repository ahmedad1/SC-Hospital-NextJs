import Department from '@/app/components/Home/Auth/Patient/Department/Department'
import { redirect } from 'next/navigation'
import React from 'react'

export default function page({params}) {
  if(!/^(Dental|Opthalmology|Internal_Medicine|Orthopedic|Analysis|Neurology)/i.test(params.departmentName))
    redirect("/none-existant-page")
  return (
    <>
    <Department department={params.departmentName}/>
    </>
  )
}
