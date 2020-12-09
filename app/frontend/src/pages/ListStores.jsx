import React from 'react';
import { Container, Table, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import StoresItem from '../components/StoresItem';
import PropTypes from 'prop-types';
// import { Stores } from '../../../imports/models/app/stores/Stores';
import StateManager from '../stateManager/StateManager';
import {storesApi} from "../api/Api";
import swal from "sweetalert";



@observer
class ListStores extends React.Component {
    state = {
        stores: [],
        ready: false
    };

    componentDidMount() {
        storesApi.getList().then(
            (res) => {
                this.setState({ stores: res, ready: true });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                    this.setState({ ready: true });
                }
            });
    }

    onRowClick= (id) => {
        if (StateManager.mode > 0) return;
        StateManager.setSelectedDocumentId(id);
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.state.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
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
                    {this.state.stores.map((store) => (
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
