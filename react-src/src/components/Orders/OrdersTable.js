import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import ModalOrder from '../Orders/ModalOrder';

class OrdersTable extends Component {

  render() {

    let orders = this.props.orders;

    orders = orders.map((order) => 
      <Table.Row key={order._id}>
        <Table.Cell>{order.orderNumber}</Table.Cell>
        <Table.Cell>{order.name}</Table.Cell>
        <Table.Cell>{order.address}</Table.Cell>
        <Table.Cell>{order.phoneNumber}</Table.Cell>
        <Table.Cell>
          <ModalOrder
            headerTitle='View Invoice'
            buttonTriggerTitle='View Invoice'
            buttonSubmitTitle='Print'
            buttonColor='blue'
            orderId={order._id}
            server={this.props.server}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new item appear on top of the list
    orders =  [...orders].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Number</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders}
        </Table.Body>
      </Table>
    );
  }
}

export default OrdersTable;
