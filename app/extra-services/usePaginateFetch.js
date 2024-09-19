import React, { useEffect } from "react";
import useSendAuthRequest from "./useSendAuthRequest";
import Swal from "sweetalert2";

export default function usePaginateFetch(
  pathAfterApi,
  sessionStorageKey,
  oldStateRef,
  stateFunc,
  addEventOnly=false,
  queryStartPage="?"
) {
    
  const sendReq = useSendAuthRequest();
  async function fetchData(pageNum) {
    window.sessionStorage.setItem(sessionStorageKey, pageNum);
    const result = await sendReq(pathAfterApi + `${queryStartPage}page=${pageNum}`, "get");
    if (result.status === 200) {
      if (result.data.length === 0) {
        window.sessionStorage.setItem(sessionStorageKey, pageNum - 1);
        if(pageNum===1)
          stateFunc(result.data)
        return;
      }
      if (pageNum === 1) {
        stateFunc(result.data);
        return;
      } else {
        const newData = [...oldStateRef.current, ...result.data];
        stateFunc(newData);
      }
    } else {
      Swal.fire({ title: "Something went wrong", icon: "error" });
      window.sessionStorage.setItem(sessionStorageKey, pageNum - 1);
    }
  }
  async function scrollEvent () {
    if(window.sessionStorage.getItem("scrollWindowCalled")=="true")
        return
    window.sessionStorage.setItem("scrollWindowCalled",true)
    if (window.scrollY >= document.body.scrollHeight - window.innerHeight) {
      let currentPage = sessionStorage.getItem(sessionStorageKey);
      if (isNaN(currentPage)) {
        sessionStorage.setItem(sessionStorageKey, 0);
        currentPage = 0;
      }
      sessionStorage.setItem(sessionStorageKey, +currentPage + 1);
      await fetchData(+currentPage + 1);
    }
    window.sessionStorage.setItem("scrollWindowCalled",false)
  };
  if(addEventOnly)
    return scrollEvent
  useEffect((_) => {
    sessionStorage.setItem(sessionStorageKey,1)
    fetchData(1).then((_) => {
      window.onscroll=scrollEvent
      
    });
  
    return function(){
        window.onscroll=undefined
        sessionStorage.clear()
    } 
  }, []);
}
