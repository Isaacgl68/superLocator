import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class StoreCategoryItem extends React.Component {
    onRowClick = () => {
        if (this.props.onRowClick) {
            this.props.onRowClick(this.props.storeCategory._id);
        }
    }

    render() {
        return (
            <Table.Row onClick={this.onRowClick} active={this.props.isActive}>
                <Table.Cell>{this.props.storeCategory._id}</Table.Cell>
                <Table.Cell>{this.props.storeCategory.category}</Table.Cell>
            </Table.Row>
        );
    }
}


/** Require a document to be passed to this component. */
StoreCategoryItem.propTypes = {
    storeCategory: PropTypes.object.isRequired,
    onRowClick: PropTypes.func,
    isActive: PropTypes.bool,

};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StoreCategoryItem);
