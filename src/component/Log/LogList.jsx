import { useSelector } from 'react-redux';
import './LogList.css';
import { useState } from 'react';

const LogList = () => {
    const logs = useSelector(state => state.log.logs);
    const reversedLogs = [...logs].reverse();

    const [isLogVisible, setIsLogVisible] = useState(true);

    const handleLogVisibility = () => {
        setIsLogVisible(!isLogVisible);
    }

    console.log(logs);

    return (
        <div className={'log-container'}>
            <div className={'log-header'}>
                <button className='btn logs-btn' onClick={handleLogVisibility}>
                    {isLogVisible ? 'Hide logs' : 'Display logs'}
                </button>
            </div>
            {isLogVisible && (
                <ul className={'log-list'}>
                    {reversedLogs.map((log, index) => (
                        <li key={index}>
                            {">>"} {new Date(log.timestamp).toLocaleString()} - {log.name} - {log.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LogList;