import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './components/pages/auth/Dashboard/Dashboard';
import { ProvideAuth } from './hooks/use-auth';
import Login from './components/pages/public/Login/Login';
import NoMatch from './components/pages/public/NoMatch/NoMatch';
import PrivateRoute from './components/utils/PrivateRoute/PrivateRoute';
import { Container } from 'reactstrap';

function App() {
  return (
    <Container >
      <h1>Appliation</h1>
      <ProvideAuth>
        <BrowserRouter>
          <Switch>
          <Route exact path="/">
              <Login />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </BrowserRouter>
      </ProvideAuth>
    </Container>
  );
}

export default App;
