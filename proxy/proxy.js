var corsProxy = require('cors-anywhere'); 

require('dotenv').config();
var host = process.env.KANNEL_CORS_PROXY_HOST || '0.0.0.0'; 
var port = process.env.KANNEL_CORS_PROXY_PORT || 8181;

corsProxy.createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
}).listen(port, host, function () {
    console.log(`Running CORS proxy on ${host}:${port}`); 
}); 