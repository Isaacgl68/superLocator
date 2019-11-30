import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { get } from 'lodash';
import SummeryContainer from './SummeryContainer';
import DetailsContainer from './DetailsContainer';


// import {useParams} from "react-router-dom";

class ContentContainer extends Component {
    state = {
        selectedItem: null,
        mode: 0,
    };

    constructor(props) {
        super(props);

    }


    componentDidUpdate(prevProps) {
        if (get(this.props, 'match.params.listName') !== get(prevProps, 'match.params.listName')) {
            this.setState({ mode: 0, selectedItem: null });
        }
    }

    onModeChange = (mode) => {
        this.setState({ mode });
    }

    onItemSelected = (id) => {
        this.setState({ selectedItem: id });
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
        return <SummeryContainer listName={match.params.listName}
                                 mode={this.state.mode}
                                 onItemSelected={this.onItemSelected}/>;
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
                        <DetailsContainer documentId={this.state.selectedItem}
                                          onModeChange={this.onModeChange}
                                          mode={this.state.mode}
                                          formName={ match.params.listName }></DetailsContainer>
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
