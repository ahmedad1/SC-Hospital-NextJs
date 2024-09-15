import checkCookies from '@/app/extra-services/checkCookies'
import React from 'react'
import NavPatient from './Auth/NavPatient'
import Unauth from './Unauth'
import NavDoctor from './Auth/NavDoctor'
import NavAdmin from './Auth/NavAdmin'

export default function Navbar() {
  const role=checkCookies()
  return (
    <>{role?(role=="Pat"?<NavPatient/>:role=="Doc"?<NavDoctor/>:<NavAdmin/>):<Unauth/>}</>
  )
}
