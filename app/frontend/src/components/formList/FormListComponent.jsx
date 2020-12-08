import React from 'react';
import { Accordion, Icon, Label, Form, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import EditFloorPlan from '../forms/EditFloorPlan';


class FormListComponent extends React.Component {

    state = {}

    addClick = (event) => {
        event.stopPropagation();
    }

    getTitle() {
        return <span
            style={{ width: '95%', backgroundColor: '#E8E8E8' }}>
                {this.props.title}
          <Icon link style={{ float: 'right', marginRight: '10px' }}
                name="add" onClick={this.addClick}/>
      </span>;
    }

    renderFormElement() {
        return <this.props.formElement {...this.props.formProps} ></this.props.formElement>;
    }

    renderPanel() {
        return [
            {
                key: 'details',
                title: { style: { backgroundColor: '#E8E8E8' }, content: this.getTitle() },
                content: { content: (
                    <Grid verticalAlign='middle' style={{ width: '95%' }} >
                        <Grid.Row style={{ flexWrap: 'nowrap' }} >
                            <Grid.Column width={15}>
                                <Segment raise color='brown'>
                                    { this.renderFormElement() }
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <Icon name="delete"/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                ) },
            },
        ];
    }

    render() {
        const panels = this.renderPanel();
        return (
            <Accordion panels={panels}/>
        );
    }
}

FormListComponent.propTypes = {
    title: PropTypes.PropTypes.string.required,
    formElement: PropTypes.object,
    formProps: PropTypes.PropTypes.array,
    docs: PropTypes.PropTypes.array,
    mode: PropTypes.number,
};

export default FormListComponent;
