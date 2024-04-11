import { useDispatch } from "react-redux";
import './TaskInput.css'
import { add, addTasks, reset, setTitleValue } from "../../store/Slice/taskSlice";
import toast from 'react-hot-toast';

const TaskInput = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setTitleValue(e.target.value))
    }

    const handleAddTask = () => {
        dispatch(add());
        dispatch(addTasks()).then((action) => {
            if (addTasks.fulfilled.match(action)) {
                toast.success('Task added successfully');
            } else if (addTasks.rejected.match(action)) {
                toast.error('Error adding task');
            }
        });
    }

    return (
        <div>
            <div className={'form-group'}>
                <label className={'form-label'}>Title</label>
                <input className={'form-input'}  type={'text'} onChange={handleChange} placeholder={'Enter task title'} />
                <div className={'form-error'}>
                    {/* {error && <span>{error}</span>} */}
                </div>
            </div>
            
            <button className={'btn reset-btn'} onClick={() => dispatch(reset())}>Reset</button>
            <button className={'btn add-btn'} onClick={handleAddTask}>Add</button>
        </div>
    )
}

export default TaskInput;