import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { ProductsCategorySchema } from '../../ref/ProductsCategory';

/** Define a Mongo collection to hold the data. */
const FloorPlanItems = new Mongo.Collection('FloorPlanItems');

const FloorUnit = new SimpleSchema({
    products: {
        type: Array,
        defaultValue: [],
    },
    'products.$': String,

});

const FloorPlanItemsSchema = new SimpleSchema({
    _id: {
        type: SimpleSchema.RegEx.Id,
        optional: true,
    },
    storeId: SimpleSchema.RegEx.Id,
    unitType: String,
    label: String,
    productsCategories: {
        type: Array,
        defaultValue: [],
    },
    'productsCategories.$': ProductsCategorySchema,
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
    units: {
        type: Array,
        defaultValue: [],
    },
    'units.$': FloorUnit,
}, { tracker: Tracker });


/** Attach this schema to the collection. */
FloorPlanItems.attachSchema(FloorPlanItemsSchema);

/** Make the collection and schema available to other code. */
export { FloorPlanItems, FloorPlanItemsSchema };
