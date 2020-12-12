import React from 'react';
import {observer} from 'mobx-react';
import {Grid, Loader, Dropdown, Segment, Form} from 'semantic-ui-react';
import {cloneDeep} from 'lodash';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import {reaction} from "mobx";
import {floorPlanItemsApi, productsCategoryApi, floorUnitsTypeApi} from '../../api/Api.js';
import StateManager from '../../stateManager/StateManager';

const initData = {
    unitType: '',
    label: '',
    productsCategories: [],
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    units: [],
};


@observer
class EditFloorItem extends React.Component {

    state = {
        activeData: Object.assign({}, initData),
        ready: true,
        doc: undefined,
        unitTypeOptions: [],
        productsCategoriesOptions: [],
    };


    componentDidMount() {
        productsCategoryApi.getList().then(
            (res) => {
                const productsCategoriesOptions =
                    res.map((cat, index) => ({key: index, text: cat.label, value: cat.label}));
                this.setState({productsCategoriesOptions});
            }, (err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }

            });
        floorUnitsTypeApi.getList().then(
            (res) => {
                const unitTypeOptions =
                    res.map((unit, index) => ({key: index, text: unit.unitType, value: unit.unitType}));
                this.setState({unitTypeOptions});
            }, (err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }

            });
        if (StateManager.selectedDocumentId) {
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
        if (StateManager.mode === 0 && selectedDocumentId) {
            this.getDocument(selectedDocumentId);
        }
    }

    onModeReaction = (mode) => {
        if (mode === 2 || !this.state.doc) {
            const newData = cloneDeep(initData);
            newData.storeId = this.props.formProps.storeId;
            this.setState({activeData: newData});
        } else {
            this.setState({activeData: cloneDeep(this.state.doc)});
        }
    }


    getDocument = (id) => {

        floorPlanItemsApi.getById(id).then(
            (res) => {
                this.setState({doc: res, activeData: cloneDeep(res)});
            }, (err) => {
                if (err) {
                    swal('Error', err.message, 'error');
                }
            });
    }

    componentWillUnmount() {
        this.onModeUpdate();
        this.onDocumentUpdate();

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
        console.log(activeDate);
        return callApi(activeDate).then(
            (res) => {
                that.setState({doc: Object.assign({}, res)});
                return res;
            }, (err) => {
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

    onLabelChange = (event) => {
        const {activeData} = this.state;
        activeData.label = event.target.value;
        this.setState({activeData: Object.assign({}, activeData)});
    }

    onXChange = (event) => {
        const {activeData} = this.state;
        activeData.x = event.target.value;
        this.setState({activeData: Object.assign({}, activeData)});
    }

    onYChange = (event) => {
        const {activeData} = this.state;
        activeData.y = event.target.value;
        this.setState({activeData: Object.assign({}, activeData)});
    }

    onWidthChange = (event) => {
        const {activeData} = this.state;
        activeData.width = event.target.value;
        this.setState({activeData: Object.assign({}, activeData)});
    }

    onHeightChange = (event) => {
        const {activeData} = this.state;
        activeData.height = event.target.value;
        this.setState({activeData: Object.assign({}, activeData)});
    }

    onTypeChange = (event, data) => {
        const {activeData} = this.state;
        activeData.unitType = data.value;
        this.setState({activeData: Object.assign({}, activeData)});
    }

    onProductCategoryChange = (event, data) => {
        const {activeData} = this.state;
        activeData.productsCategories = data.value;
        this.setState({activeData: Object.assign({}, activeData)});
    }

    renderPage() {
        const formIsReadOnly = StateManager.mode === 0;
        const {activeData, unitTypeOptions, productsCategoriesOptions} = this.state;
        return (
            <Form>
                <Form.Input required fluid label='Label' placeholder='Label'
                            value={activeData.label} onChange={this.onLabelChange}
                            readOnly={formIsReadOnly}/>
                <Form.Dropdown required fluid
                               label='Type' placeholder='Type' inline
                               value={activeData.unitType} onChange={this.onTypeChange}
                               options={unitTypeOptions}
                               disabled={formIsReadOnly}/>
                <Form.Select multiple
                             search
                             fluid
                             required label='Category' placeholder='Product Category' inline
                             value={activeData.productsCategories}
                             options={productsCategoriesOptions}
                             disabled={formIsReadOnly}
                             onChange={this.onProductCategoryChange}/>
                <Form.Group widths='equal'>
                    <Form.Input required fluid label='x' placeholder='x' type='number' inline={true}
                                value={activeData.x} onChange={this.onXChange}
                                readOnly={formIsReadOnly}/>
                    <Form.Input required fluid label='y' placeholder='y' type='number' inline
                                value={activeData.y} onChange={this.onYChange}
                                readOnly={formIsReadOnly}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input required fluid label='Width' placeholder='Width' type='number' inline
                                value={activeData.width} onChange={this.onWidthChange}
                                readOnly={formIsReadOnly}/>
                    <Form.Input required fluid label='Height' placeholder='Height' type='number' inline
                                value={activeData.height} onChange={this.onHeightChange}
                                readOnly={formIsReadOnly}/>
                </Form.Group>
            </Form>
        );
    }
}

EditFloorItem.propTypes = {
    formProps: PropTypes.object.isRequired,
};

export default EditFloorItem;
