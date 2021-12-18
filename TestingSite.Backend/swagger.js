const swaggerAutogen = require('swagger-autogen')();
const settings = require("./settings/staticUrls");
const doc = {
  info: {
    version: '1.0.0',    
    title: 'REST API',      
    description: 'Testing Website', 
  },
  host: `localhost:${settings.serverPort}`,      
  basePath: '/', 
  schemes: ['http'],   
  consumes: ['application/json'],
  produces: ['application/json'], 
  tags: [        
    {
      name: '',         
      description: '',  
    },
  ],
  securityDefinitions: {}, 
  definitions: {},         
  components: {}            
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);