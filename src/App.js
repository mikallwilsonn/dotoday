// ----
// Dependencies
import React, { useState } from 'react';
import './theme/App.css';


// ----
// Child Components
import NewTaskForm from './components/NewTaskForm';
import Task from './components/Task';


// ----
// App
export default function App() {
  const [ todos, setTodos ] = useState(
    [
      { 
        text: "Build Design Prototype.",
        isCompleted: false 
      },
      { 
        text: "Code the front-end.",
        isCompleted: false
      },
      { 
        text: "Build the backend server.",
        isCompleted: false
      },
      { 
        text: "Connect some integrations.",
        isCompleted: false
      }
    ]
  );


  // Add a new Todo item
  const addTodo = text => {
    const newTodos = [ ...todos, { text, isCompleted: false }];
    setTodos( newTodos );
  };

  // Set a todo item as complete
  const completeTodo = index => {
    const newTodos = [ ...todos ];
    newTodos[ index ].isCompleted = true;
    setTodos( newTodos );
  };

  // Remove a todo item
  const removeTodo = index => {
    const newTodos = [ ...todos ];
    newTodos.splice( index, 1 );
    setTodos( newTodos );
  };


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

        <div className="new-task-form-wrapper">
            <NewTaskForm addTodo={addTodo} />
        </div>

        <div className="todo-list">
          {todos.map((todo, index) => (
            <Task
              key={index}
              index={index}
              todo={todo} 
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
