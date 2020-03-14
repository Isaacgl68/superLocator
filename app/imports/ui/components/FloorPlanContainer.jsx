import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Tab } from 'semantic-ui-react';
// import { get } from 'lodash';
import DetailsContainer from './DetailsContainer';
import ListFloorPlanItems from '../pages/ListFloorPlanItems';


// import {useParams} from "react-router-dom";

class FloorPlanContainer extends Component {
    state = {
    };

    panes = [
        {
            menuItem: 'List',
            render: () => <Tab.Pane attached={false}>
                    <ListFloorPlanItems storeId={this.props.match.params.storeId}/>
                </Tab.Pane>,
        },
        {
            menuItem: 'Plan',
            render: () => <Tab.Pane attached={false}>Plan Content</Tab.Pane>,
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
    getMainAriaComponent(match) {
        return <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />;
    }


    render() {
        const { match } = this.props;
        return (
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.getMainAriaComponent(match)}
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <DetailsContainer formName="FloorPlanItems"></DetailsContainer>
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
