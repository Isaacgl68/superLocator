import React from 'react';
import { observer } from 'mobx-react';
import { Loader, Label, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { cloneDeep, toNumber, isNaN } from 'lodash';
import PropTypes from 'prop-types';
import {floorPlanItemsApi, productsCategoryApi, floorUnitsTypeApi} from '../../api/Api.js';
// import FormListComponent from '../formList/FormListComponent';
import StateManager from '../../stateManager/StateManager';
import {reaction} from "mobx";


const initData = {
    width: 20,
    height: 20,
    unitsGroups: [],
};


@observer
class EditFloorPlan extends React.Component {

    state = {
        activeData: cloneDeep(initData),
        ready: true,
        doc: undefined,
        unitTypeOptions: [],
        productsCategoriesOptions: [],
    };


    componentDidMount() {
        productsCategoryApi.getList().then(
            (res) => {
                const productsCategoriesOptions =
                    res.map((cat, index) => ({ key: index, text: cat.label, value: cat.label }));
                this.setState({ productsCategoriesOptions });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }

            });
        floorUnitsTypeApi.getList().then(
            (res) => {
                const unitTypeOptions =
                    res.map((unit, index) => ({ key: index, text: unit.unitType, value: unit.unitType }));
                this.setState({ unitTypeOptions });
            },(err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }

            });
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

    onDocumentUpdateReaction = (selectedDocumentId) => {
        if (StateManager.mode === 0 && selectedDocumentId) { this.getDocument(selectedDocumentId); }
    }

    onModeReaction = (mode) => {
        if (mode === 2 || !this.state.doc) {
            const newData = cloneDeep(initData);
            newData.storeId = this.props.formProps.storeId;
            this.setState({ activeData: newData });
        } else {
            this.setState({ activeData: cloneDeep(this.state.doc) });
        }
    }

    componentDidUpdate(prevProps) {
       /* const { mode, documentId } = this.props;
        const { doc } = this.state;
        if (mode === 0 && documentId && documentId !== prevProps.documentId) {
            this.getDocument(documentId);
        } else if (mode !== prevProps.mode) {
            if (mode === 2 || !doc) {
                this.setState({ activeData: cloneDeep(initData) });
            } else {
                this.setState({ activeData: cloneDeep(doc) });
            }
        }*/

    }

    getDocument = (id) => {

        floorPlanItemsApi.getById(id).then(
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
        const callApi = (mode === 1) ? floorPlanItemsApi.update : floorPlanItemsApi.insert;
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

    onWidthChange = (event) => {
        const { activeData } = this.state;
        activeData.width = event.target.value;
        this.setState({ activeData: Object.assign({}, activeData) });
    }

    onHeightChange = (event, data) => {
        const { activeData } = this.state;
        activeData.height = data.value;
        this.setState({ activeData: Object.assign({}, activeData) });
    }


    renderPage() {
        const formIsReadOnly = this.props.mode === 0;
        const { activeData} = this.state;
        return (
            <Form>
                <Form.Input required type='number' fluid label='Floor Width' placeholder='Floor Width'
                            value={activeData.width} onChange={this.onWidthChange}
                            readOnly={formIsReadOnly}/>
                <Form.Input required type='number' fluid label='Floor Height' placeholder='Floor Height'
                            value={activeData.height} onChange={this.onHeightChange}
                            readOnly={formIsReadOnly}/>
             {/*  <FormListComponent title={'Units Groups'}
                                  mode={this.props.mode }
                                  docs={ activeData.unitsGroups }
                                  formElement={EditUnitsGroups}
                                  formProps={ { unitTypeOptions, productsCategoriesOptions } }
               /> */}
            </Form>

        );
    }
}

EditFloorPlan.propTypes = {
    documentId: PropTypes.string,
    mode: PropTypes.number,
};

export default EditFloorPlan;
