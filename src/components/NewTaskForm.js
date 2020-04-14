// ----
// Dependencies
import React, { useState } from 'react';


// ----
// NewTaskForm functional component
export default function NewTaskForm({ addTask }) {
    const [ value, setValue ] = useState( "" );
  
    // Handling the functionality of submitting the form for a new task
    const handleSubmit = event => {
      event.preventDefault();

      if ( !value ) return;

      addTask( value );
      setValue( "" );
    };

    // Rendering the component
    return (
      <form onSubmit={ handleSubmit }>
        <button 
          data-tip="Add New Task"
          type="submit"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512"
          >
            <path d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z"/>
          </svg>
        </button>

        <input
          type="text" 
          className="input font-regular" 
          value={ value } 
          placeholder="What do you have to do today?"
          onChange={( event ) => setValue( event.target.value )} 
        />
      </form>
    );
}
