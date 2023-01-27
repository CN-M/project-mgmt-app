const mongoose = require('mongoose');

const { DB_URI } = process.env;

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  const db = await mongoose.connect(DB_URI);
  console.log(`DB Connected: ${db.connection.host}`.magenta.underline.bold);
};

module.exports = connectDB;
