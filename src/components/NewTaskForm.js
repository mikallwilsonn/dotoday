// ----
// Dependencies
import React, { useState } from 'react';


// ----
// NewTaskForm functional component
export default function NewTaskForm({ addTodo }) {
    const [ value, setValue ] = useState( "" );
  
    const handleSubmit = event => {
      event.preventDefault();

      if ( !value ) return;

      addTodo( value );
      setValue( "" );
    };


    return (
      <form onSubmit={ handleSubmit }>
        <input
          type="text" 
          className="input font-regular" 
          value={ value } 
          placeholder="Type what you have to do here..."
          onChange={( event ) => setValue( event.target.value )} 
        />
      </form>
    );
}
