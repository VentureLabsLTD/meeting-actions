import React, { Fragment, useState } from 'react';

const Task = ({ updateTask, removeTask, children }) => {
    return <div class="taskWrapper">
        <div class="grid grid-cols-10 grid-flow-col gap-0 bg-white mt-1 p-1">
            <div class="col-span-8">
                <input class="text-gray-600	w-full h-full p-4" defaultValue={children} onBlur={(e) => updateTask(e.target.value)} />
            </div>
            <div class="col-span-1 p-2">
                <button onClick={() => alert('change assignee!')} class="text-gray-700 w-full h-full grid place-content-center rounded-full bg-gray-300 hover:bg-gray-400">RB</button>
            </div>
            <div class="col-span-1 p-2">
                <button class="w-full hover:bg-gray-300 text-gray-700 h-full" onClick={() => removeTask(children)}>✖</button>
            </div>
        </div>
    </div>
}

const TasksList = ({ tasks, onRemovetask, updateTask }) => {
    const todoList = tasks.map((task, idx) => <Task key={idx} updateTask={updateTask} removeTask={onRemovetask}>{task}</Task>)
    return <Fragment>{todoList}</Fragment>
}

export { TasksList }