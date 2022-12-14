import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./client-site/Home.js";
import Dashboard from "./Dashboard.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Leaderboard from "./Leaderboard.js";
import Wallet from "./Wallet.js";

export var HOME = "/";
export var DASHBOARD = "/Dashboard";
export var LOGIN = "/login";
export var SIGNUP = "/signup";
export var LEADERBOARD = "/Leaderboard";
export var WALLET = "/Wallet";

class App extends React.Component {
  render() {
    return (
      <ChakraProvider>
        <Router>
          <Routes>
            <Route exact path={HOME} element={<Home />} />
            <Route exact path={DASHBOARD} element={<Dashboard />} />
            <Route exact path={LOGIN} element={<Login />} />
            <Route exact path={WALLET} element={<Wallet />} />
            <Route exact path={SIGNUP} element={<Signup />} />
            <Route exact path={LEADERBOARD} element={<Leaderboard />} />
          </Routes>
        </Router>
      </ChakraProvider>
    );
  }
}

export default App;
