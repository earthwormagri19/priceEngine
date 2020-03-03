import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Orders from '../Orders/Orders';  
import UpdateRates from '../UpdateRates/UpdateRates';  
import SignIn from '../SignIn/SignIn'; 

import logo from '../../logo.jpeg';
import './App.css';
class App extends Component {

  constructor() {
    super();

  }
  render() {

    return (
      <Container>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>Earthworm Operations</h1>
          </div>
        </div>
        <Router>
          <div>
            <Switch>
              <Route path="/">
                <SignIn/>
              </Route>
              <Route path="/landing">
                <div>
                  <nav>
                    <ul>
                      <li>
                        <Link to="/orders">Orders</Link>
                      </li>
                      <li>
                        <Link to="/rates">View/Update Rates</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/rates">
                <UpdateRates />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}
export default App;
