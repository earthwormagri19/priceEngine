import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';
import './Order.css';

class Order extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        name: '',
        address: '',
        phoneNumber: '',
        orderNumber: '',
        items: [],
        landMark: ''
    }
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.orderId) {
      axios.get(`${this.props.server}/api/orders/${this.props.orderId}`)
      .then((response) => {
        this.setState({
            name: response.data.name,
            address: response.data.address,
            phoneNumber: response.data.phoneNumber,
            orderNumber: response.data.orderNumber,
            landMark: response.data.landMark,
            items: response.data.items
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  render() {

    return (
        <div className='invoice-box'>
        <table cellpadding='0' cellspacing='0'>
            <tr className='top'>
                <td colspan='2'>
                    <table>
                        <tr>
                            <td className='title'>
                                <img src='https://www.sparksuite.com/images/logo.png'/>
                            </td>
                            
                            <td>
                                Invoice #: 123<br/>
                                Created: January 1, 2015<br/>
                                Due: February 1, 2015
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr className='information'>
                <td colspan='2'>
                    <table>
                        <tr>
                            <td>
                                Sparksuite, Inc.<br/>
                                12345 Sunny Road<br/>
                                Sunnyville, CA 12345
                            </td>
                            
                            <td>
                                Acme Corp.<br/>
                                John Doe<br/>
                                john@example.com
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr className='heading'>
                <td>
                    Payment Method
                </td>
                
                <td>
                    Check #
                </td>
            </tr>
            
            <tr className='details'>
                <td>
                    Check
                </td>
                
                <td>
                    1000
                </td>
            </tr>
            
            <tr className='heading'>
                <td>
                    Item
                </td>
                
                <td>
                    Price
                </td>
            </tr>
            
            <tr className='item'>
                <td>
                    Website design
                </td>
                
                <td>
                    $300.00
                </td>
            </tr>
            
            <tr className='item'>
                <td>
                    Hosting (3 months)
                </td>
                
                <td>
                    $75.00
                </td>
            </tr>
            
            <tr className='item last'>
                <td>
                    Domain name (1 year)
                </td>
                
                <td>
                    $10.00
                </td>
            </tr>
            
            <tr className='total'>
                <td></td>
                
                <td>
                   Total: $385.00
                </td>
            </tr>
        </table>
    </div>
      
    );
  }
}

export default Order;
