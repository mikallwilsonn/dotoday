import React, { useState } from 'react';
import './App.css';


// ----
// TodoForm
function TodoForm({ addTodo }) {
  const [ value, setValue ] = useState( "" );

  const handleSubmit = event => {
    event.preventDefault();
    if ( !value ) return;
    addTodo( value );
    setValue( "" );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text" 
        className="input" 
        value={value} 
        placeholder="Type in a new todo item..."
        onChange={event => setValue( event.target.value )} 
      />
    </form>
  );
}


// ----
// Todo
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className={`todo  ${todo.isCompleted ? "completed" : "" }`}>
      {todo.text}

      <div>
        <button className="complete" onClick={ () => completeTodo( index )}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
        </button>

        <button className="delete" onClick={() => removeTodo( index )}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/></svg>
        </button>
      </div>
    </div>
  );
}


// ----
// App
function App() {
  const [ todos, setTodos ] = useState([
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
  ]);


  // Add a new Todo item
  const addTodo = text => {
    const newTodos = [ ...todos, { text }];
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


  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo} 
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}

        <TodoForm 
          addTodo={addTodo} 
        />
      </div>
    </div>
  );

}

export default App;
