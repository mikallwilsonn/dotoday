// ----
// Dependencies
import React, { Component } from 'react';
import './theme/App.css';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import shortid from 'shortid';


// ----
// Child Components
import NewTaskForm from './components/NewTaskForm';
import Task from './components/Task';


// ----
// Database
const adapter = new LocalStorage( 'db' );
const db = low( adapter );

if ( db.get( 'tasks' ).value().length < 1 ) {
  db.defaults({
    tasks: [
      { 
        _id: shortid.generate(),
        text: "Target a specific area for improvement.",
        isCompleted: false 
      },
      { 
        _id: shortid.generate(),
        text: "Quantify or at least suggest an indicator to measure progress.",
        isCompleted: false
      },
      { 
        _id: shortid.generate(),
        text: "State what can realistically be achieved, given available resources",
        isCompleted: false
      },
      { 
        _id: shortid.generate(),
        text: "Specify when the result(s) can be achieved",
        isCompleted: false
      }
    ]
  }).write();
}


// ----
// App
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: db.get( 'tasks' ).value()
    }
  }


  // Add a new task item
  addTask = ( text ) => {
    const tasks = db.get( 'tasks' ).value();

    const newTask = {
      _id: shortid.generate(),
      text,
      isCompleted: false
    }

    db.set( 'tasks', [ ...tasks, newTask ]).write();

    this.setState({ 
      tasks: db.get( 'tasks' ).value() 
    });
  };


  // Set a task item as complete
  completeTask = ( _id ) => {
    db.get( 'tasks' )
      .find({ _id: _id })
      .assign({ isCompleted: true })
      .write();
    
    let dbTasks = db.get( 'tasks' ).value();

    this.setState({ 
      tasks: dbTasks
    });
  };


  // Remove a task item
  removeTask = ( _id ) => {
    db.get( 'tasks' )
      .remove({ _id: _id })
      .write();
    
    let dbTasks = db.get( 'tasks' ).value();

    this.setState({ 
      tasks: dbTasks
    });
  };


  // Clear all tasks
  clearAllTasks = () => {
    db.set( 'tasks', [] ).write();

    let dbTasks = db.get( 'tasks' ).value();

    this.setState({ 
      tasks: dbTasks
    });
  }


  // Render Tasks
  renderTasks = () => {
    const { tasks } = this.state;

    if ( tasks.length > 0 ) {
      return tasks.map(( task ) => (
        <Task
          key={ task._id }
          task={ task } 
          completeTask={ this.completeTask }
          removeTask={ this.removeTask }
        />
      ))
    } else {
      return (
        <span>
          There are currently no tasks to display. Why not add one now?
        </span>
      );
    }
  }


  // ----
  // Render Component
  render() {
    return (
      <div className="app">
        <div className="wrapper">
          <header>
            <h1 className="font-bold">
              Do Today
            </h1>
          </header>
  
          <div className="app-actions-wrapper">
            {
              this.state.tasks.length > 0 ?
                <button
                  className="clear-tasks-btn font-semi-bold"
                  onClick={ this.clearAllTasks }
                >
                  Clear Tasks
                </button>
              :
                ''
            }
          </div>
  
          <div className="new-task-form-wrapper">
              <NewTaskForm addTask={ this.addTask } />
          </div>
  
          <div className="todo-list">
            { this.renderTasks() }
          </div>
        </div>
      </div>
    );
  }
}
