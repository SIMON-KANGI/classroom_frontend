import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:3000/api/users');
    return response.data;
});

// Create slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        status: 'idle',  
        error: null
    },
    reducers: {
        setUser: (state, action) => {
           
            state.users = action.payload.users || [];
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setUser, addUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUsersState = (state) => state.user;

export const selectCurrentUsers = createSelector(
    [selectUsersState],
    (usersState) => usersState.users || []
);

export const selectUsersStatus = createSelector(
    [selectUsersState],
    (usersState) => usersState.status
);

export const selectUsersError = createSelector(
    [selectUsersState],
    (usersState) => usersState.error
);
