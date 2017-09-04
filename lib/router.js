'use strict';

const bodyParser = require('body-parser');
const controller = require('./controller');
const express = require('express');

const router = express.Router();

router.use(bodyParser.json());

router.post('/games', controller.newGame);
router.get('/games/:id', controller.loadGame);

module.exports = router;
