import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Input } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import StoreCategoryItem from '/imports/ui/components/StoreCategoryItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { StoreCategory } from '../../models/ref/StoreCategory';
import StateManager from "../stateManager/StateManager";


@observer
class ListStoreCategory extends React.Component {
    state = {
        selectedRow: null,
    };

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    onRowClick= (id) => {
        if (StateManager.mode > 0) return;
        StateManager.setSelectedDocumentId(id);
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return <Container>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.storeCategory.map((storeCategory) => (
                        <StoreCategoryItem key={storeCategory._id}
                                           onRowClick={this.onRowClick}
                                           isActive={storeCategory._id === StateManager.selectedDocumentId}
                                           storeCategory={storeCategory}></StoreCategoryItem>))
                    }
                </Table.Body>
            </Table>
        </Container>;
    }
}

/** Require an array of Stuff documents in the props. */
ListStoreCategory.propTypes = {
    storeCategory: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
    onItemSelected: PropTypes.func,
};

/** withTracker connects Meteor data to React components. khttps://guide.meteor.com/react.html#using-withTracer */
export default withTracker(({ findConfiguration }) => {

    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('StoreCategory', findConfiguration);
    return {
        storeCategory: StoreCategory.find().fetch(),
        ready: subscription.ready(),
    };
})(ListStoreCategory);
