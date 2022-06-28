import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import App2 from './App2'
import App from './Potofolio'
import reportWebVitals from './reportWebVitals';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import About from './About';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
    <BrowserRouter>
    <Route exact path="/">
    <App />
    </Route>
    <Route path ="/about">
      <About />
    </Route>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
