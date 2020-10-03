import React, { Component } from 'react';
import { Table, Form } from 'semantic-ui-react';
import axios from 'axios';

class Quantity extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           products : []
        }
      }
    
    componentWillMount() {
        axios.get(`https://zf-api.herokuapp.com/process/API_link/order_list.php?from_id=ZFO0886&to_id=ZFO0932`)
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
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Ladies finger ",
                "qty": 0,
                "baseQty": 0.5,
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
                "productName": "Onions - White",
                "qty": 0,
                "baseQty": 1,
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
                "productName": "Beerakaya",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Methi",
                "qty": 0,
                "baseQty": 2,
                "totalQty": 0,
                "unit": "Bunch",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Red onion ",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Curry Leaves",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Bunch",
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
                "baseQty": 0.5,
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
                "productName": "Corn ",
                "qty": 0,
                "baseQty": 3,
                "totalQty": 0,
                "unit": "Pc",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Kakarakaya",
                "qty": 0,
                "baseQty": 0.5,
                "totalQty": 0,
                "unit": "Kg",
                "packingList": [],
                "OrderList": []
            },
            {
                "productName": "Pedda Chikkudu",
                "qty": 0,
                "baseQty": 0.5,
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
                "productName": "Papaya",
                "qty": 0,
                "baseQty": 1,
                "totalQty": 0,
                "unit": "Pc",
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
            } 
            ];
            var confirmedOrders = 0;
            orders.forEach(function(value){
            if(value.status === 'Confirmed'){
                console.log(value.order_id);
                confirmedOrders++
                var items = value.service_name;
                products.forEach(function(product){
                items.forEach(function(item){
                    if(item.product_name === product.productName) {
                    product.qty = product.qty + item.product_quantity;
                    product.packingList.push(item.product_quantity*product.baseQty + ' '+ product.unit);
                    product.OrderList.push(value.cust_name + ' ('+value.order_id+ ')'+ ' : '+ item.product_quantity*product.baseQty + ' '+ product.unit);
                    product.totalQty = product.qty * product.baseQty;
                    }
                });
                });
            }
            });
            products.sort(function(a, b){return b.totalQty - a.totalQty});
            console.log('--------------------------------\nTotal Oders:' + confirmedOrders+'\n--------------------------------');
            console.log('***Procurement List***');
            products.forEach(function(product){ 
            console.log(product.productName+ ' : '+product.totalQty+ ' '+product.unit);
            });
            this.setState({ products: products.sort(function(a, b){return b.totalQty - a.totalQty})});
        })
        .catch((err) => {
        console.log(err);
        });
    }

  render() {
    let items = this.state.products;
    items = items.map((item) => 
      <Table.Row key={item.productName}>
        <Table.Cell>{item.productName}</Table.Cell>
        <Table.Cell>{item.totalQty} {item.unit}</Table.Cell>
      </Table.Row>
    );
    return (
       
      <Table singleLine>
           <Form>
            
            </Form>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Total Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items}
        </Table.Body>
      </Table>
    );
  }
}

export default Quantity;
