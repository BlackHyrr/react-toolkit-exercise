import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { add, setTitleValue, reset } from "./store/Slice/taskSlice.js";
import Task from './component/Task/Task.jsx';

function App() {
    const tasks = useSelector(state => state.task.tasks)
    const dispatch = useDispatch()

    return (
        <>
            <h1>Tasks</h1>
            <input type={'text'} onChange={(e) => dispatch(setTitleValue(e.target.value))} placeholder={'Enter task title'} />
            <button className={'btn reset-btn'} onClick={() => dispatch(reset())}>Reset</button>
            <button className={'btn add-btn'} onClick={() => dispatch(add())}>Add</button>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>User ID</th>
                            <th>Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => <Task key={task.id} task={task} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App