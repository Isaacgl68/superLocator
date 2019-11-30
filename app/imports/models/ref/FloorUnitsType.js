import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const FloorUnitsType = new Mongo.Collection('FloorUnitsType');

/** Define a schema to specify the structure of each document in the collection. */
const FloorUnitsTypeSchema = new SimpleSchema({
    _id: {
        type: SimpleSchema.RegEx.Id,
        optional: true,
    },
    unitType: String,
    color: {
        type: String,
        defaultValue: 'blue',
    },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
FloorUnitsType.attachSchema(FloorUnitsTypeSchema);

/** Make the collection and schema available to other code. */
export { FloorUnitsType, FloorUnitsTypeSchema };
