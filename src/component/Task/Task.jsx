import './Task.css'
import { useDispatch } from "react-redux";
import { changeTitle, setCompleted, updateTask, deleteTask } from "../../store/Slice/taskSlice.js";
import toast from 'react-hot-toast';

function Task({ task }) {
    const dispatch = useDispatch();

    const handleUpdateTaskStatus = () => {
        dispatch(setCompleted({ id: task.id, completed: !task.completed }));
        dispatch(updateTask({ ...task, completed: !task.completed }));
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask(task.id)).then((action) => {
            if (deleteTask.fulfilled.match(action)) {
                toast.success('Task deleted successfully');
            } else if (deleteTask.rejected.match(action)) {
                toast.error('Error deleting task');
            }
        });
    }

    const handleUpdateTaskTitle = () => {
        const newTitle = prompt('Enter new title', task.title);
        if(newTitle === null) {
            toast.error('Invalid title');
            return;
        }
        if(newTitle === '') {
            toast.error('Title cannot be empty');
            return;
        }
        if(newTitle === task.title) {
            toast('Title is same as previous');
            return;
        }

        dispatch(changeTitle({ id: task.id, title: newTitle }));
        dispatch(updateTask({ ...task, title: newTitle }))
            .then((action) => {
                if (updateTask.fulfilled.match(action)) {
                    toast.success('Task updated successfully');
                } else if (updateTask.rejected.match(action)) {
                    toast.error('Error updating task');
                }
            });
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