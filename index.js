/* Server initialisation */

const http = require('http');
const logger = require('./app/utils/logger');
require('dotenv').config();

// Require app folder to create a server for app.js
const app = require('./app/app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Launching server
server.listen(port, () => {
  logger.log(`Listening on ${port}`);
});
