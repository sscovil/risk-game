'use strict';

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const logger = require('winston');
const path = require('path');

const app = express();
const port = config.get('server.port');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}!`);
});

module.exports = app;
