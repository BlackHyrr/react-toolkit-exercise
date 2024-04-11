import './App.css'

import TaskList from './component/TaskList/TaskList.jsx';
import TaskInput from './component/TaskInput/TaskInput.jsx';
import UserInput from './component/UserInput/UserInput.jsx';
import LogList from './component/Log/LogList.jsx';

function App() {

    return (
        <>
            <div className={'container'}>
                <h1>Tasks</h1>
                <div className={'form-container'}>
                    <UserInput />
                    <TaskInput />
                </div>
                <TaskList />
            </div>
            
            <LogList />
        </>
    )
}

export default App