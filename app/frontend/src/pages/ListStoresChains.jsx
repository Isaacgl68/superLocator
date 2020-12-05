import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Container, Table, Header, Loader, Input} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import StoresChainsItem from '/imports/ui/components/StoresChainsItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { StoresChains } from '../../../imports/models/ref/StoresChains';
import StateManager from '../stateManager/StateManager';



@observer
class ListStoresChains extends React.Component {
    state = {
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
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.storesChains.map((storesChain) => (
                        <StoresChainsItem key={storesChain._id}
                                          onRowClick={this.onRowClick}
                                          isActive={storesChain._id === StateManager.selectedDocumentId}
                                          storesChain={storesChain}></StoresChainsItem>))
                    }
                </Table.Body>
            </Table>
        </Container>;
    }
}

/** Require an array of Stuff documents in the props. */
ListStoresChains.propTypes = {
    storesChains: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
    onItemSelected: PropTypes.func,
};

export default ListStoresChains

/** withTracker connects Meteor data to React components. khttps://guide.meteor.com/react.html#using-withTracer */
/*export default withTracker(({findConfiguration}) => {

    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('StoresChains', findConfiguration);
    return {
        storesChains: StoresChains.find().fetch(),
        ready: subscription.ready(),
    };
})(ListStoresChains);*/
