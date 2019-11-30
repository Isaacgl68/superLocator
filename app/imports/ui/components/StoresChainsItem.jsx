import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class StoresChainsItem extends React.Component {

    onRowClick = () => {
        if (this.props.onRowClick) {
            this.props.onRowClick(this.props.storesChain._id);
        }
    }

  render() {
    return (
        <Table.Row onClick={this.onRowClick} active={this.props.isActive}>
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
    isActive: PropTypes.bool,
    onRowClick: PropTypes.func,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default StoresChainsItem;
