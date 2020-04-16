// ----
// Dependencies
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';


// ----
// Component
import App from '../App';


// ----
// Test
beforeEach( cleanup );

describe( '<App />', () => {

  // --
  it( 'renders the component', () => {
    const { queryByTestId } = render( <App /> );

    expect( queryByTestId( 'application' )).toBeTruthy();
  });


  // --
  it( 'renders a list of tasks', () => {
    const { queryAllByTestId } = render( <App /> );

    expect( queryAllByTestId( 'task' ).length > 0 ).toBeTruthy();
  });


  // --
  it( 'renders the Clear Tasks Button', () => {
    const { queryByTestId } = render( <App /> );

    expect( queryByTestId( 'clear-tasks-button' )).toBeTruthy();
  });


  // --
  it( 'can delete all tasks with the Clear Tasks Button', () => {
    const { queryByTestId, queryAllByTestId } = render( <App /> );

    fireEvent.click( queryByTestId( 'clear-tasks-button' ));

    setTimeout(() => {
      expect( queryAllByTestId( 'task' ).length === 0 ).toBeTruthy();
    }, 500 );
  });


  // --
  it( 'renders the Hide Completed Button', () => {
    const { queryByTestId } = render( <App setTestTasks={ true } /> );

    expect( queryByTestId( 'hide-completed-button' )).toBeTruthy();
  });


  // --
  it( 'can hide completed tasks with the Hide Completed Button', () => {
    const { queryByTestId, queryAllByTestId } = render( <App /> );

    fireEvent.click( queryByTestId( 'hide-completed-button' ));

    setTimeout(() => {
      const tasks = queryAllByTestId( 'task' );

      let numOfCompleted = 0;

      tasks.forEach(( task ) => {
        if ( task.classList.contains( 'completed' ) ) {
          numOfCompleted++;
        }
      });

      expect( numOfCompleted.length === 0 ).toBeTruthy();
    }, 500 );
  });


  // --
  it( 'renders the Show Completed Button', () => {
    const { queryByTestId } = render( <App /> );

    fireEvent.click( queryByTestId( 'hide-completed-button' ));

    setTimeout(() => {
      expect( queryByTestId( 'show-completed-button' )).toBeTruthy();
    }, 500 );
  });


  // --
  it( 'can show completed tasks after hiding them with the Show Completed Button', () => {
    const { queryByTestId, queryAllByTestId } = render( <App /> );

    fireEvent.click( queryByTestId( 'hide-completed-button' ));

    setTimeout(() => {
      let tasks = queryAllByTestId( 'task' );

      let numOfCompleted = 0;

      tasks.forEach(( task ) => {
        if ( task.classList.contains( 'completed' ) ) {
          numOfCompleted++;
        }
      });

      if( numOfCompleted === 0 ) {
        fireEvent.click( queryByTestId( 'show-completed-button' ));

        setTimeout(() => {
          tasks = queryAllByTestId( 'task' );

          numOfCompleted = 0;
    
          tasks.forEach(( task ) => {
            if ( task.classList.contains( 'completed' ) ) {
              numOfCompleted++;
            }
          });

          expect( numOfCompleted.length > 0 ).toBeTruthy();
        }, 500)
      };
    }, 500 );
  });
});
