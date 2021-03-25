import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { ProvideAuth } from './useAuth';

export default function App() {
  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path='/login'>
              <LoginPage/>
            </Route>
            <Route path='/signup'>
              <SignupPage/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ProvideAuth>
  );
}