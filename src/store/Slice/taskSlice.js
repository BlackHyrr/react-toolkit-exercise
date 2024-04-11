import {createSlice} from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        userId: '',
        id: 2,
        title: '',
        completed: false,
        tasks: [
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            }
        ]
    },
    reducers: {
        setTitleValue(state, action) {
            state.title = action.payload
        },
        add(state, action) {
            state.id = state.id + 1
            state.userId = 1
            state.tasks.push({
                userId: state.userId,
                id: state.id,
                title: state.title,
                completed: state.completed
            })
            state.title = ''
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
        }
    }
})

export const {
    setTitleValue,
    add,
    reset,
    remove,
    setCompleted,
    changeTitle
} = taskSlice.actions

export default taskSlice.reducer;