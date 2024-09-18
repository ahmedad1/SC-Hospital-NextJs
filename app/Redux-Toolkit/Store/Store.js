import SearchResult from "../Slices/SearchResult";

const { configureStore } = require("@reduxjs/toolkit");

export const store= configureStore({
    reducer:{
        searchResult:SearchResult
    }
})