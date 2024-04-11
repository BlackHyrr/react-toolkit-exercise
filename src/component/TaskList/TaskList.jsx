import Task from "../Task/Task";
import { useSelector } from "react-redux";
import './TaskList.css'

const TaskList = () => {
    const tasks = useSelector(state => state.task.tasks)
    const requestStatus = useSelector(state => state.task.requestStatus)


    return (
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
                    {
                        requestStatus === 'pending' &&
                            tasks.length > 0 &&
                                tasks.map(task => <Task key={task.id} task={task} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TaskList;