import React, { Fragment } from 'react';

const ExportButton = ({ innerText, action }) => {
    return <button class="text-gray-700 p-2 bg-gray-300 hover:bg-gray-400 rounded-md w-full" onClick={action}>{innerText}</button>
}

const ExportRow = ({ tasks }) => {
    return <Fragment>
        <div class="grid grid-cols-3 grid-flow-col gap-4 p-3">
            <div class="col-span-1 grid place-items-center"><ExportButton innerText="Markdown" action={() => alert(`tasks: ${tasks}`)} /></div>
            <div class="col-span-1 grid place-items-center"><ExportButton innerText="HTML" action={() => alert(`tasks: ${tasks}`)} /></div>
            <div class="col-span-1 grid place-items-center"><ExportButton innerText="three" action={() => alert(`tasks: ${tasks}`)} /></div>
        </div>
    </Fragment>
}

export { ExportRow }