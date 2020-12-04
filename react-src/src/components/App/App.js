import React, { Component} from 'react';
//import { Container } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Login from '../Login';
import Orders from '../Orders/Orders';  
import UpdateRates from '../UpdateRates/UpdateRates';  
import TotalQuantity from '../Quantity/Quantity'; 
import Payments from '../Payments/Payments'; 
import logo from '../../logo.jpeg';
import './App.css';

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

// const Payments = React.lazy(() => import('../Payments/Payments'));


var firebaseConfig = {
  apiKey: "AIzaSyBO-lR44grlyS7cfSOHinVG25FSy2-MKlw",
  authDomain: "zoomfresh-ops.firebaseapp.com",
  databaseURL: "https://zoomfresh-ops.firebaseio.com",
  projectId: "zoomfresh-ops",
  storageBucket: "zoomfresh-ops.appspot.com",
  messagingSenderId: "1072758282138",
  appId: "1:1072758282138:web:4d8da8987f2162704a0c23",
  measurementId: "G-63CN4R208D"
};

// import {Route} from 'react-router-dom": "^5.1.2';

// import Items from '../Items/Items';

class App extends Component {

  constructor() {
    super();
    this.state={
      navigation: false,
      email: '',
      password: '',
      login: true,
      errorMessage: false,
      redirect: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.server = process.env.REACT_APP_API_URL || '';
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.auth()
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  handleClick() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password) 
      //everything is almost exactly the same as the function above
      .then( async res => {
        this.setState({
          navigation: !this.state.navigation,
          login: !this.state.login,
          isUserAuthenticated: true,
          redirect: true
        });
      })
      .catch(err => {
          this.setState({
            errorMessage: 'Invalid User Name or Password'
          });
      })
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }
  render() {
    const {navigation, email, password, login , errorMessage, redirect } = this.state;

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>Earthworm Operations</h1>
          </div>
        </div>
        { login && <Login 
        handleClick={this.handleClick} 
        handleInputChange={this.handleInputChange}
        email={email}
        password={ password }
        errorMessage= {errorMessage}
        />}
        { navigation && <Router>
          <div className="Nav-header">
            <nav>
              <ul className='Nav-bar'>
                {/* <li>
                  <Link to="/orders">Orders</Link>
                </li> */}
                {/* <li>
                  <Link to="/rates">View/Update Rates</Link>
                </li> */}
                <li>
                  <Link to="/quantity">Total Quantity/Delivery list</Link>
                </li>
                <li>
                  <Link to="/payments">Payments</Link>
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
              <Route path="/payments">
                <Payments />
              </Route>
            </Switch>
          </div>
        </Router>}
      </div>
    );
  }
}
export default App;
