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
app.use('/api/users', usersRouter);
app.use('/api/floorUnits', floorUnitsTypeApi);
app.use('/api/productsCategory', productsCategoryApi);
app.use('/api/storeCategory', storeCategoryApi);
app.use('/api/storesChains', storesChainsApi);

app.use('/api/floorPlanItems', floorPlanItemsApi);
app.use('/api/stores', storesApi);

module.exports = app;
