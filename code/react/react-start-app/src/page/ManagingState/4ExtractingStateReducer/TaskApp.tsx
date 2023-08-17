import {useReducer, useState} from 'react';
// @ts-ignore
import AddTask from './AddTask.tsx';
// @ts-ignore
import TaskList from './TaskList.tsx';
import tasksReducer from './tasksReducer.js';
import { TasksContext, TasksDispatchContext } from './TasksContext';
import React from 'react';

export default function TaskApp() {
    // const [tasks, setTasks] = useState(initialTasks);
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text) {
        /*setTasks([
            ...tasks,
            {
                id: nextId++,
                text: text,
                done: false,
            },
        ]);*/
        // @ts-ignore
        dispatch(tasks, {
            type: 'added',
            id: nextId++,
            text: text,
        });
    }

    function handleChangeTask(task) {
        /*setTasks(
            tasks.map((t) => {
                if (t.id === task.id) {
                    return task;
                } else {
                    return t;
                }
            })
        );*/
        // @ts-ignore
        dispatch({
            type: 'changed',
            task: task,
        });
    }

    function handleDeleteTask(taskId) {
        /*setTasks(tasks.filter((t) => t.id !== taskId));*/
        // @ts-ignore
        dispatch({
            type: 'deleted',
            id: taskId,
        });
    }

    return (
        <>
            <TasksContext.Provider value={tasks}>
                <TasksDispatchContext.Provider value={dispatch}>
                    <h1>Prague itinerary</h1>
                    {/*<AddTask onAddTask={handleAddTask} />
                    <TaskList
                        tasks={tasks}
                        onChangeTask={handleChangeTask}
                        onDeleteTask={handleDeleteTask}
                    />*/}
                    <AddTask />
                    <TaskList />
                </TasksDispatchContext.Provider>
            </TasksContext.Provider>/

        </>
    );
}

let nextId = 3;
const initialTasks = [
    {id: 0, text: 'Visit Kafka Museum', done: true},
    {id: 1, text: 'Watch a puppet show', done: false},
    {id: 2, text: 'Lennon Wall pic', done: false},
];
