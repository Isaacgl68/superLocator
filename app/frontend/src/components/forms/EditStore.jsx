import React from 'react';
import { observer } from 'mobx-react';
import { Loader, Label, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { cloneDeep, toNumber } from 'lodash';
import StateManager from '../../stateManager/StateManager';
import PropTypes from 'prop-types';
import {storesApi, storesChainsApi, storeCategoryApi} from '../../api/Api.js';

import {reaction} from "mobx";

const initData = {
    name: '',
    description: '',
    chain: '',
    category: '',
    address: {
        line1: '',
        line2: '',
        city: '',
    },
    location: {
        lat: '',
        long: '',
    },
};

@observer
class EditStore extends React.Component {

    state = {
        activeData: cloneDeep(initData),
        ready: true,
        doc: undefined,
        categoryOptions: [],
        storeChainsOptions: [],
    };

    componentDidMount() {

        storeCategoryApi.getList().then(
            (res) => {
                const categoryOptions =
                    res.map((cat, index) => ({ key: index, text: cat.category, value: cat.category }));
                this.setState({ categoryOptions });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }

            });
        storesChainsApi.getList().then(
            (res) => {
                const storeChainsOptions =
                    res.map((chain, index) => ({ key: index, text: chain.name, value: chain.name }));
                this.setState({ storeChainsOptions });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }

            });
    }

    onDocumentUpdateReaction = (selectedDocumentId) => {
        if (StateManager.mode === 0 && selectedDocumentId) { this.getDocument(selectedDocumentId); }
    }

    onModeReaction = (mode) => {
        if (mode === 2 || !this.state.doc) {
            this.setState({ activeData: cloneDeep(initData) });
        } else {
            this.setState({ activeData: cloneDeep(this.state.doc) });
        }
    }

    onDocumentUpdate = reaction(
        () => (StateManager.selectedDocumentId),
        this.onDocumentUpdateReaction,
    );

    onModeUpdate = reaction(
        () => (StateManager.mode),
        this.onModeReaction,
    );

    getDocument = (id) => {

        storesApi.getById(id).then(
            (res) => {
                this.setState({ doc: res, activeData: cloneDeep(res) });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }
            });
    }


    /* cancel = () => {
      this.setState({ activeData: Object.assign({}, this.props.doc) });
    }
     */

    /** On successful submit, insert the data. */
    submit = () => {
        const that = this;
        const mode = StateManager.mode;
        const activeDate = this.state.activeData;
        activeDate.location.long = (activeDate.location.long) ? toNumber(activeDate.location.long) : undefined;
        activeDate.location.lat = (activeDate.location.lat) ? toNumber(activeDate.location.lat) : undefined;

        const callApi = (mode === 1) ? storesApi.update : storesApi.insert;
        return callApi(activeDate).then(
            (res) => {
                that.setState({ doc: Object.assign({}, res) });
                return res;
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }
                return err;
            }
        );
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.state.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    onNameChange = (event) => {
        const { activeData } = this.state;
        activeData.name = event.target.value;
        this.setState({ activeData: Object.assign({}, activeData) });
    }

    onLine1Change = (event) => {
        const { activeData } = this.state;
        activeData.address.line1 = event.target.value;
        this.setState({ activeData: cloneDeep(activeData) });
    }

    onLine2Change = (event) => {
        const { activeData } = this.state;
        activeData.address.line2 = event.target.value;
        this.setState({ activeData: cloneDeep(activeData) });
    }

    onCityChange = (event) => {
        const { activeData } = this.state;
        activeData.address.city = event.target.value;
        this.setState({ activeData: cloneDeep(activeData) });
    }


    onCategoryChange = (event, data) => {
        const { activeData } = this.state;
        activeData.category = data.value;
        this.setState({ activeData: Object.assign({}, activeData) });
    }

    onStoresChainChange = (event, data) => {
        const { activeData } = this.state;
        activeData.storesChains = data.value;
        this.setState({ activeData: Object.assign({}, activeData) });
    }

    onLongChange = (event) => {
        const value = event.target.value;
        const { activeData } = this.state;
        activeData.location.long = value;
        this.setState({ activeData: cloneDeep(activeData) });
    }

    onLatChange = (event) => {
        const value = event.target.value;
        const { activeData } = this.state;
        activeData.location.lat = value;
        this.setState({ activeData: cloneDeep(activeData) });
    }

    renderPage() {
        const formIsReadOnly = StateManager.mode === 0;
        const { activeData, categoryOptions, storeChainsOptions } = this.state;
        return (
            <Form>
                <Form.Input required fluid label='Chain Name' placeholder='Chain Name'
                            value={activeData.name} onChange={this.onNameChange}
                            readOnly={formIsReadOnly}/>
                <Form.Dropdown required label='Category' placeholder='Category'
                            value={activeData.category} onChange={this.onCategoryChange}
                            options={categoryOptions}
                            disabled={formIsReadOnly}/>
                <Form.Dropdown required label='Stores Chain' placeholder='Stores Chain'
                               value={activeData.chain} onChange={this.onStoresChainChange}
                               options={storeChainsOptions}
                               disabled={formIsReadOnly}/>
                <Segment padded>
                    <Label attached='top'>Address</Label>
                    <Form.Input required fluid label='Line 1' placeholder='Line 1'
                                value={activeData.address.line1} onChange={this.onLine1Change}
                                readOnly={formIsReadOnly}/>
                    <Form.Input fluid label='Line 2' placeholder='Line 2'
                                value={activeData.address.line2 || ''} onChange={this.onLine2Change}
                                readOnly={formIsReadOnly}/>
                    <Form.Input required fluid label='City' placeholder='City'
                                value={activeData.address.city} onChange={this.onCityChange}
                                readOnly={formIsReadOnly}/>
                </Segment>
                <Segment padded>
                    <Label attached='top'>Guo Location</Label>
                    <Form.Input type='number' fluid label='Longitude' placeholder='Longitude'
                                value={activeData.location.long} onChange={this.onLongChange}
                                readOnly={formIsReadOnly}/>
                    <Form.Input type='number' fluid label='Latitude' placeholder='Latitude'
                                value={activeData.location.lat} onChange={this.onLatChange}
                                readOnly={formIsReadOnly}/>
                </Segment>
            </Form>

        );
    }
}

EditStore.propTypes = {
};

export default EditStore;
