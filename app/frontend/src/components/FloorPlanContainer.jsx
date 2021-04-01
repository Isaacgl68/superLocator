import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Tab } from 'semantic-ui-react';
// import { get } from 'lodash';
import DetailsContainer from './DetailsContainer';
import ListFloorPlanItems from '../pages/ListFloorPlanItems';
import FloorPlanCanvas from './planEditor/FloorPlanCanvas';
import StateManager from "../stateManager/StateManager";
import {storesApi} from "../api/Api";
import swal from "sweetalert";


// import {useParams} from "react-router-dom";

class FloorPlanContainer extends Component {
    state = {
        store:undefined
    };

    componentDidMount() {
        StateManager.setSelectedDocumentId(undefined);
        storesApi.getById(this.props.match.params.storeId).then(
            (res) => {
                this.setState({ store: res, ready: true });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                    this.setState({ ready: true });
                }
            });
    }

    panes = [
        {
            menuItem: 'List',
            render: () => <Tab.Pane attached={false}>
                    <ListFloorPlanItems storeId={this.props.match.params.storeId}/>
                </Tab.Pane>,
        },
        {
            menuItem: 'Plan',
            render: () => <Tab.Pane attached={false}><FloorPlanCanvas store={this.state.store}
            /></Tab.Pane>,
        },
    ]
        /*
        constructor(props) {
            super(props);

        }

        /* componentDidUpdate(prevProps) {
             if (get(this.props, 'match.params.listName') !== get(prevProps, 'match.params.listName')) {
                this.setState({ mode: 0, selectedItem: null });
             }
        }  */

    onModeChange = (mode) => {
        this.setState({ mode });
    }

    // eslint-disable-next-line no-unused-vars
    getMainAreaComponent(match) {
        return <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />;
    }


    render() {
        const { match } = this.props;
        return (
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.getMainAreaComponent(match)}
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <DetailsContainer formName="FloorPlanItems" formProps={{storeId: match.params.storeId }}></DetailsContainer>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

FloorPlanContainer.propTypes = {
    match: PropTypes.object,
};

export default FloorPlanContainer;
