import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignupForm from "./components/SignupForm"
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}