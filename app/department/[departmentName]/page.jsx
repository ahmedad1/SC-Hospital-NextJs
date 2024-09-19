import Department from '@/app/components/Home/Auth/Patient/Department/Department'
import React from 'react'

export default function page({params}) {
  return (
    <>
    <Department department={params.departmentName}/>
    </>
  )
}
