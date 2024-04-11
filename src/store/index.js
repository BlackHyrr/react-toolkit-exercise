import { configureStore, createAction } from "@reduxjs/toolkit";
import taskSlice from "./Slice/taskSlice";
import userSlice from "./Slice/userSlice";
import { deepDiff } from "./utils/log";
import logSlice, { addLog } from "./Slice/logSlice";

export const LOG_ACTION = "logAction";
export const logAction = createAction(LOG_ACTION);

const logMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    console.log(action.type)
/*     if (action.type.endsWith("/pending") || action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) {
        store.dispatch(
            addLog({
                timestamp: new Date().toISOString(),
                name: action.type,
                message: `API call ${action.type} was dispatched`,
                payload: action.payload, 
            })
        );
    } */


    if (action.type === "tasks/addTask/fulfilled") {
        store.dispatch(
            addLog({
                timestamp: new Date().toISOString(),
                name: action.type,
                message: `Task with id ${action.payload.id} was added`,
            })
        );
    }


    if (action.type === "tasks/updateTask/fulfilled") {
        store.dispatch(
            addLog({
                timestamp: new Date().toISOString(),
                name: action.type,
                message: `Task with id ${action.payload.id} was updated`,
            })
        );
    }

    if (action.type === "tasks/deleteTask/fulfilled") {
        store.dispatch(
            addLog({
                timestamp: new Date().toISOString(),
                name: action.type,
                message: `Task with id ${action.payload.id} was deleted`,
            })
        );
    }

    return result;
};

const store = configureStore({
    reducer: {
        task: taskSlice,
        user: userSlice,
        log: logSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logMiddleware]),
});

export default store;
