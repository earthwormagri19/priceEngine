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
    this.fun = this.fun.bind(this);
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
            totalAmount: response.data.totalAmount,
            referrals: response.data.referrals
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

    downLoadInvoice() {
    } 
    fun(subTotal) {
        var totalAmount = 0;
        var referralDiscount = 0;
        if(this.state.referrals && this.state.referrals >0) {
            referralDiscount = Number(this.state.referrals) * 10;
            totalAmount = subTotal - referralDiscount;
        }
        else {
            totalAmount = subTotal;
        }
        return {
            referralDiscount: referralDiscount,
            totalAmount: totalAmount
        }
    }  
  render() {
    let items = this.state.items;
    var subTotal = 0;
    items.forEach(function(item, i){
        if(item.rate) {
            subTotal = subTotal + Number(item.rate);
        }
        else {
            delete items[i];
        }
    });

   
    var obj = this.fun(subTotal);
    var totalAmount = obj.totalAmount;
    var referralDiscount = obj.referralDiscount;
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
                <td>Sub total:</td>  
                <td>
                    ₹{subTotal}
                </td>
            </tr>
            <tr className='total'>
                <td></td>  
                <td>GST:</td>  
                <td>
                    ₹0.00
                </td>
            </tr>
            <tr className='total'>
                <td></td>
                <td>Referral Discount {this.state.referrals} X ₹10:<br/>
                    {this.state.referrals < 1  ? 'You have no referrals, refer your friends to get discount' : ''}
                </td>  

                <td>
                    - ₹{referralDiscount}
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
                    <strong>Next Order window : </strong>05/03/2020 (Thursday) 9PM - 07/03/2010 (Saturday) 9PM<br/>
                    <strong>Next Delivery date : </strong>08/03/2020  (Sunday)<br/>   
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
