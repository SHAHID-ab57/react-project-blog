import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url, endpoints } from "../Api/Api";


export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs",async ()=>{
    let response = await axios.get(api_url+endpoints.blogdetails)
    return response.data
})

export const fetchReviews = createAsyncThunk("blogs/fetchReviews",async()=>{
    let response = await axios.get(api_url+endpoints.reviews)
    return response.data
})

const blogsSlice = createSlice({
    name:"blogs",
    initialState:{
        blogs:[],
        reviews:[],
        status:"idle",
        error:null,
        sortBy:{field:"reviews",direction:"desc"}
    },
    reducers:{
        sortBlogsBy:(state,action)=>{
            state.sortBy=action.payload
        }
    },

    extraReducers : (builder) =>{
     builder
     .addCase(fetchBlogs.pending,(state)=>{
        state.status = "loading"
     })
     .addCase(fetchBlogs.fulfilled,(state,action)=>{
        state.status = "succeeded"
        state.blogs = action.payload
     })
     .addCase(fetchBlogs.rejected,(state,action)=>{
        state.status = "failed"
        state.error = action.error.message
     })
     .addCase(fetchReviews.fulfilled,(state,action)=>{
        state.reviews=action.payload
     })

    }
})
export const {sortBlogsBy} = blogsSlice.actions;
export default blogsSlice.reducer