import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Loader } from 'semantic-ui-react';
import StoresItem from '/imports/ui/components/StoresItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stores } from '../../models/app/stores/Stores';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStores extends React.Component {
    state = {
        selectedRow: null,
    };

    onRowClick= (id) => {
        if (this.props.mode > 0) return;
        this.setState({ selectedRow: id });
        this.props.onItemSelected(id);
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

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.stores.map((store) => (
                        <StoresItem
                            key={store._id}
                            store={store}
                            onRowClick={this.onRowClick}
                            isActive={store._id === this.state.selectedRow}
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
    onItemSelected: PropTypes.func.isRequired,
    mode: PropTypes.number,
};

/** withTracker connects Meteor data to React components. khttps://guide.meteor.com/react.html#using-withTracer */
export default withTracker(({ findConfiguration }) => {

    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Stores', findConfiguration);
    return {
        stores: Stores.find().fetch(),
        ready: subscription.ready(),
    };
})(ListStores);
