// ----
// Dependencies
import React, { useState } from 'react';
import moment from 'moment';


// ----
// Task functional component
export default function Task({ task, completeTask, uncompleteTask, removeTask, editTask }) {
    // State, hooks
    const [ value, setValue ] = useState( task.text );
    const [ isEditing, setIsEditing ] = useState( false );


    // Initializing the editing of tasks
    const initEdit = () => {
        setIsEditing( true );

        // Waiting for and ensuring the state has changed and 
        // the form to render to focus on the input.
        setTimeout(() => {
            document.querySelector( `#task-form-${task._id} input` ).focus();
        }, 1000 );
    }


    // Saving the task edit
    const handleEdit = ( event ) => {
        event.preventDefault();
  
        editTask( task._id, value );
        setIsEditing( false );
    };


    // Rendering the component
    return (
        <div 
            className={`task ${task.isCompleted ? "completed" : "" } ${ isEditing ? 'editing' : ''}`}
        >
            <div className="task-complete-wrapper">
                { task.isCompleted === false ?
                    <button 
                        className="complete" 
                        onClick={() => completeTask( task._id )}
                        data-tip="Mark as complete"
                    >
                        <svg 
                            aria-hidden="true" 
                            focusable="false" 
                            data-prefix="far" 
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
                    <button
                        className="uncomplete" 
                        onClick={() => uncompleteTask( task._id )}
                        data-tip="Undo task completion"
                    >
                        <svg 
                            version="1.1" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="512" 
                            height="512" 
                            viewBox="0 0 512 512"
                        >
                            <path d="M432 64l-240 240-112-112-80 80 192 192 320-320z"></path>
                        </svg>
                    </button>
                }
            </div>

            <div className="task-label">
                {
                    isEditing === true ?
                        <form 
                            id={`task-form-${task._id}`}
                            onSubmit={ handleEdit }
                        >
                            <input
                                type="text" 
                                className="input font-semi-bold" 
                                value={ value } 
                                placeholder="Type what you have to do here and press ENTER"
                                onChange={( event ) => setValue( event.target.value )} 
                            />
                        </form>
                    :
                        <>
                            <span className="task-label-text font-semi-bold">
                                { task.text }
                            </span>
                            
                            <span className="task-label-date_created font-semi-regular">
                                {
                                    task.isCompleted === false ?
                                        <>
                                            Created { moment( task.date_created ).fromNow() }
                                        </>
                                    :
                                        <>
                                            Completed { moment( task.date_completed ).fromNow() } on { moment( task.date_completed ).format( "dddd, MMMM Do YYYY, h:mm:ss a" ) }
                                        </>
                                }
                            </span>
                        </>
                }
            </div>

            <div className="task-actions">
                { task.isCompleted === false ?
                    isEditing === false ?
                        <button 
                            className="edit" 
                            onClick={() => initEdit( task._id )}
                            data-tip="Edit task?"
                        >
                            <svg 
                                version="1.1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="379" 
                                height="448" 
                                viewBox="0 0 379 448"
                            >
                                <path 
                                    d="M90.75 384l22.75-22.75-58.75-58.75-22.75 22.75v26.75h32v32h26.75zM221.5 152c0-3.25-2.25-5.5-5.5-5.5-1.5 0-3 0.5-4.25 1.75l-135.5 135.5c-1.25 1.25-1.75 2.75-1.75 4.25 0 3.25 2.25 5.5 5.5 5.5 1.5 0 3-0.5 4.25-1.75l135.5-135.5c1.25-1.25 1.75-2.75 1.75-4.25zM208 104l104 104-208 208h-104v-104zM378.75 128c0 8.5-3.5 16.75-9.25 22.5l-41.5 41.5-104-104 41.5-41.25c5.75-6 14-9.5 22.5-9.5s16.75 3.5 22.75 9.5l58.75 58.5c5.75 6 9.25 14.25 9.25 22.75z"
                                ></path>
                            </svg>
                        </button>
                    :
                        <button 
                            className="cancel-edit" 
                            onClick={() => setIsEditing( false )}
                            data-tip="Cancel edit?"
                        >
                            <svg 
                                aria-hidden="true" 
                                focusable="false" 
                                data-prefix="fas" 
                                data-icon="ban" 
                                class="svg-inline--fa fa-ban fa-w-16" 
                                role="img" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512"
                            >
                                <path 
                                    fill="currentColor" 
                                    d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"
                                ></path>
                            </svg>
                        </button>
                :
                    ''
                }

                <button 
                    className="delete" 
                    onClick={() => removeTask( task._id )} 
                    data-tip="Delete task?"
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
