import {configureStore} from "@reduxjs/toolkit";
import taskSlice from "./Slice/taskSlice";

const store = configureStore({
    reducer: {
        task: taskSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    ])
})

export default store