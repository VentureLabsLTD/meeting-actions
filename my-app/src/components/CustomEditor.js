import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const CustomEditor = ({ onNewTask, onChange }) => {
    const myOnchange = (_, editor) => {
        const { data } = editor.getDoc().getSelection().focusNode;
        console.log('selection content', editor.getDoc().getSelection().focusNode)
        onNewTask(data)
    }
    return (
        <Editor
            onMouseUp={myOnchange}
            onKeyUp={onChange}
            // initialValue="What do you need to discuss?"
            initialValue="Meeting notes: @james, @lou, @rory, @bob"
            init={{
                height: "100vh",
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media textpattern table paste code help wordcount'
                ],
                textpattern_patterns: [
                    { start: '*', end: '*', format: 'italic' },
                    { start: '**', end: '**', format: 'bold' },
                    { start: '#', format: 'h1' },
                    { start: '##', format: 'h2' },
                    { start: '###', format: 'h3' },
                    { start: '####', format: 'h4' },
                    { start: '#####', format: 'h5' },
                    { start: '######', format: 'h6' },
                    { start: '1. ', cmd: 'InsertOrderedList' },
                    { start: '\/task ', cmd: 'InsertUnorderedList' },
                    { start: '- ', cmd: 'InsertUnorderedList' }
                ],
                toolbar: '',
                // toolbar: 'undo redo | formatselect | ' +
                // 'bold italic backcolor | alignleft aligncenter ' +
                // 'alignright alignjustify | bullist numlist outdent indent | ' +
                // 'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:25px }'
            }
            }
        />
    );
}

export { CustomEditor }