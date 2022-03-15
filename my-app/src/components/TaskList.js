import React, { Fragment } from 'react';

const Task = ({ index, updateTask, removeTask, children, people }) => {
    return <div class="taskWrapper" key={index}>
        <div class="grid grid-cols-12 grid-flow-col gap-0 bg-white mt-1 p-1">
            <div class="col-span-9">
                <input class="text-gray-600	w-full h-full p-4" value={children} onChange={(e) => updateTask(e.target.value)} />
            </div>
            <div class="col-span-2 p-2">
                <select class="pr-2 text-center text-gray-700 w-full h-full grid place-content-center rounded-full bg-gray-300 hover:bg-gray-400">
                    {people.map((person, idx) => <option key={idx}>{person}</option>)}
                </select>
            </div>
            <div class="col-span-1 p-2">
                <button class="w-full hover:bg-gray-300 text-gray-700 h-full" onClick={() => removeTask(index)}>✖</button>
            </div>
        </div>
    </div>
}

const TasksList = ({ people, tasks, onRemovetask, updateTask }) => {
    console.log('redraw tasklist:', tasks)
    const PersonList = tasks.map((task, idx) => <Task people={people} index={idx} key={idx} updateTask={updateTask} removeTask={onRemovetask}>{task}</Task>)
    return <Fragment>{PersonList}</Fragment>
}

export { TasksList }