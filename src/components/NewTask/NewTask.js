import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useFetch from '../../hooks/useFetch';

const NewTask = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const EnterTaskHandler = (taskText) => {
        const request = {
            parameter: true,
            setError,
            setIsLoading,
            taskText,
            onAddTask: props.onAddTask,
        };

        useFetch(request);
    };

    return (
        <Section>
            <TaskForm onEnterTask={EnterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
