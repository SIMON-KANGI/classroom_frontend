import { createSlice } from "@reduxjs/toolkit";


const AuthSlice= createSlice({
    name:"auth",
    initialState:{
        token:null,
        user:null,
        name:null,
        role:null,
        error:null
    },
    reducers:{
        setCredentials:(state,action)=>{
            const {token,user,name,role} = action.payload
            state.token=token;
            state.user=user;
           
            localStorage.setItem("token",state.token);
        },
        logout:(state)=>{
            state.token=null;
            state.user=null;
            localStorage.removeItem("token");
        },
        setError:(state,action)=>{
            state.error=action.payload;
        }
    }
})
export const {setCredentials,logout}= AuthSlice.actions
export default AuthSlice.reducer


export const selectCurrentUser=(state)=>state.auth.user

export const selectCurentToken=(state)=>state.auth.token