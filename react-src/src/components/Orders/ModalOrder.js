import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
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
                size='large'
                closeIcon='close'
            >
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
