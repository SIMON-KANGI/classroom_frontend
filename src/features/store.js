import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './auth/AuthSlice'
import {apiSlice} from './auth/authApi'
import userReducer from './userSlice'
import classReducer from './classRoomSlice'
import timetableReducer from './timetableSlice'
const store= configureStore({
    reducer:{
        auth:AuthReducer,
        user:userReducer,  
        class:classReducer,
        timetables:timetableReducer,
        api:apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
export default store