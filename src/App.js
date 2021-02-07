import {Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/pages/auth/Dashboard/Dashboard';
import NoMatch from './components/pages/NoMatch';

function App() {
  return (
    <div className="wrapper">
      <h1>Appliation</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route  path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
