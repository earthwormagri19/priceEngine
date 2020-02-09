import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const unitOptions = [
  { key: 'kg', text: 'Kg', value: 'kg' },
  { key: 'piece', text: 'Piece', value: 'piece' },
  { key: 'bunch', text: 'Bunch', value: 'bunch' }
]

const availabilityOptions = [
  { key: 'available', text: 'Available', value: 'available' },
  { key: 'notAvailable', text: 'Not Available', value: 'notAvailable' },
]

class FormItem extends Component {

  constructor(props) {
    super(props);
    
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

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      axios.get(`${this.props.server}/api/items/${this.props.userID}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          unit: response.data.unit,
          marketRate: response.data.marketRate,
          zfRate: response.data.zfRate,
          available: response.data.available,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
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

    const user = {
      name: this.state.name,
      unit: this.state.unit,
      marketRate: this.state.marketRate,
      zfRate: this.state.zfRate,
      available: this.state.available
    }
    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/items/${params}`,
      data: user
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.userID) {
        this.setState({
          name: '',
          unit: '',
          marketRate: '',
          zfRate: '',
          available: ''
        });
        this.props.onItemAdded(response.data.result);
      }
      else {
        this.props.onItemUpdated(response.data.result);
      }
      
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong. ' + err
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='Name'
          type='text'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Field
          control={Select}
          label='Unit'
          options={unitOptions}
          placeholder='Unit'
          value={this.state.unit}
          onChange={this.handleUnitChange}
        />
        <Form.Input
          label='Market Rate'
          type='text'
          name='marketRate'
          maxLength='40'
          required
          value={this.state.marketRate}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='ZoomFresh Rate'
          type='text'
          name='zfRate'
          maxLength='40'
          required
          value={this.state.zfRate}
          onChange={this.handleInputChange}
        />
        <Form.Field
          control={Select}
          label='Availability'
          options={availabilityOptions}
          placeholder='Availability'
          value={this.state.available}
          onChange={this.handleAvailabilityChange}
        />
        <Message
          success
          color='green'
          header='Nice one!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Woah!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormItem;
