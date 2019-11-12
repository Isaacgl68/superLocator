import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import StoreCategoryData from '../../../server/init/data/StoreCategoryInitData';
import StoresChainsData from '../../../server/init/data/StoresChainsInitData';
import StoresData from '../../../server/init/data/StoresInitData';
import { StoreCategory } from '../../models/ref/StoreCategory';
import { StoresChains } from '../../models/ref/StoresChains';
import { Stores } from '../../models/app/stores/Stores';


const initStatusCollection = new Mongo.Collection('initStatus');

 function initStoreData() {

     loadScript(StoreCategory, StoreCategoryData);
     loadScript(StoresChains, StoresChainsData);
     loadScript(Stores, StoresData);
}

function loadScript(collection, initData){
     const collectionName = collection._name;
    if (Meteor.settings.reloadInitScripts[collectionName] ||
        initStatusCollection.find({ collection: collectionName, init: true }).count() === 0) {
        console.log(`loading ${collectionName}.`);
        collection.remove({});
        initData.map(data => collection.insert(data));
        initStatusCollection.insert({ collection: collectionName , init: true });
    }
 }

export default initStoreData;
