import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import StoreCategoryData from '../../../server/init/data/StoreCategoryInitData';
import StoresChainsData from '../../../server/init/data/StoresChainsInitData';
import FloorUnitTypeInitData from '../../../server/init/data/FloorUnitTypeInitData';
import ProductCategoryData from '../../../server/init/data/ProductCategoryInitData';
import StoresData from '../../../server/init/data/StoresInitData';
import { StoreCategory } from '../../models/ref/StoreCategory';
import { StoresChains } from '../../models/ref/StoresChains';
import { FloorUnitsType } from '../../models/ref/FloorUnitsType';
import { Stores } from '../../models/app/stores/Stores';
import { ProductsCategory } from '../../models/ref/ProductsCategory';
import { FloorPlanItems } from '../../models/app/floor/FloorPlanItems';


const initStatusCollection = new Mongo.Collection('initStatus');


function loadScript(collection, initData) {
     const collectionName = collection._name;
    if (Meteor.settings.reloadInitScripts[collectionName] ||
        initStatusCollection.find({ collection: collectionName, init: true }).count() === 0) {
        console.log(`loading ${collectionName}.`);
        collection.remove({});
        initData.map(data => collection.insert(data));
        initStatusCollection.insert({ collection: collectionName, init: true });
    }
 }

function initStoreData() {

    loadScript(StoreCategory, StoreCategoryData);
    loadScript(StoresChains, StoresChainsData);
    loadScript(Stores, StoresData);
    loadScript(FloorUnitsType, FloorUnitTypeInitData);
    loadScript(ProductsCategory, ProductCategoryData);
}


export default initStoreData;
