// @ts-ignore
import AddTask from './AddTask.tsx';
// @ts-ignore
import TaskList from './TaskList.tsx';
import { TasksProvider } from './TasksContext';
import React from 'react';

export default function TaskReducerContext() {
    return (
        <TasksProvider>
            <h1>Day off in Kyoto</h1>
            <AddTask />
            <TaskList />
        </TasksProvider>
    );
}