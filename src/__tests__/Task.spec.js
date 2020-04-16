// ----
// Dependencies
import React from 'react';
import shortid from 'shortid';
import { render, cleanup, fireEvent } from '@testing-library/react';


// ----
// Component
import Task from '../components/Task';
import App from '../App';


// ----
// Test
beforeEach( cleanup );

describe( '<Task />', () => {

    // --
    it( 'renders the component', () => {
        const task = { 
            _id: shortid.generate(),
            text: "Specify when the result(s) can be achieved",
            isCompleted: false,
            date_created: Date.now(),
            date_completed: null 
        }

        const testTaskFunction = ( func ) => {
            console.log( `${func} was triggered` );
        }

        const { queryByTestId } = render( 
            <Task
                key={ task._id }
                task={ task } 
                completeTask={() => testTaskFunction( 'completeTask' ) }
                removeTask={() => testTaskFunction( 'removeTask' ) }
                editTask={() => testTaskFunction( 'editTask' ) }
            /> 
        );

        expect( queryByTestId( 'task' )).toBeTruthy();
    });


    // --
    it( 'can mark task as complete by clicking the Task Complete Button', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );

        fireEvent.click( queryByTestId( `task-complete-button-${task_id}` ) );

        setTimeout(() => {
            const tasks = queryAllByTestId( 'task' );

            const completedTask = tasks.find( 
                task => task.id === `Task-${ task_id }` 
            );

            expect( completedTask.classList.contains( 'completed' )).toBeTruthy();
        }, 500 );
    });


    // --
    it( 'can mark task as complete by clicking the Task Uncomplete Button', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );

        fireEvent.click( queryByTestId( `task-complete-button-${task_id}` ) );

        setTimeout(() => {
            let tasks = queryAllByTestId( 'task' );

            const completedTask = tasks.find( 
                task => task.id === `Task-${ task_id }` 
            );

            if ( completedTask.classList.contains( 'completed' ) ) {
                fireEvent.click( queryByTestId( `task-uncomplete-button-${task_id}` ) );

                setTimeout(() => {
                    tasks = queryAllByTestId( 'task' );

                    const uncompletedTask = tasks.find( 
                        task => task.id === `Task-${ task_id }` 
                    );

                    expect( uncompletedTask.classList.contains( 'completed' )).toBeFalsey();
                }, 500 );
            }
        }, 500 );
    });


    // --
    it( 'renders the Task Edit Form when clicking the Task Edit Button', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );

        fireEvent.click( queryByTestId( `task-edit-button-${task_id}` ));

        setTimeout(() => {
            expect( queryByTestId( `task-edit-form-${task_id}` )).toBeTruthy();
        }, 500 );
    });


    // --
    it( 'renders the Cancel Edit Task Button when clicking the Task Edit button', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );

        fireEvent.click( queryByTestId( `task-edit-button-${task_id}` ));

        setTimeout(() => {
            expect( queryByTestId( `task-cancel-edit-button-${task_id}` )).toBeTruthy();
        }, 500 );
    });


    // --
    it( 'cancels the Task Edit Form when clicking the Cancel Edit Task Button', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );

        fireEvent.click( queryByTestId( `task-edit-button-${task_id}` ));

        setTimeout(() => {
            fireEvent.click( queryByTestId( `task-cancel-edit-button-${task_id}` ));

            setTimeout(() => {
                expect( queryByTestId( `task-edit-form-${task_id}` )).toBeFalsey();
            }, 500 );
        }, 500 );
    });


    // --
    it( 'can edit a task and save its updated text value', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );
        const labelBeforeEdit = queryByTestId( `task-label-${task_id}` ).textContent;

        fireEvent.click( queryByTestId( `task-edit-button-${task_id}` ));

        setTimeout(() => {
            fireEvent.change( queryByTestId( `task-edit-form-input-${task_id}` ), {
                target: { value: 'This is the updated test value' }
            });

            setTimeout(() => {
                fireEvent.submit( queryByTestId( `task-edit-form-${task_id}` ));

                setTimeout(() => {
                    const labelAfterEdit = queryByTestId( `task-label-${task_id}` ).textContent;

                    expect( labelAfterEdit !== labelBeforeEdit ).toBeTruthy();
                }, 500 );
            }, 500 );
        }, 500 );
    });


    // --
    it( 'can edit a task, cancel, and the edited change is not saved', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );
        const labelBeforeEdit = queryByTestId( `task-label-${task_id}` ).textContent;

        fireEvent.click( queryByTestId( `task-edit-button-${task_id}` ));

        setTimeout(() => {
            fireEvent.change( queryByTestId( `task-edit-form-input-${task_id}` ), {
                target: { value: 'This is the updated test value' }
            });

            setTimeout(() => {
                fireEvent.click( queryByTestId( `task-cancel-edit-button-${task_id}` ));

                setTimeout(() => {
                    const labelAfterEdit = queryByTestId( `task-label-${task_id}` ).textContent;

                    expect( labelAfterEdit === labelBeforeEdit ).toBeTruthy();
                }, 500 );
            }, 500 );
        }, 500 );
    });


    // --
    it( 'can delete a task', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );

        fireEvent.click( queryByTestId( `task-delete-button-${task_id}` ));

        setTimeout(() => {
            const tasksAfterDelete = queryAllByTestId( 'task' );

            const deletedTask = tasksAfterDelete.find( 
                task => task.id === `Task-${ task_id }` 
            );

            expect( deletedTask ).toBeFalsey();
        }, 500 );
    });


    // --
    it( 'can mark task as complete by clicking the Task Complete Button', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        const task = queryAllByTestId( 'task' )[0];
        const task_id = task.getAttribute( 'data-taskid' );

        fireEvent.click( queryByTestId( `task-complete-button-${task_id}` ) );

        setTimeout(() => {
            fireEvent.click( queryByTestId( `task-delete-button-${task_id}` ));

            setTimeout(() => {
                const tasksAfterDelete = queryAllByTestId( 'task' );
    
                const deletedTask = tasksAfterDelete.find( 
                    task => task.id === `Task-${ task_id }` 
                );
    
                expect( deletedTask ).toBeFalsey();
            }, 500 );
        }, 500 );
    });
});
