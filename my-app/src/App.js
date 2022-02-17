import React, { useState } from 'react';
import './App.css';
import { CustomEditor } from './components/CustomEditor';
import { ExportRow } from './components/ExportRow';
import { NewTask } from './components/newTask';
import { TasksList } from './components/taskList';

const App = () => {
  const [tasks, updateTaskState] = useState(["one", "two", "three"]);

  const addTask = (taskTitle) => {
    const tasksCopy = [...tasks];
    tasksCopy.push(taskTitle);
    updateTaskState(tasksCopy);
  }

  const updateTask = (taskTitle) => {
    const tasksCopy = [...tasks];
    const index = tasksCopy.indexOf(taskTitle);
    tasksCopy.splice(index, 1);
    tasksCopy.push(taskTitle);
    updateTaskState(tasksCopy);
  }

  const removeTask = (taskTitle) => {
    const tasksCopy = [...tasks];
    const index = tasksCopy.indexOf(taskTitle);
    tasksCopy.splice(index, 1);
    updateTaskState(tasksCopy);
  }

  return <div>
    <div class="bg-gray-200 text-gray-600 font-bold p-5 text-center text-4xl"> Quick Notes™ </div>
    <div class="grid grid-cols-4 grid-flow-col gap-0">
      <div class="col-span-3">
        <CustomEditor onNewTask={addTask} />
      </div>
      <div class="col-span-1">
        <div class="p-10 pt-8 bg-gray-300">
          <NewTask onNewTask={addTask} />
          <div class="mt-4">
            <TasksList tasks={tasks} onRemovetask={removeTask} updateTask={updateTask} />
          </div>
        </div>
        <ExportRow tasks={tasks} />
      </div>
    </div>
  </div >;
}

export default App;
