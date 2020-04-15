// ----
// Dependencies
import React from 'react';
import { render, cleanup } from '@testing-library/react';


// ----
// Component
import App from '../App';


// ----
// Test
beforeEach( cleanup );

describe( '<App />', () => {
  it( 'renders the component', () => {
    const { queryByTestId } = render( <App /> );

    expect( queryByTestId( 'application' )).toBeTruthy();
  });
});
