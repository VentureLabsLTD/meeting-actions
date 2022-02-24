import React, { Fragment, useState } from 'react';

const ExportButton = ({ innerText, action }) => {
    return <button class="text-gray-700 p-2 bg-gray-300 hover:bg-gray-400 rounded-md w-full" onClick={action}>{innerText}</button>
}

const ExportRow = ({ tasks }) => {
    const [showPreview, updatePreview] = useState(false)
    const togglePreview = () => {
        updatePreview(showPreview ? false : true);
    }

    return <Fragment>
        <div class="grid grid-cols-3 grid-flow-col gap-4 p-3">
            <div class="col-span-1 grid place-items-center"><ExportButton innerText="Show Meeting Notes" action={togglePreview} /></div>
            <div class="col-span-1 grid place-items-center"><ExportButton innerText="HTML" action={() => alert(`tasks: ${tasks}`)} /></div>
            <div class="col-span-1 grid place-items-center"><ExportButton innerText="three" action={() => alert(`tasks: ${tasks}`)} /></div>
        </div>
        {showPreview && <div class="p-3 bg-gray-300">
            <p><strong>Copy/paste:</strong></p>
            <div contenteditable="true">
                {tasks.map((task, idx) => <p key={idx}>* {task}</p>)}
            </div>
        </div>}
    </Fragment>
}

export { ExportRow }