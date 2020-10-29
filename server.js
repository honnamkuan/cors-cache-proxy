const corsAnywhere = require('cors-anywhere');
const express = require('express');
const apicache = require('apicache');
const expressHttpProxy = require('express-http-proxy');

const CORS_PROXY_PORT = 5000;

// Create CORS server
corsAnywhere.createServer({}).listen(CORS_PROXY_PORT, () => {
  console.log(
    `Internal CORS Anywhere server started at port ${CORS_PROXY_PORT}`
  );
});

// Create express Cache server
let app = express();
app.get('/*', cacheMiddleware());
app.options('/*', cacheMiddleware());

// Proxy to CORS server when request misses cache
app.use(expressHttpProxy(`localhost:${CORS_PROXY_PORT}`));

const APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
  console.log(`External CORS cache server started at port ${APP_PORT}`);
});



/**
 * Construct the caching middleware
 */
function cacheMiddleware() {
  const cacheOptions = {
    statusCodes: { include: [200] },
    defaultDuration: 60000,
    appendKey: (req, res) => req.method
  };
  let cacheMiddleware = apicache.options(cacheOptions).middleware();
  return cacheMiddleware;
}
