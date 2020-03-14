import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { insert, update, getById } from '../../../api/ref/StoreCatagoryApi';

const initData = {
    category: '',
};

/** Renders the Page for editing a single document. */
class EditStoreCategory extends React.Component {

    state = {
        activeData: {
            category: '',
        },
        ready: true,
        doc: undefined,
    };

    /* static getDerivedStateFromProps(props, state) {
       if (props.mode === 0 && props.doc._id !== state.activeData._id) {
         return {
           activeData: Object.assign({}, props.doc)
         };
       }
     } */

    componentDidUpdate(prevProps) {
        const { mode, documentId } = this.props;
        const { doc } = this.state;
        if (mode === 0 && documentId && documentId !== prevProps.documentId) {
            this.getDocument(documentId);
        } else if (mode !== prevProps.mode) {
            if (mode === 2 || !doc) {
                this.setState({ activeData: Object.assign({}, initData) });
            } else {
                this.setState({ activeData: Object.assign({}, doc) });
            }
        }

    }

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
        const mode = this.props.mode;
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
        const formIsReadOnly = this.props.mode === 0;
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
    documentId: PropTypes.string,
    mode: PropTypes.number,
};

export default EditStoreCategory;


/* export default withTracker(({ documentId }) => {
    if (documentId) {
        const subscription = Meteor.subscribe('StoreCategory');
        return {
            doc: StoreCategory.findOne(documentId),
            ready: subscription.ready(),
        };
    }
    return {
        doc: {},
        ready: true,
    };


})(EditStoreCategory); */