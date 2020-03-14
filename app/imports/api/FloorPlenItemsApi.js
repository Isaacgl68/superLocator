// import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { FloorPlanItems, FloorPlanItemsSchema } from '../models/app/floor/FloorPlanItems';

export const insert = new ValidatedMethod({
    name: 'floorPlanItems.insert',
    validate: FloorPlanItemsSchema.validator(),
    run(floorPlanItemsData) {
        FloorPlanItems.insert(floorPlanItemsData);
    },
});
export const update = new ValidatedMethod({
    name: 'floorPlanItems.update',
    validate: FloorPlanItemsSchema.validator(),
    run(floorPlanItemsData) {

        FloorPlanItems.update(floorPlanItemsData._id, { $set: floorPlanItemsData });
    },
});

export const remove = new ValidatedMethod({
    name: 'floorPlanItems.remove',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        FloorPlanItems.remove(_id);
    },
});

export const getById = new ValidatedMethod({
    name: 'floorPlanItems.getById',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        return FloorPlanItems.findOne(_id);
    },
});
