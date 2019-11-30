import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import EditStoreCategory from './forms/EditStoreCategory';
import EditStoreChain from './forms/EditStoreChain';
import EditStore from './forms/EditStore';

// import {useParams} from "react-router-dom";

class DetailsContainer extends Component {
    state = {
        mode: 0, // read only
    };

    formRef = React.createRef();

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    getFormComponent() {
        const { formName, documentId, mode } = this.props;
        switch (formName) {
            case 'StoreCategory':
                return <EditStoreCategory ref={this.formRef}
                                          mode={mode}
                                          documentId={documentId}>
                </EditStoreCategory>;
            case 'StoresChains':
                return <EditStoreChain ref={this.formRef}
                                          mode={mode}
                                          documentId={documentId}>
                </EditStoreChain>;
            case 'Stores':
                return <EditStore ref={this.formRef}
                                   mode={mode}
                                   documentId={documentId}>
                </EditStore>;
            default:
                return <div>list not found error</div>;
        }
    }

    onAddClick = () => {
        // this.setState({ mode: 2 });
        this.props.onModeChange(2);

    }

    onEditClick = () => {
        if (this.props.documentId) {
            // this.setState({ mode: 1 });
            this.props.onModeChange(1);
        }
    }

     onSubmit = async () => {
        await this.formRef.current.submit();
        // this.setState({ mode: 0 });
         this.props.onModeChange(0);
    }

    onCancel = () => {
        // this.setState({ mode: 0 });
        this.props.onModeChange(0);
    }


    render() {
        const { mode } = this.props;
        const saveGroupStyle = (mode > 0) ? {} : { display: 'none' };
        const lockButtonStyle = (mode > 0) ? { display: 'none' } : { };
        const editButtonStyle = (mode === 2 || !this.props.documentId) ? { display: 'none' } : { };
        const addButtonStyle = (mode === 1) ? { display: 'none' } : { };
        const addColor = mode === 2 ? 'twitter' : null;
        const lockColor = mode === 0 ? 'twitter' : null;
        const editColor = mode === 1 ? 'twitter' : null; // lightgray
        return (
            <Segment>
                <div>
                    <Button.Group toggel>
                        <Button icon="lock"
                                style={lockButtonStyle}
                                active={mode === 0}
                                color={ lockColor }
                        />
                        <Button icon="edit outline"
                                style={editButtonStyle}
                                disabled={ !this.props.documentId}
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
    documentId: PropTypes.string,
    onModeChange: PropTypes.func,
    mode: PropTypes.number,
};

export default DetailsContainer;
