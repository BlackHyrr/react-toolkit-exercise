import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTask",
    async (userId) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return response.data;
        } catch (error) {
            console.error("Error fetching todo tasks:", error);
        }
    }
);

export const addTasks = createAsyncThunk(
    "tasks/addTask",
    async (task) => {
        try {
            const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`, task);
            console.log('response', response)
            return response.data;
        } catch (error) {
            console.error("Error adding task:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
            return {id: taskId};
        } catch (error) {
            console.error("Error deleting task:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (task) => {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
            return response.data;
        } catch (error) {
            console.error("Error updating task:", error);
            return rejectWithValue(error.message);
        }
    }
);


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        userId: 1,
        title: '',
        completed: false,
        tasks: [],
        requestStatus: 'idle'
    },
    reducers: {
        setTitleValue(state, action) {
            state.title = action.payload
        },
        add(state, action) {
            const maxId = Math.max(...state.tasks.map(task => Number(task.id)), 0);
            const newTask = {
                userId: state.userId,
                id: maxId + 1,
                title: state.title,
                completed: state.completed
            };
            state.tasks.push(newTask);
            state.title = '';
        },
        reset(state, action) {
            state.tasks = []
        },
        remove(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        setCompleted(state, action) {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    task.completed = action.payload.completed
                }
                return task
            })
        },
        changeTitle(state, action) {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    task.title = action.payload.title
                }
                return task
            })
        },
        setUserId(state, action) {
            state.userId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload,
            state.requestStatus = 'fulfilled'
        }),
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.requestStatus = 'pending'
        }),
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.requestStatus = 'rejected'
        }),
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        }),
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            state.tasks[index] = action.payload;
        });
    }

})

export const {
    setTitleValue,
    add,
    reset,
    remove,
    setCompleted,
    changeTitle,
    setUserId
} = taskSlice.actions

export default taskSlice.reducer;