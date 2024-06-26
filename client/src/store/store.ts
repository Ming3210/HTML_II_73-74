import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./reducers/jobReducer";

export const store= configureStore({
    reducer:{
        jobs:jobReducer
    }
})