import { createSlice } from '@reduxjs/toolkit';

const logSlice = createSlice({
    name: 'log',
    initialState: {
        logs: []
    },
    reducers: {
        addLog: (state, action) => {
            state.logs.push(action.payload);
        },
        clearLogs: (state) => {
            state.logs = [];
        },
    },
});

export const { 
    addLog, 
    clearLogs 
} = logSlice.actions;
export default logSlice.reducer;