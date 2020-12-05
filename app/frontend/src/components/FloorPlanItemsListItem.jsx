import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { join } from 'lodash';


class FloorPlanItemsListItem extends React.Component {

    onRowClick = () => {
        if (this.props.onRowClick) {
            this.props.onRowClick(this.props.floorPlanItem._id);
        }
    }

  render() {
        const { floorPlanItem } = this.props;
        const productsCategories = join(floorPlanItem.productsCategories, ', ');
    return (
        <Table.Row onClick={this.onRowClick} active={this.props.isActive}>
            <Table.Cell>{floorPlanItem.label}</Table.Cell>
            <Table.Cell>{floorPlanItem.unitType}</Table.Cell>
            <Table.Cell>{productsCategories}</Table.Cell>
            <Table.Cell>{floorPlanItem.x}</Table.Cell>
            <Table.Cell>{floorPlanItem.y}</Table.Cell>
            <Table.Cell>{floorPlanItem.width}</Table.Cell>
            <Table.Cell>{floorPlanItem.height}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
FloorPlanItemsListItem.propTypes = {
    floorPlanItem: PropTypes.object.isRequired,
    onRowClick: PropTypes.func,
    isActive: PropTypes.bool,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default FloorPlanItemsListItem;
