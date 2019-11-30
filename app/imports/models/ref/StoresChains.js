import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const StoresChains = new Mongo.Collection('StoresChains');

/** Define a schema to specify the structure of each document in the collection. */
const StoresChainsSchema = new SimpleSchema({
    _id: {
        type: SimpleSchema.RegEx.Id,
        optional: true,
    },
    name: String,
    description: {
        type: String,
        optional: true,
    },
    category: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StoresChains.attachSchema(StoresChainsSchema);

/** Make the collection and schema available to other code. */
export { StoresChainsSchema, StoresChains };
