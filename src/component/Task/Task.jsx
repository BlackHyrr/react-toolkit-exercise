import './Task.css'
import { useDispatch } from "react-redux";
import { remove,changeTitle, setCompleted } from "../../store/Slice/taskSlice.js";

function Task({ task }) {
    const dispatch = useDispatch();

    return (
        <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.userId}</td>
            <td>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(setCompleted({ id: task.id, completed: !task.completed }))}
                />
            </td>
            <td>
                <button className={'btn delete-btn'} onClick={() => dispatch(remove(task.id))}>Delete</button>
                <button className={'btn modify-btn'}  onClick={() => {
                    const newTitle = prompt('Enter new title');
                    if (newTitle) {
                        dispatch(changeTitle({ id: task.id, title: newTitle }));
                    }
                }}>Modify</button>
            </td>
        </tr>
    );
}

export default Task;