// import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { StoreCategory, StoreCategorySchema } from '../../models/ref/StoreCategory';

export const insert = new ValidatedMethod({
    name: 'storeCategory.insert',
    validate: StoreCategorySchema.validator(),
    run(storeCategoryData) {
        StoreCategory.insert(storeCategoryData);
    },
});
export const update = new ValidatedMethod({
    name: 'storeCategory.update',
    validate: StoreCategorySchema.validator(),
    run(storeCategoryData) {
        StoreCategory.update(storeCategoryData._id, { $set: storeCategoryData });
    },
});

export const remove = new ValidatedMethod({
    name: 'storeCategory.remove',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        StoreCategory.remove(_id);
    },
});

export const getById = new ValidatedMethod({
    name: 'storeCategory.getById',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        return StoreCategory.findOne(_id);
    },
});

export const getCategoryList = new ValidatedMethod({
    name: 'storeCategory.getCategoryList',
    validate: null,
    run() {
        console.log('getCategoryList');
        return StoreCategory.find({}, { sort: { category: -1 } }).fetch();
    },
});
