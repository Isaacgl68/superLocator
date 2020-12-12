import { get, post, put, remove } from './../utils/rest-utilities';

const BASE_API = '/api/'


export class BaseCrudApi  {

    baseApiName =  '';

    getList =  () => {
        return get(`${BASE_API}${this.baseApiName}`)
    }

    getById = (id) => {
        return get(`${BASE_API}${this.baseApiName}/${id}`);
    }
    insert = (data) => {
        return put(`${BASE_API}${this.baseApiName}`, data);
    }

    update = (data) => {
        return post(`${BASE_API}${this.baseApiName}/${data._id}`, data);
    }

    delete = (id) => {
        return delete (`${BASE_API}${this.baseApiName}/${id}`);
    }

}

class FloorUnitsTypeApi extends BaseCrudApi {
    baseApiName =  'floorUnits';
}

class ProductsCategoryApi extends BaseCrudApi {
    baseApiName =  'productsCategory';
}
class StoresChainsApi extends BaseCrudApi {
    baseApiName =  'storesChains';
}
class StoreCategoryApi extends BaseCrudApi {
    baseApiName =  'storeCategory';
}
class FloorPlanItemsApi extends BaseCrudApi {
    baseApiName =  'floorPlanItems';
    getList = (storeId) => {
        return get(`${BASE_API}${this.baseApiName}/store/${storeId}`)
    }
}
class StoresApi extends BaseCrudApi {
    baseApiName =  'stores';
}

export const floorUnitsTypeApi = new FloorUnitsTypeApi();
export const productsCategoryApi = new ProductsCategoryApi();
export const storesChainsApi = new StoresChainsApi();
export const storeCategoryApi = new StoreCategoryApi();
export const floorPlanItemsApi = new FloorPlanItemsApi();
export const storesApi = new StoresApi();

