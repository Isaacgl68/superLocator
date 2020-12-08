import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Loader, Dropdown, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import StateManager from '../../stateManager/StateManager';
import {storesChainsApi, storeCategoryApi} from '../../api/Api.js';
import {cloneDeep} from "lodash";

const initData = {
    name: '',
    category: '',
};

@observer
class EditStoreChain extends React.Component {

    state = {
        activeData: {
            name: '',
            category: '',
        },
        ready: true,
        doc: undefined,
        categoryOptions: [],
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
    }


    onDocumentUpdateReaction = (selectedDocumentId) => {
        if (StateManager.mode === 0 && selectedDocumentId) { this.getDocument(selectedDocumentId); }
    }

    onModeReaction = (mode) => {
        if (mode === 2 || !this.state.doc) {
            this.setState({ activeData: Object.assign({}, initData) });
        } else {
            this.setState({ activeData: Object.assign({}, this.state.doc) });
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
        storesChainsApi.getById(id).then(
            (res) => {
                this.setState({ doc: res, activeData: cloneDeep(res) });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }
            });
    }

    /** On successful submit, insert the data. */
    submit = () => {
        const that = this;
        const mode = StateManager.mode;
        const activeDate = this.state.activeData;
        const callApi = (mode === 1) ? storesChainsApi.update : storesChainsApi.insert;
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

    onCategoryChange = (event, data) => {
        const { activeData } = this.state;
        activeData.category = data.value;
        this.setState({ activeData: Object.assign({}, activeData) });
    }

    renderPage() {
        const formIsReadOnly = StateManager.mode === 0;
        const { activeData, categoryOptions } = this.state;
        return (
            <Form>
                <Form.Input required fluid label='Chain Name' placeholder='Chain Name'
                            value={activeData.name} onChange={this.onNameChange}
                            readOnly={formIsReadOnly}/>
                <Form.Dropdown required label='Category' placeholder='Category'
                            value={activeData.category} onChange={this.onCategoryChange}
                            options={categoryOptions}
                            disabled={formIsReadOnly}/>
            </Form>
        );
    }
}

EditStoreChain.propTypes = {
};

export default EditStoreChain;
