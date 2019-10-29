import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Stores = new Mongo.Collection('Stores');

const AddressSchema = new SimpleSchema({
  line1: String,
  line2: {
    type: String,
    optional: true,
  },
  city: String,
  state: {
    type: String,
    optional: true,
  },
  postCode: {
    type: String,
    optional: true,
  },
});

const LocationSchema = new SimpleSchema({
  lat: Number,
  long: Number,
});

/** Define a schema to specify the structure of each document in the collection. */
const StoreSchema = new SimpleSchema({
  name: String,
  description: {
    type: String,
    optional: true,
  },
  chain: String,
  category: String,
  address: AddressSchema,
  location: LocationSchema,


}, { tracker: Tracker });

/** Attach this schema to the collection. */
Stores.attachSchema(StoreSchema);

/** Make the collection and schema available to other code. */
export { Stores, StoreSchema, AddressSchema, LocationSchema };
