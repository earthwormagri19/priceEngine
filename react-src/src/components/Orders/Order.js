import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';
import './Order.css';
import logo from '../../zf_logo.png'

class Order extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        name: '',
        address: '',
        phoneNumber: '',
        orderNumber: '',
        items: [],
        landMark: '',
        totalAmount: ''
    }
    this.downLoadInvoice = this.downLoadInvoice.bind(this);
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
            items: response.data.items,
            totalAmount: response.data.totalAmount
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

    downLoadInvoice() {
    }   
  render() {

    let items = this.state.items;
    var totalAmount = 0;
    items.forEach(function(item, i){
        if(item.rate) {
            totalAmount = totalAmount + Number(item.rate);
        }
        else {
            delete items[i];
        }
    });

    items = items.map((item) => 
        <tr className='item'>
            <td>
                {item.item}
            </td>
            <td>
                {item.quantity}
            </td>  
            <td>
                ₹{item.rate}
            </td>            
        </tr>
    );
    return (
        <div id='invoice' className='invoice-box'>
        <table cellpadding='0' cellspacing='0'>
            <tr className='top'>
                <td colspan='2'>
                    <table>
                        <tr>
                            <td className='title'>
                                <img src={logo} className='App-logo' alt='logo' />
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
                                Invoice #: {this.state.orderNumber}<br/>
                                Customer Name : {this.state.name}<br/>
                                Phone Number : {this.state.phoneNumber}<br/>
                                Address : {this.state.address}<br/> 
                                Landmark : {this.state.landMark}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr className='heading'>
                <td>
                    Item
                </td>
                <td>
                    Quantity
                </td>
                <td>
                    Rate
                </td>
            </tr>      
            {items}
            <tr className='total'>
                <td></td>  
                <td>GST:</td>  
                <td>
                    ₹0.00
                </td>
            </tr>
            <tr className='total'>
                <td></td>
                {/* <td>total number of item(s): <strong>{this.state.items.length}</strong></td> */}
                <td>Total Amount:</td>  
                <td>
                    ₹{totalAmount}
                </td>
            </tr>

            <tr className='headinformationing'>
                <td>   
                    <strong>Do you know you can get discount on your next order? <br/> Refer your friends/Relatives and get ₹10 for each referral</strong> <br/>
                    <strong>Next Order date : </strong>05/03/2020(Thursday) <br/>
                    <strong>Next Delivery date : </strong>06/03/2020 (Friday)<br/>   
                    Thank you for your order !!!
                </td>
            </tr>
        </table>
        {/* <div>
             <button type="button" class="ui green button" onClick={this.downLoadInvoice}>Download Invoice</button> 
        </div>  */}
    </div>
   
    );
  }
}

export default Order;
