import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ProductsCategory = new Mongo.Collection('ProductsCategory');

const ParentCategorySchema = new SimpleSchema({
    parentId: {
        type: SimpleSchema.RegEx.Id,
    },
    path: String,
});

/** Define a schema to specify the structure of each document in the collection. */
const ProductsCategorySchema = new SimpleSchema(
    {
        _id: {
            type: SimpleSchema.RegEx.Id,
            optional: true,
        },
        label: String,
        description: {
            type: String,
            optional: true,
        },
        parentCategory: {
            type: ParentCategorySchema,
            optional: true,
        },
    }, { tracker: Tracker },
);

/** Attach this schema to the collection. */
ProductsCategory.attachSchema(ProductsCategorySchema);

/** Make the collection and schema available to other code. */
export { ProductsCategory, ProductsCategorySchema };
