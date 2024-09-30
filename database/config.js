const mongoose = require('mongoose');
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log('db conectado');
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
