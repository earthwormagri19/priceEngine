import React, { Component } from 'react';
import { Table, Button, Form, Loader, Icon, Label, Menu} from 'semantic-ui-react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

class Quantity extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           products : [],
           productList: [],
           orderFrom: '',
           orderTo: '',
           items: [],
           totalOrders : 0,
           onlineOrders : 0,
           cashOrders : 0,
           loading: false,
           records: [],
           transList: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange= this.handleInputChange.bind(this);
    }
    handleSubmit () {
        this.setState({ 
            loading: true
        });
        axios.get(`https://zf-api.herokuapp.com/process/API_link/order_list.php?from_id=${this.state.orderFrom}&to_id=${this.state.orderTo}`)
        .then((response) => {
            var orders = response.data;
            var products = [
            {
                "productName": "Tomato-Local",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Brinjal",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Ladies finger ",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": [],
            },
            {
                "productName": "Coriander",
                "qty": 0,
                "baseQty": 0.2,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Cluster Beans / Goru Chikkudukaya",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "White Onion",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Sorakaya / Bottle Gourd",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Potato",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Mint",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Bunch",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Ginger",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Garlic",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Organic Black Rice - Old",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Thota Kura",
                "qty": 0,
                "baseQty": 2,
                "totalQty": 0,
                "unit": "Bunch",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Organic Turmeric powder",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Keera Dosa",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Lemon - Small",
                "qty": 0,
                "baseQty": 6,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Dondakaya / Tindora",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Green Chillies",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Beerakaya / Ridge gourd",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Menthi",
                "qty": 0,
                "baseQty": 2,
                "totalQty": 0,
                "unit": "Bunch",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Palak",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Bunch",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Red onion ",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Beetroot",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Carrot",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Banana",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Dozen",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Pomegranate",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Corn",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Dozen",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Kakarakaya",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Pedda Chikkudu",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Green Beans",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Cauliflower ",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Green Brinjal",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Cabbage",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Capsicum",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Drumstick",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Ulli Kadalu / Spring Onion",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Bunch",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Pachi Pallikaya / Groundnut",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Papaya",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Jamakaya / Guava",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Radish / Mullangi",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Apple Ber / Gangaregu",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Apple",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Grapes",
                "qty": 0,
                "baseQty": 0.25,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Orange",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Watermelon / Puchakaya",
                "qty": 0,
                "baseQty": 2,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Ankapur Desi Chicken (Cooked)",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Curry Leaves ",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Bunch",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Dosakaya",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Korralu / Foxtail Millet",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Andu Korralu / Brown Top Millet",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Arikelu / Kodo Millet",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Udalu / Barnyard Millet",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Samalu / Little Millet",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            }
            ];
            var confirmedOrders = 0;
            const records = [];
            orders.forEach(function(value){
                if(value.status === 'Confirmed'){
                    confirmedOrders++
                    var items = value.service_name;
                    var amount = 0;
                    value.service_name.forEach(function(item){
                    amount = amount+item.product_price;
                    });
                    products.forEach(function(product){
                        items.forEach(function(item){
                            if(item.product_name === product.productName) {
                                product.qty = product.qty + item.product_quantity;
                                product.packingList.push(item.product_quantity*product.baseQty + ' '+ product.unit);
                                product.totalQty = product.qty * product.baseQty;
                            }
                        });
                    });
                    records.push({
                    'Customer Name': value.cust_name,
                    'Mobile No': value.cust_mobile_no,
                    'Customer Address': value.cust_servicing_address,
                    'Amount': amount,
                    'Payment': value.payment_mode    
                    });
                }
            });
            const transList = [];
            const packingList = [];
            products.forEach(function(product){
                transList.push({
                    'Product Name': product.productName,
                    'Total Quantity': product.totalQty,
                    'Unit': product.unit
                });
                var arr = {};
                product.packingList.forEach(function(x) { arr[x] = (arr[x] || 0)+1; });
                var pkList ='';
                for(var p in arr) {  
                    if (arr.hasOwnProperty(p)) {
                        var str =  p + ' - '+ arr[p] + ' Order(s)';
                        pkList = pkList.concat('\n'+str);
                    }
                }
                packingList.push({
                    'Product Name' : product.productName,
                    'Total Quantity': product.totalQty,
                    'Unit': product.unit,
                    'Packing list': pkList
                });
            });

            // product.OrderList.push(value.cust_name + ' ('+value.order_id+ ')'+ ' : '+ item.product_quantity*product.baseQty + ' '+ product.unit);
            products.sort(function(a, b){return b.totalQty - a.totalQty});
            transList.sort(function(a, b){return b['Total Quantity'] - a['Total Quantity']});
            packingList.sort(function(a, b){return b['Total Quantity'] - a['Total Quantity']});
            let items = products;
            items = products.map((item) => 
            <Table.Row key={item.productName}>
                <Table.Cell>{item.productName}</Table.Cell>
                <Table.Cell>{item.totalQty} {item.unit}</Table.Cell>
            </Table.Row>
            );
            this.setState({ 
                items: items,
                totalOrders: confirmedOrders,
                loading: false,
                products: products,
                records: records,
                transList: transList,
                packingList: packingList
            });
        })
        .catch((err) => {
        console.log(err);
        });
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({ [name]: value });
      }
    componentWillMount() {}

  render() {
    return (
       <div className="body-container">
        <Form onSubmit={this.handleSubmit} className="form-input">
            <Form.Input
            label='Order Id (From)'
            type='text'
            name='orderFrom'
            maxLength='10'
            required
            value={this.state.orderFrom}
            onChange={this.handleInputChange}
            />
            <Form.Input
            label='Order Id (To)'
            type='text'
            name='orderTo'
            maxLength='10'
            required
            value={this.state.orderTo}
            onChange={this.handleInputChange}
            />
             <Button color='blue'>Submit</Button>
           
        <br /><br />
        </Form>
        <div>
            <Menu compact>
                <Menu.Item as='a'>
                <Icon name='shopping basket' />  Total Orders 
                <Label color='teal' floating>
                    {this.state.totalOrders}
                </Label>
                </Menu.Item>
            </Menu>
         </div>
        {/* <div>
            Download
            <Icon name='download'  />
        </div> */}
        <br />
        <div>
        <CSVLink 
            filename={"procurement_list.csv"}
            className="ui  button"
            target="_blank"
            data={this.state.transList}
        >
            Procurement list
        </CSVLink>
        <CSVLink 
            filename={"procuremt_and_packing_list.csv"}
            className="ui  button"
            target="_blank" 
            data={this.state.packingList}
        >
            Procurement & Packing list
         </CSVLink>
        <CSVLink 
            filename={"delivery_list.csv"}
            className="ui  button"
            target="_blank" 
            data={this.state.records}
        >
            Delivery list
         </CSVLink>
         </div>
      <Table>
        <Table.Header>
        <Table.Row>
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                label='Order Id (From)'
                type='text'
                name='orderFrom'
                maxLength='40'
                required
                value={this.state.orderFrom}
                onChange={this.handleInputChange}
                />
                <Form.Input
                label='Order Id (To)'
                type='text'
                name='orderTo'
                maxLength='40'
                required
                value={this.state.orderTo}
                onChange={this.handleInputChange}
                />
                <Button color={this.props.buttonColor} >Submit</Button>
            <br /><br />
            </Form>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Total Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.state.loading &&  
        <Loader active inline='centered' />}
        {this.state.items}
        </Table.Body>
      </Table>
      </div>
    );
  }
}

export default Quantity;
