import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class StoresChainsItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.storesChain._id}</Table.Cell>
          <Table.Cell>{this.props.storesChain.name}</Table.Cell>
          <Table.Cell>{this.props.storesChain.category}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StoresChainsItem.propTypes = {
    storesChain: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default StoresChainsItem;
