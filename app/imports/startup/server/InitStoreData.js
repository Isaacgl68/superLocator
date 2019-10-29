import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import storeCategoryData from '../../../server/init/data/StoreCategoryInitData';
import { StoreCategory } from '../../models/ref/StoreCategory';


const initStatusCollection = new Mongo.Collection('initStatus');

 function initStoreData() {
    if (Meteor.settings.reloadInitScripts.StoreCategory ||
        initStatusCollection.find({ collection: 'StoreCategory', init: true }).count() === 0) {
        console.log('loading StoreCategory.');
        StoreCategory.remove({});
        storeCategoryData.map(data => StoreCategory.insert(data));
        initStatusCollection.insert({ collection: 'StoreCategory', init: true });
    }
}

export default initStoreData;
