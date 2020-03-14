import React from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { insert, update, getById } from '../../../api/ref/StoreCatagoryApi';
import StateManager from '../../stateManager/StateManager';

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

    onDocumentUpdate = reaction(
        () => (StateManager.selectedDocumentId),
        this.onDocumentUpdateReaction,
    );

    onModeUpdate = reaction(
        () => (StateManager.mode),
        this.onModeReaction,
    );


    getDocument = (_id) => {
        getById.call({ _id }, (err, res) => {
            if (err) {
                swal('Error', err.message, 'error');
            } else {
                this.setState({ doc: res, activeData: Object.assign({}, res) });
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
        return new Promise(function (resolve, reject) {
            const callApi = (mode === 1) ? update : insert;
            callApi.call(activeDate, (err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                    reject(err);
                } else {
                    // swal('Success', 'Item Inserted successfully', 'success');
                    that.setState({ doc: Object.assign({}, activeDate) }, function () { resolve(1); });
                }
            });
        });
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
