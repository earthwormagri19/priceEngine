import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalItem from '../ModalItem/ModalItem';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableItem extends Component {

  render() {

    let items = this.props.items;

    items = items.map((item) => 
      <Table.Row key={item._id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.marketRate}</Table.Cell>
        <Table.Cell>{item.zfRate}</Table.Cell>
        <Table.Cell>{item.available}</Table.Cell>
        <Table.Cell>
          <ModalItem
            headerTitle='Edit Item'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            itemID={item._id}
            onItemUpdated={this.props.onItemUpdated}
            server={this.props.server}
          />
          <ModalConfirmDelete
            headerTitle='Delete item'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            item={item}
            onItemDeleted={this.props.onItemDeleted}
            server={this.props.server}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new item appear on top of the list
    items =  [...items].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Market Rate</Table.HeaderCell>
            <Table.HeaderCell>ZoomFresh Rate</Table.HeaderCell>
            <Table.HeaderCell>Availability</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items}
        </Table.Body>
      </Table>
    );
  }
}

export default TableItem;
