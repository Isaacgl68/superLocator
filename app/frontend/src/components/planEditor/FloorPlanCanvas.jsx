import React from 'react';
import get from 'lodash/get';
import { observer } from 'mobx-react';
import { Container, Table, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import StateManager from '../../stateManager/StateManager';
import swal from "sweetalert";
import {floorPlanItemsApi} from "../../api/Api";
import { AxisLeft, AxisTop } from '@vx/axis';
import { scaleLinear } from '@vx/scale';
import {Group} from '@vx/group';
import { Grid } from '@vx/grid';

const margin = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 60,
};
const width = 700;
const height = 700;

const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;



@observer
class FloorPlanCanvas extends React.Component {
    state = {
        floorPlanItems:[],
        ready: false,
    };

    componentDidMount() {
        StateManager.setSelectedDocumentId(undefined);
        const {store} = this.props;
        if (store){
            this.getFloorPlanItems(store);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.store !== this.props.store && this.props.store){
            this.getFloorPlanItems(this.props.store);
        }
    }

    getFloorPlanItems(store){
        floorPlanItemsApi.getList(store._id).then(
            (res) => {
                this.setState({ floorPlanItems: res, ready: true });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                    this.setState({ ready: true });
                }
            });
    }

    onItemClick= (id) => {
        if (StateManager.mode > 0) return;
        StateManager.setSelectedDocumentId(id);
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.state.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        const {store} = this.props;
        const domainWidth = get(store ,'floorPlan.width', 10);
        const domainHeight = get(store ,'floorPlan.height', 10);
        const yScale = scaleLinear({
            range: [0, yMax],
            domain: [0, domainHeight],
        });
        const xScale = scaleLinear({
            range: [0, xMax],
            domain: [0, domainWidth]
        });
        return <svg width={width} height={height}>
                <Group top={margin.top} left={margin.left}>
                    <AxisLeft
                        scale={yScale}
                        top={0}
                        left={0}
                        label={''}
                        stroke={'#1b1a1e'}
                        tickTextFill={'#1b1a1e'}
                    />
                    <AxisTop
                        scale={xScale}
                        label={''}
                        stroke={'#1b1a1e'}
                        tickTextFill={'#1b1a1e'}
                    />
                    <Grid
                        xScale={xScale}
                        yScale={yScale}
                        width={xMax}
                        height={yMax}
                        numTicksRows={domainHeight}
                        numTicksColumns={domainWidth}
                    />
                </Group>
            </svg>
    }
}

FloorPlanCanvas.propTypes = {
    onItemSelected: PropTypes.func,
    store: PropTypes.object
};

export default FloorPlanCanvas;

