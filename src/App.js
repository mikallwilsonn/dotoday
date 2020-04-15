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


// If no database is found, set some initial data for the 
// user to see and interact with
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
// App class component
export default class App extends Component {
  constructor() {
    super();

    // Initial state
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
          <svg 
            aria-hidden="true" 
            focusable="false" 
            data-prefix="fas" 
            data-icon="eye-slash" 
            className="svg-inline--fa fa-eye-slash fa-w-20" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 640 512"
          >
            <path 
              fill="currentColor" 
              d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
            ></path>
          </svg>

          <span>
            Hide Completed
          </span>
        </button>
      );
    } else {
      return (
        <button
          className="clear-tasks-btn font-semi-bold"
          onClick={() => this.setState({ hideCompleted: false }) }
        >
          <svg 
            aria-hidden="true" 
            focusable="false" 
            data-prefix="fas" 
            data-icon="eye" 
            className="svg-inline--fa fa-eye fa-w-18" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 576 512"
          >
            <path 
              fill="currentColor" 
              d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
            ></path>
          </svg>

          <span>
            Show Completed
          </span>
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

            <div className="app-actions-wrapper">
              {
                this.state.tasks.length > 0 ?
                  <>
                    <button
                      className="clear-tasks-btn font-semi-bold"
                      onClick={ this.clearAllTasks }
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512"
                      >
                        <path d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"/>
                      </svg>

                      <span>
                        Clear Tasks
                      </span>
                    </button>

                    { this.renderHideCompletedButton() }
                  </>
                :
                  ''
              }
            </div>
          </header>
  
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

          <footer>
            <span className="font-regular">
              Created by <a className="font-bold" href="https://github.com/mikallwilsonn" target="_blank" rel="noopener noreferrer">Michael R. Wilson</a>
            </span>
          </footer>
        </div>

        <ReactTooltip />
      </div>
    );
  }
}
