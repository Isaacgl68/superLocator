import React from 'react';
import { observer } from 'mobx-react';
import { Container, Table, Loader } from 'semantic-ui-react';
import FloorPlanItemsListItem from '/imports/ui/components/FloorPlanItemsListItem';
import PropTypes from 'prop-types';
import { FloorPlanItems } from '../../../imports/models/app/floor/FloorPlanItems';
import StateManager from '../stateManager/StateManager';


@observer
class ListFloorPlanItems extends React.Component {
    state = {
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
                        <Table.HeaderCell>Label</Table.HeaderCell>
                        <Table.HeaderCell>Unit Type</Table.HeaderCell>
                        <Table.HeaderCell>x</Table.HeaderCell>
                        <Table.HeaderCell>y</Table.HeaderCell>
                        <Table.HeaderCell>Width</Table.HeaderCell>
                        <Table.HeaderCell>Height</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.floorPlanItems.map((floorPlanItems) => (
                        <FloorPlanItemsListItem
                            key={floorPlanItems._id}
                            floorPlanItem={floorPlanItems}
                            onRowClick={this.onRowClick}
                            isActive={floorPlanItems._id === StateManager.selectedDocumentId}
                        />))
                    }
                </Table.Body>
            </Table>
        </Container>;
    }
}

ListFloorPlanItems.propTypes = {
    floorPlanItems: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
    onItemSelected: PropTypes.func
};

export default ListFloorPlanItems;

/** withTracker connects Meteor data to React components. khttps://guide.meteor.com/react.html#using-withTracer */
/*export default withTracker(({ storeId, findConfiguration }) => {

    const subscription = Meteor.subscribe('FloorPlanItems', storeId, findConfiguration);
    return {
        floorPlanItems: FloorPlanItems.find().fetch(),
        ready: subscription.ready(),
    };
})(ListFloorPlanItems);*/
