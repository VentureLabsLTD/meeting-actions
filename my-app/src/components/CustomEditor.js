import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const CustomEditor = ({ onNewTask, onChange }) => {
    const myOnchange = (_, editor) => {
        const { data } = editor.getDoc().getSelection().focusNode;
        console.log('selection content', editor.getDoc().getSelection().focusNode)
        debugger
        // onNewTask(data)
    }

    const wrapAssignee = (_, editor) => {
        const content = editor.getContent()
        const contentWithoutPeople = content.split(/@[a-z]+|<span class="customThing">@[a-z]+<\/span>/g);
        const people = content.match(/@[a-z]+|<span class="customThing">@[a-z]+<\/span>/g);
        console.log('content', content)
        console.log('contentWithoutPeople', contentWithoutPeople);
        console.log('people', people);
        // debugger
        const result = contentWithoutPeople.reduce((agg, content, index) => {
            const result = [...agg, content]
            const wrappedPerson = `<span class="customThing">${people[index]}</span>`;
            const currentPerson = people[index];
            console.log('current person', currentPerson)
            if (currentPerson && currentPerson.includes('<span class="customThing">')) {
                console.log('found wrapped person, push')
                result.push(currentPerson);
            } else if (currentPerson) {
                console.log('found not wrapped person, push', wrappedPerson)
                result.push(wrappedPerson);
            }
            return result
        }, []).join('');
        console.log('content', content);
        if (content !== result) {
            console.log('render!!!')
            editor.setContent(result);
        }
    }

    return (
        <Editor
            onMouseUp={myOnchange}
            onKeyUp={wrapAssignee}
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
                content_style: '.customThing {background-color: grey} body { font-family:Helvetica,Arial,sans-serif; font-size:25px; }'
            }
            }
        />
    );
}

export { CustomEditor }