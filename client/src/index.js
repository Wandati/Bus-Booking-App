import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Home />
    <About />
    <Contact />
    <Signup />
    <Login />
  </React.StrictMode>,

  document.getElementById('root')
);
