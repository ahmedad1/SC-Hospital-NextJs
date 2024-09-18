"use client";
import Image from "next/image";
import userSolid from "@/app/public/user-solid.svg";
import SignOutBtn from "../../SignOutBtn/SignOutBtn";
import Link from "next/link";
import Cookies from "cookie-universal";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import usePaginatedSearch from "@/app/extra-services/usePaginatedSearch";
import { Clear } from "@/app/Redux-Toolkit/Slices/SearchResult";
import Swal from "sweetalert2";

export default function NavAdmin() {
  const cookies = Cookies();
  const [firstName, setFirstName] = useState(false);
  const pathName=usePathname()
  const[isDoctorsSection,setDoctorSection]=useState(false)
  const [searchKey,setSearchKey]=useState("choose")
  const [searchValue,setSearchValue]=useState("")
  const dispatch=useDispatch()
  const paginateSearch=usePaginatedSearch();

  async function submitSearch(e){
    if(searchKey==="choose"||searchKey===""){
      await Swal.fire({title:"You must select the search key",icon:"info",allowEnterKey:false})
      return
    }
    if(!searchValue)return;
    await paginateSearch(searchKey,searchValue,`/Account${pathName.slice(0,pathName.length-1)}`,"searchKey")
  }
  useEffect((_) => {
    setFirstName(cookies.get("firstName"));
  }, []);
  useEffect(_=>{
    setDoctorSection(pathName==="/doctors")

  },[pathName])
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light position-relative z-3 ">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand text-primary">
          S.C Hospital
        </Link>
        <Link href="#N" data-bs-toggle="collapse" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </Link>

        <div className="collapse navbar-collapse" id="N">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <button onClick={async e=>await submitSearch(e)} className="btn btn-outline-primary mt-lg-0 mt-2  me-3">
                Search
              </button>
            </li>
            <li className="nav-item">
              <input
                className="nav-link me-2 rounded mt-lg-0 mt-3 "
                type="search"
                placeholder="Search"
                onKeyDown={async e=>{
                  if(e.key==="Enter")
                    await submitSearch(e)
                  
                }}
                onChange={e=>{
                  setSearchValue(e.target.value)
                  if(e.target.value.length===0){
                    dispatch(Clear())
                  }
                }}
              />
            </li>
            <li className="nav-item">
              <select className="form-select mt-lg-0 mt-3"onChange={e=>setSearchKey(e.target.value)}>
                <option value={"choose"}>Search key</option>
                {isDoctorsSection&&<option value="department">deparment</option>}
                <option value="fullName">full name</option>
                <option value="email">email</option>
                <option value="userName">username</option>
                <option value="emailConfirmed">is confirmed</option>
              </select>
            </li>

            <li className="nav-item">
              <Link href="/" className="nav-link mt-lg-0 mt-2">
                Home
              </Link>
            </li>
          </ul>
          <div
            className="nav-link d-flex p-0 mt-lg-0 mt-3"
            style={{ gap: "5px" }}
          >
            <Image
              src={userSolid}
              className="ms-lg-2 mt-1 "
              width="15"
              alt="reload the page"
            />
            <Link
              href="/profile-settings"
              className="text-muted text-decoration-none usernamespan"
            >
              {firstName}
            </Link>
          </div>
          <SignOutBtn />
        </div>
      </div>
    </nav>
  );
}
