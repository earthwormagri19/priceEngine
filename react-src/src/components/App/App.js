import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../logo.jpeg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';

    this.state = {
      users: [],
      online: 0
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }
  // Fetch data from the back-end
  fetchUsers() {
    axios.get(`${this.server}/api/users/`)
    .then((response) => {
      this.setState({ users: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].name = user.name;
        users[i].email = user.email;
        users[i].age = user.age;
        users[i].gender = user.gender;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  render() {

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>Earthworm Operations</h1>
          </div>
        </div>
        <Container>
          <ModalUser
            headerTitle='Add Farmer'
            buttonTriggerTitle='Add Farmer'
            buttonSubmitTitle='Add'
            buttonColor='green'
            onUserAdded={this.handleUserAdded}
            server={this.server}
          />
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            users={this.state.users}
            server={this.server}
          />
        </Container>
        <br/>
      </div>
    );
  }
}

export default App;
