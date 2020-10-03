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
import TotalQuantity from '../Quantity/Quantity'; 

import logo from '../../logo.jpeg';
import './App.css';

// import {Route} from 'react-router-dom": "^5.1.2';

// import Items from '../Items/Items';

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
            <nav>
              <ul>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/rates">View/Update Rates</Link>
                </li>
                <li>
                  <Link to="/quantity">Total Quantity/Item</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/rates">
                <UpdateRates />
              </Route>
              <Route path="/quantity">
                <TotalQuantity />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}
export default App;
