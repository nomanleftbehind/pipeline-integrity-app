import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import PipelineDatabase from './PipelineDatabase';

export default function App() {
  return (
    <Router>
      <div>
        <nav className="fixed-nav-bar">
          <ul>
            <li>
              <Link to="/pipelines">Pipelines</Link>
            </li>
            <li>
              <Link to="/injectionpoints">Injection Points</Link>
            </li>
            <li>
              <Link to="/batteries">Batteries</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/batteries">
            <Batteries />
          </Route>
          <Route path="/injectionpoints">
            <InjectionPoints />
          </Route>
          <Route path="/pipelines">
            <PipelineDatabase />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function InjectionPoints() {
  return <div className="app"><h2>Injection Points</h2></div>;
}

function Batteries() {
  return <div className="app"><h2>Batteries</h2></div>;
}