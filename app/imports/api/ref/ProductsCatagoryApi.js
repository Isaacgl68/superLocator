// import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { ProductsCategory, ProductsCategorySchema } from '../../models/ref/ProductsCategory';

export const insert = new ValidatedMethod({
    name: 'productsCategory.insert',
    validate: ProductsCategorySchema.validator(),
    run(productsCategoryData) {
        ProductsCategory.insert(productsCategoryData);
    },
});
export const update = new ValidatedMethod({
    name: 'productsCategory.update',
    validate: ProductsCategorySchema.validator(),
    run(productsCategoryData) {
        ProductsCategory.update(productsCategoryData._id, { $set: productsCategoryData });
    },
});

export const remove = new ValidatedMethod({
    name: 'productsCategory.remove',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        ProductsCategory.remove(_id);
    },
});

export const getById = new ValidatedMethod({
    name: 'productsCategory.getById',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        return ProductsCategory.findOne(_id);
    },
});

export const getCategoryList = new ValidatedMethod({
    name: 'productsCategory.getCategoryList',
    validate: null,
    run() {
        console.log('getCategoryList');
        return ProductsCategory.find({}, { sort: { label: 1 } }).fetch();
    },
});
