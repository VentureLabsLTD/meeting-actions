import logo from './logo.svg';
import './App.css';
import React from 'react';

class Button extends React.Component {
  style() {
    return {
      padding: 10,
      backgroundColor: this.props.color,
      color: 'white'
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
      <Button onClick={this.addTask} color="green">Create New</Button>
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
      width: 150,
    }
  }

  removeItem() {
    this.props.removeTask(this.props.children);
  }

  render() {
    return <div style={this.containerStyle()}>
      <span style={this.textStyle()}> - {this.props.children} </span>
      <Button onClick={this.removeItem} color="red">Remove</Button>
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
      <div style={{ width: "50%", float: "left" }}>
        <div className="App">
          <form method="post">
            <textarea id="mytextarea">Hello, World!</textarea>
          </form>
        </div>
      </div>
      <div style={{ width: "50%", float: "right" }}>
        <NewTask onNewTask={this.addTask} />
        <TasksList tasks={this.state.tasks} onRemovetask={this.removeTask} />
      </div>
    </div>;
  }
}

export default App;
