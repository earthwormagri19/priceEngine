import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import axios from 'axios';

class SignIn extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const { match, location, history } = this.props
    // Prevent browser refresh
    e.preventDefault();
    history.push("/landing");
    // const user = {
    //   name: this.state.userName,
    //   unit: this.state.passWord,
    // }
    // // Acknowledge that if the user id is provided, we're updating via PUT
    // // Otherwise, we're creating a new data via POST
    // const method = this.props.itemID ? 'put' : 'post';
    // const params = this.props.itemID ? this.props.itemID : '';

    // axios({
    //   method: method,
    //   responseType: 'json',
    //   url: `${this.props.server}/api/items/${params}`,
    //   data: user
    // })
    // .then((response) => {
    //   this.setState({
    //     formClassName: 'success',
    //     formSuccessMessage: response.data.msg
    //   });

    //   if (!this.props.itemID) {
    //     this.setState({
    //       name: '',
    //       unit: '',
    //       marketRate: '',
    //       zfRate: '',
    //       available: ''
    //     });
    //     this.props.onItemAdded(response.data.result);
    //   }
    //   else {
    //     this.props.onItemUpdated(response.data.result);
    //   }
      
    // })
    // .catch((err) => {
    //   if (err.response) {
    //     if (err.response.data) {
    //       this.setState({
    //         formClassName: 'warning',
    //         formErrorMessage: err.response.data.msg
    //       });
    //     }
    //   }
    //   else {
    //     this.setState({
    //       formClassName: 'warning',
    //       formErrorMessage: 'Something went wrong. ' + err
    //     });
    //   }
    // });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='User Name'
          type='text'
          name='username'
          maxLength='10'
          required
          value={this.state.userName}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Password'
          type='password'
          name='password'
          maxLength='10'
          required
          value={this.state.password}
          onChange={this.handleInputChange}
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
        <Button color='green' floated='right'>Login</Button>
        <br /><br />
      </Form>
    );
  }
}

export default withRouter(SignIn);
