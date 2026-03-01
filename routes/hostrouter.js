//core module

const path = require('path');
//external module

const express = require('express');

const rootDir = require('../utils/path-utils');
const { homedir } = require('os');
const hostController = require("../controllers/hostController");



const hostrouter = express.Router();

hostrouter.get('/host/add-home', hostController.getAddHome);

// const registeredHomes=[];
hostrouter.post('/host/add-home', hostController.postAddHome)
hostrouter.get("/host/host-home-list", hostController.getHostHomes);

hostrouter.get('/host/edit-home/:homeId', hostController.getEditHome);
hostrouter.post('/host/edit-home', hostController.postEditHome);

hostrouter.post('/host/delete-home/:homeId', hostController.postDeleteHome)


exports.hostrouter = hostrouter;
// exports.registeredHomes=registeredHomes;
