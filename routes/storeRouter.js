
const path = require('path');
const express = require('express');

const storeRouter = express.Router();

// local module
const rootDir = require('../utils/path-utils');
const { registeredHomes } = require('./hostrouter');

const homesController = require("../controllers/storeController");
//   const homesController=require("../controllers/storeController");


// userrouter.get('/host/add-home',homesController.getHomes);


storeRouter.get('/', homesController.getIndex);
storeRouter.get('/homes', homesController.getHomes);
storeRouter.get('/bookings', homesController.getBookings);
storeRouter.get('/favourites', homesController.getFavouriteList);
// storeRouter.get('/homes/:homeId',homesController.getHomeDetails);
storeRouter.get("/homes/:homeId", homesController.getHomeDetails);
storeRouter.post('/favourites', homesController.postAddToFavourite);

module.exports = storeRouter;
