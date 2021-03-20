import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Home from "./components/Home";
import LoginPage from"./components/LoginPage";

export const UserContext = React.createContext({ 
  loggedIn: false, 
  toggleLoggedIn: () => {}
})

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const toggleLoggedIn = () => setLoggedIn(loggedIn ? false : true);

  return (
    <UserContext.Provider value={{ loggedIn, toggleLoggedIn }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage/>
            </Route>
            <Route path="/signup">
              <div>Hi signup</div>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}