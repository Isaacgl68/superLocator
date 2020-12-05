import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Grid, Input } from 'semantic-ui-react';
import ListStoreCategory from '../pages/ListStoreCategory';
import ListStoresChains from '../pages/ListStoresChains';
import ListStores from '../pages/ListStores';
// import StateManager from '../stateManager/StateManager';


@observer
class SummeryContainer extends Component {
    state = {
        filter: '',
        findConfig: {
            filter: '',
        },
    };

    getListComponent() {
        const { listName } = this.props;
        switch (listName) {
            case 'StoreCategory':
                return <ListStoreCategory findConfiguration={this.state.findConfig}
                                          ></ListStoreCategory>;
            case 'StoresChains':
                return <ListStoresChains findConfiguration={this.state.findConfig}></ListStoresChains>;
            case 'Stores':
                return <ListStores findConfiguration={this.state.findConfig}></ListStores>;
            default:
                return <div>list not found error</div>;

        }
    }


    onSearch = () => {
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
    onItemSelected: PropTypes.func,
};

export default SummeryContainer;
