import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { StoreCategory } from '../../models/ref/StoreCategory';
import { StoresChains } from '../../models/ref/StoresChains';
import { Stores } from '../../models/app/stores/Stores';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});
Meteor.publish('StoreCategory', function publish(config) {
  if (config && config.filter) {
    return StoreCategory.find({ category: { $regex: `.*${config.filter}.*` } });
  }
    return StoreCategory.find();
});

Meteor.publish('StoresChains', function publish(config) {
  if (config && config.filter) {
    return StoresChains.find({ $or: [
                              { name: { $regex: `.*${config.filter}.*` } },
                              { category: { $regex: `.*${config.filter}.*` } },
                              ] });
  }
  return StoresChains.find();
});

Meteor.publish('Stores', function publish(config) {
  if (config && config.filter) {
    const words = config.filter.split(' ').map((word) => new RegExp(word, 'i'));
    return Stores.find({ $or: [
        { name: { $in: words } },
        { 'address.city': { $in: words } },
      ] });
  }
  return Stores.find();
});
