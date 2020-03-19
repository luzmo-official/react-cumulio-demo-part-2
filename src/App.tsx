import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import './App.css';
import Dashboards from './components/Dashboards';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-title">
          <h1>My Website</h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/dashboards" className="navbar-item">Dashboards</Link>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/dashboards" exact component={Dashboards} />
        <Route path="/" exact component={Home} />
      </Switch>

      <footer className="footer"><span></span></footer>

    </Router>
  );
}

export default App;
