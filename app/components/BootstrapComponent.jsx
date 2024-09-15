"use client"

import { useEffect } from "react"

export default function BootstrapComponent() {
  useEffect(_=>{
    require("bootstrap/dist/js/bootstrap.min")
  },[])
}
