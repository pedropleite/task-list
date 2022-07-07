import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/useFetch';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    const FetchTasks = () => {
        const request = {
            parameter: false,
            setError,
            setIsLoading,
            setTasks,
        };

        useFetch(request);
    };

    useEffect(() => {
        FetchTasks();
    }, []);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks items={tasks} loading={isLoading} error={error} onFetch={FetchTasks} />
        </React.Fragment>
    );
}

export default App;
