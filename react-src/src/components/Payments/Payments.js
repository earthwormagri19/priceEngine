import React, { Component } from 'react';
import { Table, Button, Form, Loader, Label, Icon} from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment'

class Quantity extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
          items: [],
          loading: false
      }
      this.server = process.env.REACT_APP_API_URL || '';
      this.handleSubmit = this.handleSubmit.bind(this);
      this.formatDate  = this.formatDate.bind(this);
    }
    handleSubmit () {
      this.setState({ 
          loading: true
      });
      this.fetchPayments();
    }
    formatDate (date) {
      return moment.unix(date).format("DD/MM/YYYY");
    }
    componentDidMount() {
        this.fetchPayments();
      }
      // Fetch data from the back-end
      fetchPayments() {
        this.setState({loading: true });
        axios.get(`${this.server}/api/payments/?count=20`)
          .then(response => {
              var items = response.data;
              items = items.map((item) => 
                  <Table.Row>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell>{item.amount}</Table.Cell>
                      <Table.Cell>{this.formatDate(item.created_at)}</Table.Cell>
                      <Table.Cell>{item.description}</Table.Cell>
                      <Table.Cell>{item.method}</Table.Cell>
                      <Table.Cell>
                        <Label color={item.status === 'failed'?'red': 'green'} key={item.status} size='small'>
                          {item.status}
                        </Label>
                      </Table.Cell>
                  </Table.Row>
              );
              this.setState({ items: items, loading: false });
          })
          .catch(error => {
          });
      }

  render() {
    return (
       <div className="body-container">
        <Form onSubmit={this.handleSubmit}>
            <Button color='blue' floated='left'>Refresh <Icon name='refresh'/> </Button>
           
        </Form>
        <br /><br />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Payment Id</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Method</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.state.loading &&  
        <Loader active inline='left' />}
        {this.state.items}
        </Table.Body>
      </Table>
      </div>
    );
  }
}

export default Quantity;
