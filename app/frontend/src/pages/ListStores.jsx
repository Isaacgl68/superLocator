import React from 'react';
import { Container, Table, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import StoresItem from '/imports/ui/components/StoresItem';
import PropTypes from 'prop-types';
import { Stores } from '../../../imports/models/app/stores/Stores';
import StateManager from '../stateManager/StateManager';


@observer
class ListStores extends React.Component {
    state = {
        selectedRow: null,
    };

    onRowClick= (id) => {
        if (StateManager.mode > 0) return;
        StateManager.setSelectedDocumentId(id);
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return <Container>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>chain</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.stores.map((store) => (
                        <StoresItem
                            key={store._id}
                            store={store}
                            onRowClick={this.onRowClick}
                            isActive={store._id === StateManager.selectedDocumentId}
                        />))
                    }
                </Table.Body>
            </Table>
        </Container>;
    }
}

/** Require an array of Stuff documents in the props. */
ListStores.propTypes = {
    stores: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
    onItemSelected: PropTypes.func,
};
export default ListStores;
/** withTracker connects Meteor data to React components. khttps://guide.meteor.com/react.html#using-withTracer */
/*export default withTracker(({ findConfiguration }) => {

    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Stores', findConfiguration);
    return {
        stores: Stores.find().fetch(),
        ready: subscription.ready(),
    };
})(ListStores);*/
