import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const StoreCategory = new Mongo.Collection('StoreCategory');

/** Define a schema to specify the structure of each document in the collection. */
const StoreCategorySchema = new SimpleSchema({
    _id: {
        type: SimpleSchema.RegEx.Id,
        optional: true,
    },
    category: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StoreCategory.attachSchema(StoreCategorySchema);

/** Make the collection and schema available to other code. */
export { StoreCategory, StoreCategorySchema };
