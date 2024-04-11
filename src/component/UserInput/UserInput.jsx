import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setUserId } from "../../store/Slice/taskSlice";
import { fetchAllUsers } from "../../store/Slice/userSlice";
import { useEffect } from "react";

const UserInput = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleChange = (e) => {
        if(e.target.value === '') return;
        dispatch(setUserId(e.target.value))
        dispatch(fetchTasks(e.target.value))
    }

    return (
        <div>
            <div className={'form-group'}>
                <label className={'form-label'}>User</label>
                <select className={'form-input'} onChange={handleChange}>
                    <option value={''}>Select User</option>
                    {users.length > 0 && users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <div className={'form-error'}>
                    {/* {error && <span>{error}</span>} */}
                </div>
            </div>
        </div>
    )
}

export default UserInput;