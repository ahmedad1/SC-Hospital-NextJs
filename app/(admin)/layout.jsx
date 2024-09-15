import React from "react";
import AsideAdmin from "../components/Home/Auth/Admin/AsideAdmin/AsideAdmin";

export default function Home({ children }) {
  return (
    <>
      <div className="row ">
        <AsideAdmin />
        {children}
      </div>
    </>
  );
}
