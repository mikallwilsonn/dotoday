// ----
// Dependencies
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';


// ----
// Component
import NewTaskForm from '../components/NewTaskForm';
import App from '../App';


// ----
// Test
beforeEach( cleanup );

describe( '<NewTaskForm />', () => {
    // --
    it( 'renders the component', () => {
        const { queryByTestId } = render( <NewTaskForm /> );

        expect( queryByTestId( 'new-task-form' )).toBeTruthy();
    });


    // --
    it( 'cannot be submitted without input value', () => {
        const { queryByTestId } = render( <App /> );

        expect( queryByTestId( 'new-task-form-submit-button' ).disabled === true ).toBeTruthy();
    }); 


    // --
    it( 'can create and save a new task', () => {
        const { queryByTestId, queryAllByTestId } = render( <App /> );

        let numOfTasksBefore = queryAllByTestId( 'task' ).length;

        fireEvent.change( queryByTestId( 'new-task-form-input' ), {
            target: { value: 'a new test task' }
        });

        setTimeout(() => {
            fireEvent.click( queryByTestId( 'new-task-form-submit-button' ));

            setTimeout(() => {
                let numOfTasksAfter = queryAllByTestId( 'task' ).length;

                expect( numOfTasksAfter > numOfTasksBefore ).toBeTruthy();
            }, 500 );
        }, 500 );
    });
});
