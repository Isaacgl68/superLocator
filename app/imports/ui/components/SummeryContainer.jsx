import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Input } from 'semantic-ui-react';
import ListStoreCategory from '../pages/ListStoreCategory';
import ListStoresChains from '../pages/ListStoresChains';
import ListStores from '../pages/ListStores';

// import {useParams} from "react-router-dom";

class SummeryContainer extends Component {
    state = {
        filter: '',
        findConfig: {
            filter: '',
        },
    };

    constructor(props) {
        super(props);
    }

    getListComponent() {
        const { listName, mode } = this.props;
        switch (listName) {
            case 'StoreCategory':
                return <ListStoreCategory findConfiguration={this.state.findConfig}
                                          mode={mode}
                                          onItemSelected={this.props.onItemSelected}></ListStoreCategory>;
            case 'StoresChains':
                return <ListStoresChains findConfiguration={this.state.findConfig}
                                         mode={mode}
                                         onItemSelected={this.props.onItemSelected} ></ListStoresChains>;
            case 'Stores':
                return <ListStores findConfiguration={this.state.findConfig}
                                   mode={mode}
                                   onItemSelected={this.props.onItemSelected} ></ListStores>;
            default:
                return <div>list not found error</div>;

        }
    }


    onSearch = (event) => {
        const findConfig = Object.assign({}, this.state.findConfig);
        findConfig.filter = this.state.filter;
        this.setState({ findConfig });

    }

    render() {
        return (
            <Grid >
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Input type="text"
                               action={{
                                   icon: 'search',
                                   onClick: this.onSearch,
                               }}
                               value={this.state.filter}
                               actionPosition='left'
                               onChange={(event) => this.setState({ filter: event.currentTarget.value })}
                               placeholder="Search..."/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {this.getListComponent()}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={3}>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

SummeryContainer.propTypes = {
    listName: PropTypes.string.isRequired,
    onItemSelected: PropTypes.func.isRequired,
    mode: PropTypes.number,
};

export default SummeryContainer;