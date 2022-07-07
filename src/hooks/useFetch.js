const useFetch = (request, requestConfig) => {
    request.setIsLoading(true);
    request.setError(null);
    let content = null;

    if (request.parameter) {
        content = {
            method: 'POST',
            body: JSON.stringify({ text: request.taskText }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    fetch('https://custom-hooks-e72bb-default-rtdb.firebaseio.com/tasks.json', { content })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed!');
            }

            return response.json();
        })
        .then((data) => {
            if (!request.parameter) {
                const loadedTasks = [];
                for (const taskKey in data) {
                    loadedTasks.push({ id: taskKey, text: data[taskKey].text });
                }
                request.setTasks(loadedTasks);
            } else {
                const generatedId = data.name;
                const createdTask = { id: generatedId, text: request.taskText };
                request.onAddTask(createdTask);
            }
        })
        .catch((err) => {
            request.setError(err.message || 'Something went wrong!');
        });

    request.setIsLoading(false);
};

export default useFetch;
