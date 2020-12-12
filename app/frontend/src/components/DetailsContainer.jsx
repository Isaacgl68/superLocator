import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Segment, Button } from 'semantic-ui-react';
import EditStoreCategory from './forms/EditStoreCategory';
import EditStoreChain from './forms/EditStoreChain';
import EditStore from './forms/EditStore';
import EditFloorItem from './forms/EditFloorItem';
import StateManager from '../stateManager/StateManager';


@observer
class DetailsContainer extends Component {
    state = {
    };

    formRef = React.createRef();

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    getFormComponent() {
        const { formName, formProps } = this.props;
        switch (formName) {
            case 'StoreCategory':
                return <EditStoreCategory ref={this.formRef} />;
            case 'StoresChains':
                return <EditStoreChain ref={this.formRef}/>;
            case 'Stores':
                return <EditStore ref={this.formRef}/>;
            case 'FloorPlanItems':
                return <EditFloorItem ref={this.formRef} formProps={formProps} />;
            default:
                return <div>Form not found.</div>;
        }
    }

    onAddClick = () => {
        StateManager.setMode(2);

    }

    onEditClick = () => {
        if (StateManager.selectedDocumentId) {
            StateManager.setMode(1);
        }
    }

     onSubmit = async () => {
        await this.formRef.current.submit();
         StateManager.setMode(0);
    }

    onCancel = () => {
        StateManager.setMode(0);
    }


    render() {
        const { mode, selectedDocumentId } = StateManager;
        const saveGroupStyle = (mode > 0) ? {} : { display: 'none' };
        const lockButtonStyle = (mode > 0) ? { display: 'none' } : { };
        const editButtonStyle = (mode === 2 || !selectedDocumentId) ? { display: 'none' } : { };
        const addButtonStyle = (mode === 1) ? { display: 'none' } : { };
        const addColor = mode === 2 ? 'twitter' : null;
        const lockColor = mode === 0 ? 'twitter' : null;
        const editColor = mode === 1 ? 'twitter' : null; // lightgray
        return (
            <Segment>
                <div>
                    <Button.Group toggel={'true'}>
                        <Button icon="lock"
                                style={lockButtonStyle}
                                active={mode === 0}
                                color={ lockColor }
                        />
                        <Button icon="edit outline"
                                style={editButtonStyle}
                                disabled={ !selectedDocumentId}
                                color={ editColor }
                                active={mode === 1}
                                onClick={this.onEditClick}/>
                        <Button icon="add"
                                style={addButtonStyle}
                                active={mode === 2}
                                color={ addColor }
                                onClick={this.onAddClick}/>
                    </Button.Group>
                    <Button.Group floated='right' style={saveGroupStyle}>
                        <Button onClick={this.onCancel}>Cancel</Button>
                        <Button.Or/>
                        <Button positive onClick={this.onSubmit}>Save</Button>
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
    formProps: PropTypes.object,
};

export default DetailsContainer;
