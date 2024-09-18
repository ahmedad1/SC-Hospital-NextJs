import { createSlice } from "@reduxjs/toolkit";

const SearchResult=createSlice({
    initialState:false,
    name:"SearchResult",
    reducers:{
        SetSearchResult:(state,action)=>{
            return action.payload
        },
        AddToExistedResult:(state,action)=>{
            state.push(...action.payload)
        },
        Clear:(state,action)=>{
            return false
        }
    }
})
export default SearchResult.reducer;
export const{SetSearchResult,AddToExistedResult,Clear}=SearchResult.actions