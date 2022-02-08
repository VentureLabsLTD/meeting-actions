import './App.css';
import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

class Button extends React.Component {
  style() {
    return {
      padding: 10,
      width: "18%",
      backgroundColor: this.props.color,
      color: '#00AB91'
    };
  }

  render() {
    return <button style={this.style()} onClick={this.props.onClick}>
      {this.props.children}
    </button>
  }
}

class TaskInput extends React.Component {
  style() {
    return {
      padding: 10,
      width: "75%"
    }
  }

  render() {
    return <input
      style={this.style()}
      placeholder="New Task..."
      value={this.props.value}
      onChange={this.props.onTitleChange}
    />
  }
}

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
      <Button onClick={this.addTask}>Create New</Button>
    </div>
  }
}

class Task extends React.Component {
  constructor() {
    super();
    this.removeItem = this.removeItem.bind(this);
  }
  containerStyle() {
    return {
      paddingLeft: 15,
      paddingTop: 10,
      fontSize: 18,
    }
  }

  textStyle() {
    return {
      display: 'inline-block',
      width: '75%'
    }
  }

  removeItem() {
    this.props.removeTask(this.props.children);
  }

  render() {
    return <div style={this.containerStyle()}>
      <span style={this.textStyle()}>{this.props.children}</span>
      <Button onClick={this.removeItem}>x</Button>
    </div>
  }
}

class TasksList extends React.Component {
  render() {
    let todoList = [];
    let key = 0;
    for (let task of this.props.tasks) {
      todoList.push(
        <Task key={key++} removeTask={this.props.onRemovetask}>
          {task}
        </Task>)
    }
    return <div>{todoList}</div>
  }
}

const CustomEditor = ({ onNewTask }) => {
  const initialValue = "sdfsdff"
  const [value, setValue] = useState(initialValue ?? '');
  useEffect(() => setValue(initialValue ?? ''), [initialValue]);
  const myOnchange = (thing) => {
      // console.log('loggg', thing)
      return (event, editor) => { 
        // console.log('editor all content', editor.getContent()) 
        const value = editor.getDoc().getSelection().focusNode;
        console.log('selection content', editor.getDoc().getSelection().focusNode) 
        // debugger
        // onNewTask(value.data)
      }
  }
  return (
    <Editor
      onMouseUp={myOnchange("heyy")}
      initialValue="my tasks \r sdfsdfsdf \n sdfsdf"
      // onSelectionChange={(stuff) => { console.log('selected', stuff)} }
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
        content_style:'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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
      <div style={{ height: "calc(100vh)", width: "50%", float: "left" }}>
        <CustomEditor onNewTask={this.addTask} />
      </div>
      <div style={{ width: "50%", float: "right" }}>
        <NewTask onNewTask={this.addTask} />
        <TasksList tasks={this.state.tasks} onRemovetask={this.removeTask} />
      </div>
    </div>;
  }
}

export default App;