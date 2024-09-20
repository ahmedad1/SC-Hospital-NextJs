import Swal from "sweetalert2";
import useSendAuthRequest from "./useSendAuthRequest";
import { useDispatch } from "react-redux";
import {
  AddToExistedResult,
  SetSearchResult,
} from "../Redux-Toolkit/Slices/SearchResult";

export default function usePaginatedSearch() {
  const dispatch = useDispatch();
  const sendReq = useSendAuthRequest();
  async function fetchData(
    searchKey,
    searchValue,
    pathAfterApi,
    sessionStorageKey,
    pageNum
  ) {
    window.sessionStorage.setItem(sessionStorageKey, pageNum);
    const result = await sendReq(
      pathAfterApi +
        `?searchKey=${searchKey}&searchValue=${searchValue}&page=${pageNum}`,
      "get"
    );
    if (!result.status) return;
    if (result.status === 200) {
      if (result.data.length === 0) {
        window.sessionStorage.setItem(sessionStorageKey, pageNum - 1);
        return;
      }
      if (pageNum === 1) {
        dispatch(SetSearchResult(result.data));
        return;
      } else {
        dispatch(AddToExistedResult(result.data));
      }
    } else {
      Swal.fire({ title: "Something went wrong", icon: "error" });
      window.sessionStorage.setItem(sessionStorageKey, pageNum - 1);
    }
  }
  return async function (
    searchKey,
    searchValue,
    pathAfterApi,
    sessionStorageKey
  ) {
    await fetchData(searchKey, searchValue, pathAfterApi, sessionStorageKey, 1);
    window.onscroll = async function () {
      if (window.sessionStorage.getItem("scrollWindowCalled") == "true") return;
      window.sessionStorage.setItem("scrollWindowCalled", true);
      if (window.scrollY >= document.body.scrollHeight - window.innerHeight) {
        let currentPage = sessionStorage.getItem(sessionStorageKey);
        if (isNaN(currentPage)) {
          sessionStorage.setItem(sessionStorageKey, 0);
          currentPage = 0;
        }
        sessionStorage.setItem(sessionStorageKey, +currentPage + 1);
        await fetchData(
          searchKey,
          searchValue,
          pathAfterApi,
          sessionStorageKey,
          +currentPage + 1
        );
      }
      window.sessionStorage.setItem("scrollWindowCalled", false);
    };
  };
}
