import React, { Component } from 'react';
import OrdersTable from '../Orders/OrdersTable';
import { Container } from 'semantic-ui-react';
import axios from 'axios';


class Orders extends Component {
  constructor(props) {
    super(props);

    this.server = process.env.REACT_APP_API_URL || '';

    this.state = {
      orders: [],
      online: 0,
      selectedFile: null
    }

    this.fetchOders = this.fetchOders.bind(this);
    this.selectOrders = this.selectOrders.bind(this);
    this.uploadOrders = this.uploadOrders.bind(this);
  }

  componentDidMount() {
    this.fetchOders();
  }
  // Fetch data from the back-end
  fetchOders() {
    axios.get(`${this.server}/api/orders/`)
    .then((response) => {
      this.setState({ orders: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  selectOrders(event) {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  uploadOrders() {
    let self = this;
    let reader = new FileReader();
    reader.readAsText(this.state.selectedFile);
    reader.onload = function () {
      var csv = reader.result;
      var lines = csv.split("\n");
      var result = [];
      var headers=lines[0].split(",");
      for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
        let notveg = ['Order Number', 'Name', 'Phone Number', 'Address', 'Landmark', 'Notes'];
        var items = [];
        Object.keys(obj).forEach(k => 
          (!obj[k] && obj[k] !== undefined || obj[k] ==='') && delete obj[k]
        );
        Object.keys(obj).forEach(function(k){
          if((notveg.indexOf(k) > -1) == false) {
            var splitQuantity = obj[k].split("-");
            items.push({
              'item': k,
              'quantity': splitQuantity[0],
              'rate' : splitQuantity[1] 
            });
            delete obj[k];
          }
        });
        result.push({
          name : obj.Name,
          phoneNumber: obj['Phone Number'],
          address: obj.Address,
          orderNumber: obj['Order Number'],
          landMark: obj.Landmark,
          items: items
        });
      } 
      axios({
        method: 'post',
        responseType: 'json',
        url: `${this.props.server}/api/orders/`,
        data: result
      }).then((response) => {
        self.setState({ orders: response.data });
      }).catch((err) => {
        console.log(err);
      });
    }
    
  }

  render() {
    return (
      <Container>
         <input type="file" class="ui green button"  name="file" onChange={this.selectOrders}/>
         <button type="button" class="ui green button" onClick={this.uploadOrders}>Upload</button> 
         <OrdersTable
            orders={this.state.orders}
            server={this.server}
          />
      </Container>
    );
  }
}

export default Orders;
