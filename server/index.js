const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
require('colors');

const schema = require('./schema/schema');

// Import important ENV Variables
const { PORT, NODE_ENV } = process.env;
const Port = PORT || 5000;

// Initialise Express App
const app = express();

// GrapQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: NODE_ENV === 'development',
}));

// Listen
app.listen(Port, console.log(`Serving running on port ${Port}`.cyan));
