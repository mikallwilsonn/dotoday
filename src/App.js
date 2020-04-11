// ----
// Dependencies
import React, { Component } from 'react';
import './theme/App.css';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import shortid from 'shortid';
import ReactTooltip from 'react-tooltip';


// ----
// Child Components
import NewTaskForm from './components/NewTaskForm';
import Task from './components/Task';




// ----
// Database
const adapter = new LocalStorage( 'db' );
const db = low( adapter );

if ( db.get( 'tasks' ).value() === undefined ) {

  const date = Date.now();

  db.defaults({
    tasks: [
      { 
        _id: shortid.generate(),
        text: "Target a specific area for improvement.",
        isCompleted: false,
        date_created: date,
        date_completed: null 
      },
      { 
        _id: shortid.generate(),
        text: "Quantify or at least suggest an indicator to measure progress.",
        isCompleted: false,
        date_created: date,
        date_completed: null 
      },
      { 
        _id: shortid.generate(),
        text: "State what can realistically be achieved, given available resources",
        isCompleted: false,
        date_created: date,
        date_completed: null 
      },
      { 
        _id: shortid.generate(),
        text: "Specify when the result(s) can be achieved",
        isCompleted: false,
        date_created: date,
        date_completed: null 
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
      tasks: db.get( 'tasks' ).value(),
      hideCompleted: false
    }
  }


  // Add a new task item
  addTask = ( text ) => {
    const tasks = db.get( 'tasks' ).value();

    const newTask = {
      _id: shortid.generate(),
      text,
      isCompleted: false,
      date_created: Date.now(),
      date_completed: null
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
      .assign({ isCompleted: true, date_completed: Date.now() })
      .write();
    
    let dbTasks = db.get( 'tasks' ).value();

    this.setState({ 
      tasks: dbTasks
    });
  };


  // Undo task completion and set it to be open
  uncompleteTask = ( _id ) => {
    db.get( 'tasks' )
      .find({ _id: _id })
      .assign({ isCompleted: false, date_completed: null })
      .write();
    
    let dbTasks = db.get( 'tasks' ).value();

    this.setState({ 
      tasks: dbTasks
    });
  }


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
  renderOpenTasks = () => {
    const { tasks } = this.state;

    if ( tasks.length > 0 ) {
      return tasks.map(( task ) => {
        if ( task.isCompleted === false ) {
          return (
            <Task
              key={ task._id }
              task={ task } 
              completeTask={ this.completeTask }
              removeTask={ this.removeTask }
              editTask={ this.editTask }
            />
          );
        } else {
          return '';
        }
      });
  } else {
      return (
        <span>
          There are currently no tasks to display. Why not add one now?
        </span>
      );
    }
  }


  // Render Completed Tasks
  renderCompletedTasks = () => {
    const { tasks } = this.state;

    if ( tasks.length > 0 ) {
        return tasks.map(( task ) => {
          if ( task.isCompleted === true ) {
            return (
              <Task
                key={ task._id }
                task={ task } 
                completeTask={ this.completeTask }
                uncompleteTask={ this.uncompleteTask }
                removeTask={ this.removeTask }
                editTask={ this.editTask }
              />
            );
          } else {
            return '';
          }
        });
    } else {
      return '';
    }
  }


  // Editing a task
  editTask = ( _id, text ) => {
    db.get( 'tasks' )
      .find({ _id: _id })
      .assign({ text: text })
      .write();
    
    let dbTasks = db.get( 'tasks' ).value();

    this.setState({ 
      tasks: dbTasks
    });
  }


  // Render a button to toggle showing completed tasks
  renderHideCompletedButton() {
    const { hideCompleted } = this.state;

    if ( hideCompleted === false ) {
      return (
        <button
          className="clear-tasks-btn font-semi-bold"
          onClick={() => this.setState({ hideCompleted: true }) }
        >
          Hide Completed
        </button>
      );
    } else {
      return (
        <button
          className="clear-tasks-btn font-semi-bold"
          onClick={() => this.setState({ hideCompleted: false }) }
        >
          Show Completed
        </button>
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
                <>
                  <button
                    className="clear-tasks-btn font-semi-bold"
                    onClick={ this.clearAllTasks }
                  >
                    Clear Tasks
                  </button>

                  { this.renderHideCompletedButton() }
                </>
              :
                ''
            }
          </div>
  
          <div className="new-task-form-wrapper">
              <NewTaskForm addTask={ this.addTask } />
          </div>
  
          <div className="todo-list">
            { this.renderOpenTasks() }

            { this.state.hideCompleted === false ?
                this.renderCompletedTasks() 
              :
                ''
            }
          </div>
        </div>

        <ReactTooltip />
      </div>
    );
  }
}
