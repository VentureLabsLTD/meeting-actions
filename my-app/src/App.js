import './App.css';
import React, { Fragment } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const Button = ({ children, onClick, className }) => <button className={className} onClick={onClick}>
  {children}
</button>

const TaskInput = ( { value, onTitleChange }) => <input
  placeholder="New Task..."
  value={value}
  onChange={onTitleChange}
/>

class NewTask extends React.Component {
  constructor() {
    super();

    this.state = {
      newTitle: '',
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  onTitleChange(evt) {
    this.setState({ newTitle: evt.target.value });
  }

  addTask() {
    this.setState({ newTitle: '' });
    this.props.onNewTask(this.state.newTitle);
  }

  render() {
    return <div>
      <TaskInput value={this.state.newTitle} onTitleChange={this.onTitleChange} />
      <Button className="createNew" onClick={this.addTask}>Create New</Button>
    </div>
  }
}

const Task = ({ removeItem, removeTask, children}) => <div class="taskWrapper">
  <div className="taskName">{children}</div>
  <Button className="removeTask" onClick={() => removeTask(children)}>x</Button>
</div>

const TasksList = ({tasks, onRemovetask}) => {
  let todoList = [];
  let key = 0;
  for (let task of tasks) {
    todoList.push(
      <Task key={key++} removeTask={onRemovetask}>
        {task}
      </Task>)
  }
  return <Fragment>{todoList}</Fragment>
}

const CustomEditor = ({ onNewTask }) => {
  const myOnchange = (_, editor) => { 
    const { data } = editor.getDoc().getSelection().focusNode;
    console.log('selection content', editor.getDoc().getSelection().focusNode) 
    onNewTask(data)
  }
  return (
    <Editor
      onMouseUp={myOnchange}
      initialValue="your tasks here"
      init={{
        height: "100vh",
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media textpattern table paste code help wordcount'
        ],
        textpattern_patterns: [
          {start: '*', end: '*', format: 'italic'},
          {start: '**', end: '**', format: 'bold'},
          {start: '#', format: 'h1'},
          {start: '##', format: 'h2'},
          {start: '###', format: 'h3'},
          {start: '####', format: 'h4'},
          {start: '#####', format: 'h5'},
          {start: '######', format: 'h6'},
          {start: '1. ', cmd: 'InsertOrderedList'},
          {start: '\/task ', cmd: 'InsertUnorderedList'},
          {start: '- ', cmd: 'InsertUnorderedList'}
       ],
        toolbar: '',
        // toolbar: 'undo redo | formatselect | ' +
        // 'bold italic backcolor | alignleft aligncenter ' +
        // 'alignright alignjustify | bullist numlist outdent indent | ' +
        // 'removeformat | help',
        content_style:'body { font-family:Helvetica,Arial,sans-serif; font-size:25px }'
      }}
    />
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  addTask(taskTitle) {
    this.state.tasks.push(taskTitle);
    this.setState({ tasks: this.state.tasks });
  }

  removeTask(taskTitle) {
    const index = this.state.tasks.indexOf(taskTitle);
    this.state.tasks.splice(index, 1); // remove one item
    this.setState({ tasks: this.state.tasks });
  }

  render() {
    return <div>
        <div className="header"> Meeting Notes App ✅ </div>
        <div style={{ height: "calc(100vh)", width: "50%", float: "left" }}>
          <CustomEditor onNewTask={this.addTask} />
        </div>
        <div style={{ width: "50%", float: "right" }}>
          <div className="taskHeader">Task List ({this.state.tasks.length || 0}) 👇</div>
          <NewTask onNewTask={this.addTask} />
          <TasksList tasks={this.state.tasks} onRemovetask={this.removeTask} />
        </div>
      <div/>
    </div>;
  }
}

export default App;
