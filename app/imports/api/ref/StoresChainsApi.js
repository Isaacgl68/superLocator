// import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { StoresChains, StoresChainsSchema } from '../../models/ref/StoresChains';
import {StoreCategory} from "../../models/ref/StoreCategory";

export const insert = new ValidatedMethod({
    name: 'storesChains.insert',
    validate: StoresChainsSchema.validator(),
    run(storesChainData) {
        StoresChains.insert(storesChainData);
    },
});
export const update = new ValidatedMethod({
    name: 'storesChains.update',
    validate: StoresChainsSchema.validator(),
    run(storesChainData) {

        StoresChains.update(storesChainData._id, { $set: storesChainData });
    },
});

export const remove = new ValidatedMethod({
    name: 'storesChains.remove',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        StoresChains.remove(_id);
    },
});

export const getById = new ValidatedMethod({
    name: 'storesChains.getById',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        return StoresChains.findOne(_id);
    },
});

export const getStoreChainsList = new ValidatedMethod({
    name: 'storesChains.getStoreChainsList',
    validate: null,
    run() {
        console.log('getgetStoreChainsList');
        return StoresChains.find({}, { sort: { name: 1 } }).fetch();
    },
});
