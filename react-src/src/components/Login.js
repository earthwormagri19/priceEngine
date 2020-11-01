import React from 'react';
import { Button, Form} from 'semantic-ui-react';

const Login = (props) => {
    const { handleClick, handleInputChange, password, email, errorMessage } = props;
    return (
        <div className="login-container">
          <p className ='errorMessage'>  {errorMessage}
          </p>
        <Form onSubmit={handleClick}>
        <Form.Input
            label='E-mail'
            type='email'
            name='email'
            maxLength='30'
            required
            value={email}
            onChange={handleInputChange}
        />
        <Form.Input
            label='Password'
            type='password'
            name='password'
            maxLength='15'
            required
            value={password}
            onChange={handleInputChange}
        />
        <Button color='blue' floated='right'>Submit</Button>
    <br /><br />
    </Form>
    </div>          
    );
};

export default Login;