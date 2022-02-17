import React, { Fragment, useState } from 'react';

const Task = ({ index, updateTask, removeTask, children }) => {
    return <div class="taskWrapper">
        <div class="grid grid-cols-12 grid-flow-col gap-0 bg-white mt-1 p-1">
            <div class="col-span-9">
                <input class="text-gray-600	w-full h-full p-4" defaultValue={children} onBlur={(e) => updateTask(e.target.value)} />
            </div>
            <div class="col-span-2 p-2">
                <select class="pr-2 text-center text-gray-700 w-full h-full grid place-content-center rounded-full bg-gray-300 hover:bg-gray-400">
                    <option>RB</option>
                    <option>JR</option>
                    <option>LB</option>
                </select>
            </div>
            <div class="col-span-1 p-2">
                <button class="w-full hover:bg-gray-300 text-gray-700 h-full" onClick={() => removeTask(index)}>✖</button>
            </div>
        </div>
    </div>
}

const TasksList = ({ tasks, onRemovetask, updateTask }) => {
    const todoList = tasks.map((task, idx) => <Task index={idx} key={idx} updateTask={updateTask} removeTask={onRemovetask}>{task}</Task>)
    return <Fragment>{todoList}</Fragment>
}

export { TasksList }