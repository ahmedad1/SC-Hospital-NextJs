import checkCookies from '@/app/extra-services/checkCookies'
import React from 'react'
import Auth from './Auth'
import Unauth from './Unauth'

export default function Navbar() {
  return (
    <>{checkCookies()?<Auth/>:<Unauth/>}</>
  )
}
