import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClasses = createAsyncThunk('users/fetchClasses', async () => {
    const response = await axios.get('http://localhost:3000/api/classes');
    return response.data;
});

// Create slice
const classSlice = createSlice({
    name: "class",
    initialState: {
        classes: [],
        status: 'idle',  
        error: null
    },
    reducers: {
        setClass: (state, action) => {
           
            state.classes = action.payload.classes || [];
        },
        addClass: (state, action) => {
            state.classes.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClasses.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchClasses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.classes = action.payload;
            })
            .addCase(fetchClasses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setClass, addClass } = classSlice.actions;
export default classSlice.reducer;

// Selectors
export const selectClassesState = (state) => state.class;

export const selectCurrentClasses = createSelector(
    [selectClassesState],
    (classesState) => classesState.classes || []
);

export const selectClassessStatus = createSelector(
    [selectClassesState],
    (classesState) => classesState.status
);

export const selectClassesError = createSelector(
    [selectClassesState],
    (classesState) => classesState.error
);
