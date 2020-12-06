const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const floorUnitsTypeApi = require('./routes/ref/FloorUnitsTypeApi');
const productsCategoryApi = require('./routes/ref/ProductsCatagoryApi');
const storeCategoryApi = require('./routes/ref/StoreCategoryApi');
const storesChainsApi = require('./routes/ref/StoresChainsApi');

const floorPlanItemsApi = require('./routes/FloorPlanItemsApi');
const storesApi = require('./routes/StoresApi');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/floorUnits', floorUnitsTypeApi);
app.use('/productsCategory', productsCategoryApi);
app.use('/storeCategory', storeCategoryApi);
app.use('/storesChains', storesChainsApi);

app.use('/floorPlanItems', floorPlanItemsApi);
app.use('/stores', storesApi);

module.exports = app;
