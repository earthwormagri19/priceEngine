import React, { Component } from 'react';
import { Container, Button, Form, Select } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Orders from '../Orders/Orders';  
import UpdateRates from '../UpdateRates/UpdateRates';  

import logo from '../../logo.jpeg';
import './App.css';
const unitOptions = [
  { key: 'Kg', text: 'Kg', value: 'Kg' },
  { key: 'Piece', text: 'Piece', value: 'Piece' },
  { key: 'Bunch', text: 'Bunch', value: 'Bunch' }
]

const availabilityOptions = [
  { key: 'Available', text: 'Available', value: 'Available' },
  { key: 'Notavailable', text: 'Not Available', value: 'Notavailable' },
]

// import {Route} from 'react-router-dom": "^5.1.2';

// import Items from '../Items/Items';

class App extends Component {

  constructor() {
    super();
    this.state = {
        name: '',
        unit: '',
        marketRate: '',
        zfRate: '',
        available: '',
      }
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }
  handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({ [name]: value });
      }
    
      handleUnitChange(e, data) {
        this.setState({ unit: data.value });
      }
    
      handleAvailabilityChange(e, data) {
        this.setState({ available: data.value });
      }
    
      handleSubmit(e) {
        // Prevent browser refresh
        e.preventDefault();
      }
  render() {

    return (
      <Container>
      <Form  onSubmit={this.handleSubmit}>
        <Form.Input
          label='First Name'
          type='text'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Last Name'
          type='text'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Address'
          type='text'
          name='marketRate'
          maxLength='40'
          required
          value={this.state.marketRate}
          onChange={this.handleInputChange}
        />
         <Form.Input
          label='Phone number'
          type='text'
          name='marketRate'
          maxLength='40'
          required
          value={this.state.marketRate}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='SSN'
          type='text'
          name='zfRate'
          maxLength='40'
          required
          value={this.state.zfRate}
          onChange={this.handleInputChange}
        />
        <Button color='blue' floated='right'>Submit</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
      </Container>
    );
  }
}
export default App;
