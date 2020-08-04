import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import HomePage from './components/HomePage';
import TelegramForm from "./components/TelegramForm";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/new">Create a Telegram</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/confirmation">
              <Confirmation />
            </Route>
            <Route path="/new">
              <TelegramForm />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
