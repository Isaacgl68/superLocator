import React from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import {StoreCategory} from '../../../models/ref/StoreCategory';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const initData = {
  name: ''
};

/** Renders the Page for editing a single document. */
class EditStoreCategory extends React.Component {

  state = {
    activeData:{},
  };

 /* static getDerivedStateFromProps(props, state) {
    if (props.mode === 0 && props.doc._id !== state.activeData._id) {
      return {
        activeData: Object.assign({}, props.doc)
      };
    }
  }*/

  componentDidUpdate(prevProps){
    const {mode,doc} = this.props;
    const prevId = prevProps.doc ? prevProps.doc._id : undefined;
    if (mode === 0 && doc._id !== prevId) {
        this.setState({activeData: Object.assign({}, doc)});
    }else if (mode !== prevProps.mode){
      if (mode === 2){
        this.setState({activeData: Object.assign({}, initData)});
      }else if (prevProps.mode === 2){
        this.setState({activeData: Object.assign({}, doc)});
      }
    }

  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, quantity, condition, _id } = data;
    Stuffs.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  onCategoryChange = (event) => {
    const { activeData } = this.state;
    let copyData =  Object.assign({}, activeData);
    copyData.name = event.target.value;
    this.setState( {"activeData": copyData} );
  }

  renderPage() {
    const formIsReadOnly = this.props.mode === 0;
    const {activeData} = this.state;
    return (
        <Form>
          <Form.Input fluid label='Category' placeholder='Category'
                      value={activeData.name} onChange={this.onCategoryChange}
                      readOnly={formIsReadOnly} />
        </Form>
    );
  }
}

EditStoreCategory.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ documentId }) => {
  if (documentId){
    const subscription = Meteor.subscribe('StoreCategory');
    return {
      doc: StoreCategory.findOne(documentId),
      ready: subscription.ready(),
    };
  }else {
    return {
      doc: {},
      ready: true,
    };
  }

})(EditStoreCategory);
