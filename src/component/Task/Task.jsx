import './Task.css'
import { useDispatch } from "react-redux";
import { changeTitle, setCompleted, updateTask, deleteTask } from "../../store/Slice/taskSlice.js";

function Task({ task }) {
    const dispatch = useDispatch();

    const handleUpdateTaskStatus = () => {
        dispatch(setCompleted({ id: task.id, completed: !task.completed }));
        dispatch(updateTask({ ...task, completed: !task.completed }));
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask(task.id));
    }

    const handleUpdateTaskTitle = () => {
        const newTitle = prompt('Enter new title');

        if (newTitle) {
            dispatch(changeTitle({ id: task.id, title: newTitle }));
            dispatch(updateTask({ ...task, title: newTitle }));
        }
    }

    return (
        <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.userId}</td>
            <td>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleUpdateTaskStatus}
                />
            </td>
            <td>
                <button className={'btn delete-btn'} onClick={handleDeleteTask}>Delete</button>
                <button className={'btn modify-btn'}  onClick={handleUpdateTaskTitle}>Modify</button>
            </td>
        </tr>
    );
}

export default Task;