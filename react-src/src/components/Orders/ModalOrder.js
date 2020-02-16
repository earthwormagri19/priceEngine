import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import logo from '../../zf_logo.png';
import Order from '../Orders/Order';


class ModalOrder extends Component {
    constructor(props) {
        super(props);  
    }
    render() {
        return (
            <Modal
                trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
                dimmer='inverted'
                size='tiny'
                closeIcon='close'
            >
            <Modal.Header><img src={logo} className='App-logo' alt='logo' /></Modal.Header>
            <Modal.Content>
                <Order
                    buttonSubmitTitle={this.props.buttonSubmitTitle}
                    buttonColor={this.props.buttonColor}
                    orderId={this.props.orderId}
                    server={this.props.server}
                />
            </Modal.Content>
        </Modal>
        );
    }
}

export default ModalOrder;
