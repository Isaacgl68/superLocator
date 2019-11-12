import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//import { withRouter, Link } from 'react-router-dom';

class StoresItem extends React.Component {
  render() {
    return (
        <Table.Row>
            <Table.Cell>{this.props.store._id}</Table.Cell>
            <Table.Cell>{this.props.store.name}</Table.Cell>
            <Table.Cell>{this.props.store.chain}</Table.Cell>
            <Table.Cell>{this.props.store.category}</Table.Cell>
            <Table.Cell>{this.props.store.address.city}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StoresItem.propTypes = {
    store: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default StoresItem;
