import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Jobs from "../../interface"
import axios from "axios";


const job:Jobs[] = []

export const getJobs:any = createAsyncThunk(
    "jobs/getAllJob",
    async ()=> {const response = await  axios.get("http://localhost:8080/jobs");
        return response.data
    }
)

export const addJob:any = createAsyncThunk(
    "add/addJob",
    async (jobs)=> {const response = await  axios.post("http://localhost:8080/jobs",jobs);
        return response.data
    }
)

export const openDeleteForm: any = createAsyncThunk(
    "jobs/openDeleteForm",
    async (job) => {
        return job;
    }
);

export const closeDeleteForm: any = createAsyncThunk(
    "jobs/closeDeleteForm",
    async () => {
        return null;
    }
);

export const deleteJob:any = createAsyncThunk("delete/deleteJob", async (id: number) => {
    axios.delete(`http://localhost:8080/jobs/${id}`)
    return {id}
})

export const edit:any = createAsyncThunk("jobs/edit", async (job)=>{
    return job
})

export const editJob: any = createAsyncThunk(
    "jobs/editJob",
    async (job: any) => {
      const response = await axios.put(`http://localhost:8080/jobs/${job.id}`, job);
      return response.data;
    }
  );
const jobReducer = createSlice({
    name:"jobs",
    initialState:{
        jobs:job,
        deleteFormStatus:false,
        deleteJob:null,
        editedJob:null
    },
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state: any, action: any) => {
                // trạng thái chờ lấy dữ liệu
            })
            .addCase(getJobs.fulfilled, (state: any, action: any) => {
                // trạng thái lấy dữ liệu thành công
                state.jobs = action.payload;
            })
            .addCase(getJobs.rejected, (state: any, action: any) => {
                // trạng thái lấy dữ liệu thất bại
            }).addCase(addJob.fulfilled, (state: any, action: any) => {
                state.jobs.push(action.payload);
            }).addCase(openDeleteForm.fulfilled, (state: any, action: any)=>{
                state.deleteFormStatus = true
                state.deleteJob = action.payload
            })
            .addCase(closeDeleteForm.fulfilled, (state: any, action: any)=>{
                state.deleteFormStatus = false
            })
            .addCase(deleteJob.fulfilled, (state: any, action: any)=>{
                state.jobs = state.jobs.filter((job:any) => job.id!== action.payload.id)
                state.deleteFormStatus = false
                state.deleteJob = null
            })
            .addCase(edit.fulfilled, (state: any, action: any)=>{
                console.log(123123123,action.payload);
                state.editedJob = action.payload
            })
            .addCase(editJob.fulfilled, (state, action) => {
                const index = state.jobs.findIndex((job: any) => job.id === action.payload.id);
                if (index !== -1) {
                  state.jobs[index] = action.payload;
                }
              })

    }
})

export default jobReducer.reducer