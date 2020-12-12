import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';


class StoresItem extends React.Component {

    onRowClick = (e) => {
        if (this.props.onRowClick) {
            this.props.onRowClick(this.props.store._id);
        }
    }

  render() {
    return (
        <Table.Row active={this.props.isActive}>
            <Table.Cell onClick={this.onRowClick} >{this.props.store._id}</Table.Cell>
            <Table.Cell onClick={this.onRowClick} >{this.props.store.name}</Table.Cell>
            <Table.Cell onClick={this.onRowClick} >{this.props.store.chain}</Table.Cell>
            <Table.Cell onClick={this.onRowClick} >{this.props.store.category}</Table.Cell>
            <Table.Cell onClick={this.onRowClick} >{this.props.store.address.city}</Table.Cell>
            <Table.Cell>
                <Link to={`/floorPlan/${this.props.store._id}`}>Floor Plan</Link>
            </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StoresItem.propTypes = {
    store: PropTypes.object.isRequired,
    onRowClick: PropTypes.func,
    isActive: PropTypes.bool,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StoresItem);
