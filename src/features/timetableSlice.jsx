import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch timetables
export const fetchTimetables = createAsyncThunk("timetables/fetchTimetables", async () => {
    const response = await axios.get('http://localhost:3000/api/timetables');
    return response.data;
});

// Create slice
const timetableSlice = createSlice({
    name: "timetables",
    initialState: {
        timetables: [],
        status: 'idle',  
        error: null,
    },
    reducers: {
        setTimetables: (state, action) => {
            state.timetables = action.payload;
        },
        addTimetable: (state, action) => {
            state.timetables.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimetables.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTimetables.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.timetables = action.payload;
            })
            .addCase(fetchTimetables.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});


export const { addTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;

// Selectors
export const selectTimetableState = (state) => state.timetables;

export const selectCurrentTimetable = createSelector(
    [selectTimetableState],
    (timetableState) => timetableState.timetables || []
);

export const selectTimetableStatus = createSelector(
    [selectTimetableState],
    (timetableState) => timetableState.status
);

export const selectTimetableError = createSelector(
    [selectTimetableState],
    (timetableState) => timetableState.error
);
