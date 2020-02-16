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
    this.handleUploadOrders = this.handleUploadOrders.bind(this);
    this.handleItemUpdated = this.handleItemUpdated.bind(this);
    this.handleItemDeleted = this.handleItemDeleted.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
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

  handleUploadOrders(item) {
    window.print();
  }

  handleItemUpdated(item) {
    let items = this.state.items.slice();
    for (let i = 0, n = items.length; i < n; i++) {
      if (items[i]._id === item._id) {
        items[i].name = item.name;
        items[i].marketRate = item.marketRate;
        items[i].zfRate = item.zfRate;
        items[i].available = item.available;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ items: items });
  }

  onChangeHandler(event) {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler() {
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
        result.push({
          name : obj.Name,
          phoneNumber: obj.PhoneNumber,
          address: obj.Address,
          orderNumber: obj.OrderNumber,
          landMark: obj.LandMark
        });
      } 
      axios({
        method: 'post',
        responseType: 'json',
        url: `http://localhost:4200/api/orders/`,
        data: result
      }).then((response) => {
        self.setState({ orders: response.data });
      }).catch((err) => {
        console.log(err);
      });
    }
    
  }

  handleItemDeleted(item) {
    let items = this.state.items.slice();
    items = items.filter(i => { return i._id !== item._id; });
    this.setState({ items: items });
  }


  render() {
    return (
      <Container>
         <input type="file" class="ui green button"  name="file" onChange={this.onChangeHandler}/>
         <button type="button" class="ui green button" onClick={this.onClickHandler}>Upload</button> 
         <OrdersTable
            orders={this.state.orders}
            server={this.server}
          />
      </Container>
    );
  }
}

export default Orders;
