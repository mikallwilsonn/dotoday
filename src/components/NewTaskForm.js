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

      document.querySelector( '#NewTaskForm' ).classList.remove( 'creating' );
      document.querySelector( '#AddNewTaskButton' ).disabled = true;
    };


    // Handle changing the value of the task input
    const handleChange = ( value ) => {
      setValue( value );

      if ( value.length > 0 ) {
        document.querySelector( '#AddNewTaskButton' ).disabled = false;
      } else {
        document.querySelector( '#AddNewTaskButton' ).disabled = true;
      }
    }

    // Rendering the component
    return (
      <form 
        id="NewTaskForm"
        onSubmit={ handleSubmit }
      >
        <button 
          id="AddNewTaskButton"
          data-tip="Add New Task"
          type="submit"
          disabled={ true }
          tabIndex={ 0 }
          aria-label="Add new task"
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
          onChange={( event ) => handleChange( event.target.value )} 
          onClick={() => document.querySelector( '#NewTaskForm' ).classList.add( 'creating' )}
          onBlur={() => document.querySelector( '#NewTaskForm' ).classList.remove( 'creating' )}
          aria-required={ true }
          tabIndex={ 0 }
          aria-label="New task text"
          required
        />
      </form>
    );
}
