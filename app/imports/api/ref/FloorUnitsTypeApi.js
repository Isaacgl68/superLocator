// import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { FloorUnitsType, FloorUnitsTypeSchema } from '../../models/ref/FloorUnitsType';

export const insert = new ValidatedMethod({
    name: 'floorUnitsType.insert',
    validate: FloorUnitsTypeSchema.validator(),
    run(FloorUnitsTypeData) {
        FloorUnitsType.insert(FloorUnitsTypeData);
    },
});
export const update = new ValidatedMethod({
    name: 'floorUnitsType.update',
    validate: FloorUnitsTypeSchema.validator(),
    run(FloorUnitsTypeData) {
        FloorUnitsType.update(FloorUnitsTypeData._id, { $set: FloorUnitsTypeData });
    },
});

export const remove = new ValidatedMethod({
    name: 'floorUnitsType.remove',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        FloorUnitsType.remove(_id);
    },
});

export const getById = new ValidatedMethod({
    name: 'floorUnitsType.getById',
    validate: new SimpleSchema({ _id: { type: String } }).validator(),
    run({ _id }) {
        return FloorUnitsType.findOne(_id);
    },
});

export const getUnitTypeList = new ValidatedMethod({
    name: 'floorUnitsType.getUnitTypeList',
    validate: null,
    run() {
        return FloorUnitsType.find({}, { sort: { unitType: 1 } }).fetch();
    },
});
