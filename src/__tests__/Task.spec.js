// ----
// Dependencies
import React from 'react';
import shortid from 'shortid';
import { render, cleanup } from '@testing-library/react';


// ----
// Component
import Task from '../components/Task';


// ----
// Test
beforeEach( cleanup );

describe( '<Task />', () => {
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

        expect( queryByTestId( `task` )).toBeTruthy();
    });
});
