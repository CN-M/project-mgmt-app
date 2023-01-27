const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
require('colors');

const { PORT, NODE_ENV } = process.env;
const Port = PORT || 5000;

const schema = require('./schema/schema');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(cors());

// GrapQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: NODE_ENV === 'development',
}));

// Listen
app.listen(Port, console.log(`Serving running on http://localhost:${Port}/graphql`.cyan.underline.bold));
