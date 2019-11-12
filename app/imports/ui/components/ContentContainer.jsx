import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Input } from 'semantic-ui-react';
import SummeryContainer from './SummeryContainer';
import DetailsContainer from './DetailsContainer'


//import {useParams} from "react-router-dom";

class ContentContainer extends Component {
    state = {
        selectedItem:null
    };

    constructor(props) {
        super(props);

    }

    onItemSelected = (id) => {
        this.setState({selectedItem:id})
    }

    getMainAriaComponent(match){
        /*switch (match.params.listName) {
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
        return <SummeryContainer listName={match.params.listName} onItemSelected={this.onItemSelected}/>
    }

    getDetailsComponent(match){

        switch (match.params.listName) {
            case 'StoreCategory':
                return <ListStoreCategory findConfiguration={this.state.findConfig}></ListStoreCategory>;
            case 'StoresChains':
                return <ListStoresChains findConfiguration={this.state.findConfig}></ListStoresChains>;
            case 'Stores':
                return <ListStores findConfiguration={this.state.findConfig}></ListStores>;
            default:
                return <div>list not found error</div>

        }
    }




    render() {
        const {match} = this.props;
        return (
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.getMainAriaComponent(match)}
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <DetailsContainer documentId={this.state.selectedItem}></DetailsContainer>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

ContentContainer.propTypes = {};

export default ContentContainer;