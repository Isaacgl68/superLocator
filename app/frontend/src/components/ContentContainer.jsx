import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import StateManager from '../stateManager/StateManager';
import SummeryContainer from './SummeryContainer';
import DetailsContainer from './DetailsContainer';


@observer
class ContentContainer extends Component {
    state = {
    };

    componentDidMount() {
        StateManager.setState({ mode: 0, selectedDocumentId: null });
    }



    componentDidUpdate(prevProps) {

       // if (get(this.props, 'match.params.listName') !== get(prevProps, 'match.params.listName')) {

      //  }
    }

    getMainAriaComponent(match) {
        /* switch (match.params.listName) {
            case 'StoreCategory':
                return <ListStoreCategory findConfiguration={this.state.findConfig}></ListStoreCategory>;
            case 'StoresChains':
                return <ListStoresChains findConfiguration={this.state.findConfig}></ListStoresChains>;
            case 'Stores':
                return <ListStores findConfiguration={this.state.findConfig}></ListStores>;
            default:
                return <div>list not found error</div>
        }

         */
        return <SummeryContainer listName={match.params.listName}/>;
    }


    render() {
        const { match } = this.props;
        return (
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.getMainAriaComponent(match)}
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <DetailsContainer formName={ match.params.listName }></DetailsContainer>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

ContentContainer.propTypes = {
    match: PropTypes.object,
};

export default ContentContainer;
