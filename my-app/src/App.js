import React, { useState, Fragment } from 'react';
import './App.css';
import { CustomEditor } from './components/CustomEditor';
import { ExportRow } from './components/ExportRow';
import { NewTask } from './components/NewTask';
import { TasksList } from './components/TaskList';
import { AddAssignee } from './components/AddAssignee';
import { ListAssignees } from './components/ListAssignees';

const App = () => {
  const [showShoji, updateShojiState] = useState(false)
  const toggleShoji = () => {
    updateShojiState(showShoji ? false : true);
  }

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

  const removeTask = (index) => {
    const tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    console.log(index, tasks, tasksCopy)
    updateTaskState(tasksCopy);
  }

  const [people, updatePersonState] = useState(["RB", "JR", "LB"]);

  const addPerson = (person) => {
    const peopleCopy = [...people];
    peopleCopy.push(person);
    updatePersonState(peopleCopy);
  }

  const updatePerson = (person) => {
    const peopleCopy = [...people];
    const index = peopleCopy.indexOf(person);
    peopleCopy.splice(index, 1);
    peopleCopy.push(person);
    updatePersonState(peopleCopy);
  }

  const removePerson = (index) => {
    const peopleCopy = [...people];
    peopleCopy.splice(index, 1);
    console.log(index, tasks, peopleCopy)
    updatePersonState(peopleCopy);
  }

  const reallyCleverAI = (event, text) => {
    const content = text.getContent()
    const people = content.match(/@[a-z]+/g);
    updatePersonState(people || [])
  }

  return <div>
    <div class="bg-gray-200 text-gray-600 font-bold p-5 text-center text-4xl"> Quick Notes™ </div>
    <div class="grid grid-cols-4 grid-flow-col gap-0">
      <div class="col-span-3">
        <CustomEditor onNewTask={addTask} onChange={reallyCleverAI} />
      </div>
      <div class="col-span-1">
        <div class="p-10 pt-8 bg-gray-300">
          <div class="grid grid-cols-6 grid-flow-col gap-1">
            <div class="col-span-4">
              <NewTask onNewTask={addTask} />
            </div>
            <div class="col-span-2">
              <button onClick={toggleShoji} class="w-full rounded-md p-3 bg-gray-400 bg-orange-400">People</button>
            </div>
          </div>
          <div class="mt-4">
            <TasksList people={people} tasks={tasks} onRemovetask={removeTask} updateTask={updateTask} />
          </div>
        </div>
        <ExportRow tasks={tasks} />
        {
          showShoji &&
          <div class="text-gray-700 p-2 bg-gray-300">
            <AddAssignee people={people} onNewPerson={addPerson} />
            <ListAssignees people={people} removePerson={removePerson} updatePerson={updatePerson} />
          </div>
        }
      </div>
    </div>
  </div >;
}

export default App;
