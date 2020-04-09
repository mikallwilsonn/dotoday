// ----
// Dependencies
import React, { useState } from 'react';


// ----
// Task functional component
export default function Task({ task, completeTask, removeTask, editTask }) {
    const [ value, setValue ] = useState( task.text );

    const [ isEditing, setIsEditing ] = useState( false );


    const handleEdit = ( event ) => {
        event.preventDefault();
  
        editTask( task._id, value );
        setIsEditing( false );
    };


    return (
      <div className={`task ${task.isCompleted ? "completed" : "" }`}>
        <div className="task-complete-wrapper">
            { task.isCompleted === false ?
                <button 
                    className="complete" 
                    onClick={() => completeTask( task._id )}
                >
                    <svg 
                        aria-hidden="true" 
                        focusable="false" d
                        ata-prefix="far" 
                        data-icon="square" 
                        className="svg-inline--fa fa-square fa-w-14" 
                        role="img" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 448 512"
                    >
                        <path 
                            fill="currentColor" 
                            d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"
                        ></path>
                    </svg>
                </button>
                :
                <svg 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="512" 
                    height="512" 
                    viewBox="0 0 512 512"
                >
                    <path d="M432 64l-240 240-112-112-80 80 192 192 320-320z"></path>
                </svg>
            }
        </div>

        <div 
            className="task-label font-semi-bold"
            onClick={() => setIsEditing( true )}
        >
            {
                isEditing === true ?
                    <form onSubmit={ handleEdit }>
                        <input
                            type="text" 
                            className="input font-semi-bold" 
                            value={ value } 
                            placeholder="Type what you have to do here and press ENTER"
                            onChange={( event ) => setValue( event.target.value )} 
                        />
                    </form>
                :
                task.text
            }
        </div>

        <div className="task-actions">
            <button 
                className="delete" 
                onClick={() => removeTask( task._id )}
            >
                <svg 
                    aria-hidden="true" 
                    focusable="false" 
                    data-prefix="fas" 
                    data-icon="trash" 
                    className="svg-inline--fa fa-trash fa-w-14" 
                    role="img" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512"
                >
                    <path 
                        fill="currentColor" 
                        d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                    ></path>
                </svg>
            </button>
        </div>
      </div>
    );
}
