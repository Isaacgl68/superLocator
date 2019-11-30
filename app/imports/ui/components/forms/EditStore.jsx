import React from 'react';
import { Loader, Label, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { cloneDeep, toNumber, isNaN } from 'lodash';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { getStoreChainsList } from '../../../api/ref/StoresChainsApi';
import { getCategoryList } from '../../../api/ref/StoreCatagoryApi';
import { insert, update, getById } from '../../../api/StoresApi';

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

/** Renders the Page for editing a single document. */
class EditStore extends React.Component {

    state = {
        activeData: cloneDeep(initData),
        ready: true,
        doc: undefined,
        categoryOptions: [],
        storeChainsOptions: [],
    };

    componentDidMount() {
        getCategoryList.call({}, (err, res) => {
            if (err) {
                swal('Error', err.message, 'error');
            } else {
                const categoryOptions =
                    res.map((cat, index) => ({ key: index, text: cat.category, value: cat.category }));
                this.setState({ categoryOptions });
            }
        });
        getStoreChainsList.call({}, (err, res) => {
            if (err) {
                swal('Error', err.message, 'error');
            } else {
                const storeChainsOptions =
                    res.map((chain, index) => ({ key: index, text: chain.name, value: chain.name }));
                this.setState({ storeChainsOptions });
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { mode, documentId } = this.props;
        const { doc } = this.state;
        if (mode === 0 && documentId && documentId !== prevProps.documentId) {
            this.getDocument(documentId);
        } else if (mode !== prevProps.mode) {
            if (mode === 2 || !doc) {
                this.setState({ activeData: cloneDeep(initData) });
            } else {
                this.setState({ activeData: cloneDeep(doc) });
            }
        }

    }

    getDocument = (_id) => {
        getById.call({ _id }, (err, res) => {
            if (err) {
                swal('Error', err.message, 'error');
            } else {
                this.setState({ doc: res, activeData: cloneDeep(res) });
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
        const mode = this.props.mode;
        const activeDate = this.state.activeData;
        activeDate.location.long = (activeDate.location.long) ? toNumber(activeDate.location.long) : undefined;
        activeDate.location.lat = (activeDate.location.lat) ? toNumber(activeDate.location.lat) : undefined;

        return new Promise(function (resolve, reject) {
            const callApi = (mode === 1) ? update : insert;
            callApi.call(activeDate, (err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                    reject(err);
                } else {
                    // swal('Success', 'Item Inserted successfully', 'success');
                    that.setState({ doc: cloneDeep(activeDate) }, function () { resolve(1); });
                }
            });
        });
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
        const formIsReadOnly = this.props.mode === 0;
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
    documentId: PropTypes.string,
    mode: PropTypes.number,
};

export default EditStore;
