const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
require('colors');

// Import Schema and DB
const schema = require('./schema/schema');
const connectDB = require('./config/db');

// Import important ENV Variables
const { PORT, NODE_ENV } = process.env;
const Port = PORT || 5000;

// Initialise Express App
const app = express();

// Connect Database
connectDB();

// GrapQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: NODE_ENV === 'development',
}));

// Listen
app.listen(Port, console.log(`Serving running on http://localhost:${Port}/graphql`.cyan.underline.bold));
