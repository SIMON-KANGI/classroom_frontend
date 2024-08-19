import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './auth/AuthSlice'
import {apiSlice} from './auth/authApi'

const store= configureStore({
    reducer:{
        auth:AuthReducer,
        api:apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
export default store