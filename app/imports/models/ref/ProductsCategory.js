import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ProductsCategory = new Mongo.Collection('ProductsCategory');

/** Define a schema to specify the structure of each document in the collection. */
const ProductsCategorySchema = new SimpleSchema(
    {
        name: String,
        description: String,
        parentCategory: Object,
        'parentCategory._id': String,
        'parentCategory.path': String,
    }, { tracker: Tracker },
);

/** Attach this schema to the collection. */
ProductsCategory.attachSchema(ProductsCategorySchema);

/** Make the collection and schema available to other code. */
export { ProductsCategory, ProductsCategorySchema };
