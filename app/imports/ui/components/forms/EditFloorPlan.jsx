import React from 'react';
import { observer } from 'mobx-react';
import { Loader, Label, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { cloneDeep, toNumber, isNaN } from 'lodash';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { getCategoryList } from '../../../api/ref/ProductsCatagoryApi';
import { getUnitTypeList } from '../../../api/ref/FloorUnitsTypeApi';
import { insert, update, getById } from '../../../api/StoresApi';
import FormListComponent from '../formList/FormListComponent';
import StateManager from '../../stateManager/StateManager';


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
        getCategoryList.call({}, (err, res) => {
            if (err) {
                swal('Error', err.message, 'error');
            } else {
                const productsCategoriesOptions =
                    res.map((cat, index) => ({ key: index, text: cat.label, value: cat.label }));
                this.setState({ productsCategoriesOptions });
            }
        });
        getUnitTypeList.call({}, (err, res) => {
            if (err) {
                swal('Error', err.message, 'error');
            } else {
                const unitTypeOptions =
                    res.map((unit, index) => ({ key: index, text: unit.unitType, value: unit }));
                this.setState({ unitTypeOptions });
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
        // activeDate.location.long = (activeDate.location.long) ? toNumber(activeDate.location.long) : undefined;
        // activeDate.location.lat = (activeDate.location.lat) ? toNumber(activeDate.location.lat) : undefined;

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
