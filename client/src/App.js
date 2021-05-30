import React, { Fragment, useState, useEffect } from "react";
import "./App.css";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

/* 
  useEffect() = makes sure that the state is rendered even with refreshing the website. 
  so if im authenticated and reload the web without useEffect(). i can be logged out because the state is re rendered. 
  with useEffect(), i can reload and still be authenticted
  */


//components

import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try{
       const response = await fetch("http://localhost:5000/auth/verify", {
         method:"GET",
         header: { Token: localStorage.token }
       });

       const parseRes = await response.json();
       
       parseRes === true ? setIsAuthenticated(true):
       setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    isAuth()
  })

  return (
    //use alt+shift+f to format your code
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                //User not authenticated ? then go to login page. Otherwise stay on dashboard
                !isAuthenticated ? (
                  <Login {...props} setAuth = {setAuth}/>
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth = {setAuth}/>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth = {setAuth}/>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
