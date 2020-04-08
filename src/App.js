// ----
// Dependencies
import React, { useState } from 'react';
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
export default function App() {
  const [ tasks, setTasks ] = useState(
    db.get( 'tasks' ).value()
  );


  // Add a new Todo item
  const addTask = text => {
    const tasks = db.get( 'tasks' ).value();

    const newTask = {
      _id: shortid.generate(),
      text,
      isCompleted: false
    }

    db.set( 'tasks', [ ...tasks, newTask ]).write();

    setTasks( db.get( 'tasks' ).value() );

  };


  // Set a todo item as complete
  const completeTask = index => {
    const newTasks = [ ...tasks ];
    newTasks[ index ].isCompleted = true;
    setTasks( newTasks );
  };


  // Remove a todo item
  const removeTask = ( _id ) => {
    db.get( 'tasks' )
      .remove({ _id: _id })
      .write();
    
    setTasks( db.get( 'tasks' ).value() );
  };


  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  }


  // Render Tasks
  const renderTasks = () => {
    if ( tasks.length > 0 ) {
      return tasks.map(( task ) => (
        <Task
          key={ task._id }
          task={ task } 
          completeTodo={ completeTask }
          removeTask={ removeTask }
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
            tasks.length > 0 ?
              <button
                className="clear-tasks-btn font-semi-bold"
                onClick={ clearAllTasks }
              >
                Clear Tasks
              </button>
            :
              ''
          }
        </div>

        <div className="new-task-form-wrapper">
            <NewTaskForm addTask={ addTask } />
        </div>

        <div className="todo-list">
          { renderTasks() }
        </div>
      </div>
    </div>
  );
}
