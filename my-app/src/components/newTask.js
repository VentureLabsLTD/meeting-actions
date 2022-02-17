import React, { useState } from 'react';

const NewTask = ({ onNewTask }) => {
    const [title, setTitle] = useState('');

    const onTitleChange = (evt) => {
        setTitle(evt.target.value);
    }

    const addTask = (e) => {
        e.preventDefault();
        setTitle('');
        onNewTask(title);
    }

    return <div>
        <form onSubmit={addTask}>
            <div class="grid grid-cols-6 grid-flow-col gap-0">
                <div class="col-span-5">
                    <input
                        class="p-3 rounded-tl-md rounded-bl-md w-full"
                        placeholder="What do you need to do?"
                        value={title}
                        onChange={onTitleChange}
                    />
                </div>
                <div class="col-span-1">
                    <button type="submit" class="w-full rounded-tr-md p-3 rounded-br-md bg-gray-400" onClick={addTask}>➕</button>
                </div>
            </div>
        </form>
    </div>
}

export { NewTask }