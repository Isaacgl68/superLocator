import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { ProductsCategorySchema } from '../../ref/ProductsCategory';

/** Define a Mongo collection to hold the data. */
const FloorPlan = new Mongo.Collection('FloorPlan');

const FloorUnit = new SimpleSchema({
    products: {
        type: [String],
        defaultValue: [],
    },

});

const FloorUnitGroup = new SimpleSchema({
    unitType: String,
    label: String,
    productsCategories: {
        type: [ProductsCategorySchema],
        defaultValue: [],
    },
    x: SimpleSchema.Integer,
    y: SimpleSchema.Integer,
    width: {
        type: SimpleSchema.Integer,
        defaultValue: 1,
    },
    height: {
        type: SimpleSchema.Integer,
        defaultValue: 1,
    },
    FloorUnits: {
        type: [FloorUnit],
        defaultValue: [],
    },
});

/** Define a schema to specify the structure of each document in the collection. */
const FloorPlanSchema = new SimpleSchema({
    _id: {
        type: SimpleSchema.RegEx.Id, // same as store id
    },
    floorNumber: {
        type: SimpleSchema.Integer,
        defaultValue: 1,
    },
    width: {
        type: SimpleSchema.Integer,
        defaultValue: 20,
    },
    height: {
        type: SimpleSchema.Integer,
        defaultValue: 20,
    },
    unitGroups: {
        type: [FloorUnitGroup],
        defaultValue: [],
    },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
FloorPlan.attachSchema(FloorPlanSchema);

/** Make the collection and schema available to other code. */
export { FloorPlan, FloorPlanSchema };
