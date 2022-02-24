import React, { Fragment } from 'react';

const Person = ({ index, updatePerson, removePerson, children }) => {
    return <div class="taskWrapper">
        <div class="grid grid-cols-12 grid-flow-col gap-0 bg-white mt-1 p-1">
            <div class="col-span-11">
                <input class="text-gray-600	w-full h-full p-4" defaultValue={children} onBlur={(e) => updatePerson(e.target.value)} />
            </div>
            <div class="col-span-1 p-2">
                <button class="w-full hover:bg-gray-300 text-gray-700 h-full" onClick={() => removePerson(index)}>✖</button>
            </div>
        </div>
    </div>
}


const ListAssignees = ({ people, removePerson, updatePerson }) => {
    const todoList = people.map((person, idx) => <Person index={idx} key={idx} updatePerson={updatePerson} removePerson={removePerson}>{person}</Person>)
    return <Fragment>{todoList}</Fragment>
}

export { ListAssignees }