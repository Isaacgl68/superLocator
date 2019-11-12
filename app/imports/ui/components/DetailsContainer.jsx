import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Button} from 'semantic-ui-react';
import EditStoreCategory from "./forms/EditStoreCategory";

//import {useParams} from "react-router-dom";

class DetailsContainer extends Component {
    state = {
        mode:0 // read only
    };

    constructor(props) {
        super(props);
    }

    getFormComponent(){
        const {formName, documentId} = this.props;
        return <EditStoreCategory mode={this.state.mode} documentId={documentId}></EditStoreCategory>
    }

    onAddClick = () => {
        this.setState({mode: 2});

    }


    render() {
        const {mode} = this.state;
        const saveGroupStyle = (mode > 0 ) ? {} : {display: 'none'};
        const addColor = mode === 2 ? 'blue':'';
        const editColor = mode === 1 ? 'blue':'';
        return (
            <Segment>
                <div>
                    <Button icon="edit outline"  color={editColor} disabled={mode > 0 }
                            onClick={() => this.setState({mode: 1})}/>
                    <Button icon="add"  color={addColor} disabled={mode > 0 }
                            onClick={() => this.setState({mode: 2})}/>
                    <Button.Group floated='right' style = {saveGroupStyle}>
                        <Button onClick={() => this.setState({mode: 0})}>Cancel</Button>
                        <Button.Or />
                        <Button positive onClick={() => this.setState({mode: 0})}>Save</Button>
                    </Button.Group>
                </div>
                <Segment>
                    {this.getFormComponent()}
                </Segment>
            </Segment>

        );
    }
}

DetailsContainer.propTypes = {
    formName: PropTypes.string.isRequired,
    documentId:PropTypes.string
};

export default DetailsContainer;