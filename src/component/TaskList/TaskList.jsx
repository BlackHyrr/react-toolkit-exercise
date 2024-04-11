import Task from "../Task/Task";
import { useSelector } from "react-redux";
import './TaskList.css'
import toast from 'react-hot-toast';
import { useEffect } from "react";

const TaskList = () => {
    const tasks = useSelector(state => state.task.tasks)
    const requestStatus = useSelector(state => state.task.requestStatus)


    useEffect(() => {
        if (requestStatus === 'pending') {
            toast.loading('Loading tasks...');
        } else {
            toast.dismiss();
        }
    }, [requestStatus]);

    return (
        <div className={'tasklist-container'}>
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
                        requestStatus === 'fulfilled' &&
                        tasks.length > 0 &&
                        tasks.map(task => <Task key={task.id} task={task} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TaskList;