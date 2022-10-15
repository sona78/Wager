import logo from './logo.svg';
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Home from './Home.js'
import Dashboard from './Dashboard.js'


export var HOME = '/'
export var DASHBOARD = '/Dashboard'

class App extends React.Component {
  render(){
    return (
      <ChakraProvider>
        <Router>
          <Routes>
            <Route exact path= {HOME} element={<Home/>}/>
            <Route exact path= {DASHBOARD} element={<Dashboard/>}/>
          </Routes>
        </Router>
      </ChakraProvider>
    );
  }
};

export default App;
