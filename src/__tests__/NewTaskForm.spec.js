// ----
// Dependencies
import React from 'react';
import { render, cleanup } from '@testing-library/react';


// ----
// Component
import NewTaskForm from '../components/NewTaskForm';


// ----
// Test
beforeEach( cleanup );

describe( '<NewTaskForm />', () => {
    it( 'renders the component', () => {
        const { queryByTestId } = render( <NewTaskForm /> );

        expect( queryByTestId( 'new-task-form' )).toBeTruthy();
    });
});
