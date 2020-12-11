import React from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { storeCategoryApi } from '../../api/Api.js';
import StateManager from '../../stateManager/StateManager';
import {cloneDeep} from "lodash";

const initData = {
    category: '',
};

@observer
class EditStoreCategory extends React.Component {

    state = {
        activeData: {
            category: '',
        },
        ready: true,
        doc: undefined,
    };

    constructor(props) {
        super(props);
        this.onDocumentUpdateReaction = this.onDocumentUpdateReaction.bind(this);
        this.onModeReaction = this.onModeReaction.bind(this);
    }


    /* componentDidUpdate(prevProps) {
        const { mode, documentId } = this.props;
        const { doc } = this.state;
       if (mode === 0 && documentId && documentId !== prevProps.documentId) {
            this.getDocument(documentId);
        } else
            if (mode !== prevProps.mode) {
            if (mode === 2 || !doc) {
                this.setState({ activeData: Object.assign({}, initData) });
            } else {
                this.setState({ activeData: Object.assign({}, doc) });
            }
        }

    } */


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


    componentDidMount() {
        if (StateManager.selectedDocumentId){
            this.getDocument(StateManager.selectedDocumentId);
        }
        this.onDocumentUpdate = reaction(
            () => (StateManager.selectedDocumentId),
            this.onDocumentUpdateReaction,
        );

        this.onModeUpdate = reaction(
            () => (StateManager.mode),
            this.onModeReaction,
        );
    }

    componentWillUnmount() {
        this.onModeUpdate();
        this.onDocumentUpdate();

    }


    getDocument = (id) => {
        storeCategoryApi.getById(id).then(
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
        const callApi = (mode === 1) ? storeCategoryApi.update : storeCategoryApi.insert;
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

    onCategoryChange = (event) => {
        const { activeData } = this.state;
        activeData.category = event.target.value;
        this.setState({ activeData: Object.assign({}, activeData) });
    }

    renderPage() {
        const formIsReadOnly = StateManager.mode === 0;
        const { activeData } = this.state;
        return (
            <Form>
                <Form.Input required fluid label='Category' placeholder='Category'
                            value={activeData.category} onChange={this.onCategoryChange}
                            readOnly={formIsReadOnly}/>
            </Form>
        );
    }
}

EditStoreCategory.propTypes = {
};

export default EditStoreCategory;
