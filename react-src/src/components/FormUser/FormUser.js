import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const villageOptions = [
  { key: 'Aloor', text: 'Aloor', value: 'Aloor' },
  { key: 'Ankapoor', text: 'Ankapoor', value: 'Ankapoor' },
  { key: 'Munipally', text: 'Munipally', value: 'Munipally' }
]

class FormUser extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      fatherName: '',
      houseNumber: '',
      village: '',
      district: '',
      phoneNumber: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      axios.get(`${this.props.server}/api/users/${this.props.userID}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          fatherName: response.data.fatherName,
          phoneNumber: response.data.phoneNumber,
          houseNumber: response.data.houseNumber,
          village: response.data.village,
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

  handleSelectChange(e, data) {
    this.setState({ village: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const user = {
      name: this.state.name,
      fatherName: this.state.fatherName,
      phoneNumber: this.state.phoneNumber,
      houseNumber: this.state.houseNumber,
      village: this.state.village,
    }
    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/users/${params}`,
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
          email: '',
          age: '',
          gender: ''
        });
        this.props.onUserAdded(response.data.result);
      }
      else {
        this.props.onUserUpdated(response.data.result);
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
        <Form.Input
          label='Father Name'
          type='text'
          name='fatherName'
          maxLength='40'
          required
          value={this.state.fatherName}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Phone Number'
          type='text'
          name='phoneNumber'
          maxLength='40'
          required
          value={this.state.phoneNumber}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='House Number'
          type='text'
          name='houseNumber'
          maxLength='40'
          required
          value={this.state.houseNumber}
          onChange={this.handleInputChange}
        />
         <Form.Field
            control={Select}
            label='Village'
            options={villageOptions}
            placeholder='Village'
            value={this.state.village}
            onChange={this.handleSelectChange}
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

export default FormUser;
