// ----
// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import './theme/index.css';
import * as serviceWorker from './serviceWorker';


// ----
// Main App component
import App from './App';


// ----
// Rendering the application
ReactDOM.render(
    <App />, 
    document.getElementById('root')
);


// To have app work as a PWA...
// change unregister() to register().
serviceWorker.unregister();
