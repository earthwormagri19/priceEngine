import React, { Component } from 'react';
import TableItem from '../TableItem/TableItem';
import ModalItem from '../ModalItem/ModalItem'
import { Container } from 'semantic-ui-react';
import axios from 'axios';


class UpdateRates extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';

    this.state = {
      items: [],
      online: 0
    }

    this.fetchItems = this.fetchItems.bind(this);
    this.handleItemAdded = this.handleItemAdded.bind(this);
    this.handleItemUpdated = this.handleItemUpdated.bind(this);
    this.handleItemDeleted = this.handleItemDeleted.bind(this);
  }

  componentDidMount() {
    this.fetchItems();
  }
  // Fetch data from the back-end
  fetchItems() {
    axios.get(`${this.server}/api/items/`)
    .then((response) => {
      this.setState({ items: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleItemAdded(item) {
    let items = this.state.items.slice();
    items.push(item);
    this.setState({ items: items });
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

  handleItemDeleted(item) {
    let items = this.state.items.slice();
    items = items.filter(i => { return i._id !== item._id; });
    this.setState({ items: items });
  }


  render() {
    return (
    <Container>
        <ModalItem
          headerTitle='Add item'
          buttonTriggerTitle='Add item'
          buttonSubmitTitle='Add'
          buttonColor='green'
          onItemAdded={this.handleItemAdded}
          server={this.server}
        />
        <TableItem
          onItemUpdated={this.handleItemUpdated}
          items={this.state.items}
          server={this.server}
        />
    </Container>
    );
  }
}

export default UpdateRates;
