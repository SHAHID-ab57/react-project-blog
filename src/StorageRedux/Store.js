import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./BlogSlice"


const  Store =  configureStore({
 reducer:{
blogs:blogsReducer
 }
})

export default Store