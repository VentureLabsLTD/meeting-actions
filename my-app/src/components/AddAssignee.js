
import React, { useState } from 'react';

const AddAssignee = ({ onNewPerson }) => {
    const [person, setPerson] = useState('');

    const onPersonChange = (evt) => {
        setPerson(evt.target.value);
    }

    const addPerson = (e) => {
        e.preventDefault();
        setPerson('');
        onNewPerson(person);
    }

    return <div>
        <form onSubmit={addPerson}>
            <div class="grid grid-cols-6 grid-flow-col gap-0">
                <div class="col-span-5">
                    <input
                        class="p-3 rounded-tl-md rounded-bl-md w-full"
                        placeholder="Who is attending?"
                        value={person}
                        onChange={onPersonChange}
                    />
                </div>
                <div class="col-span-1">
                    <button type="submit" class="w-full rounded-tr-md p-3 rounded-br-md bg-gray-400" onClick={addPerson}>➕</button>
                </div>
            </div>
        </form>
    </div>
}

export { AddAssignee }