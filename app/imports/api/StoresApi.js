// import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Stores, StoreSchema } from '../models/app/stores/Stores';

export const insert = new ValidatedMethod({
    name: 'stores.insert',
    validate: StoreSchema.validator(),
    run(storesData) {
        Stores.insert(storesData);
    },
});
export const update = new ValidatedMethod({
    name: 'stores.update',
    validate: StoreSchema.validator(),
    run(storesData) {

        Stores.update(storesData._id, { $set: storesData });
    },
});

export const remove = new ValidatedMethod({
    name: 'stores.remove',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        Stores.remove(_id);
    },
});

export const getById = new ValidatedMethod({
    name: 'stores.getById',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        return Stores.findOne(_id);
    },
});
