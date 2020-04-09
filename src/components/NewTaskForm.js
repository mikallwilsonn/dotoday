// ----
// Dependencies
import React, { useState } from 'react';


// ----
// NewTaskForm functional component
export default function NewTaskForm({ addTask }) {
    const [ value, setValue ] = useState( "" );
  
    const handleSubmit = event => {
      event.preventDefault();

      if ( !value ) return;

      addTask( value );
      setValue( "" );
    };


    return (
      <form onSubmit={ handleSubmit }>
        <input
          type="text" 
          className="input font-regular" 
          value={ value } 
          placeholder="Type what you have to do here and press ENTER"
          onChange={( event ) => setValue( event.target.value )} 
        />
      </form>
    );
}
