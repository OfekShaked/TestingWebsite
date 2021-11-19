const mongoose = require('mongoose');
const logger = require('./logger');

class Database { // Singleton
  connection = mongoose.connection;
  
  constructor() {
    try {
      this.connection
      .on('open', console.error.bind(console, 'Database connection: open'))
      .on('close', console.error.bind(console, 'Database connection: close'))
      .on('disconnected', console.error.bind(console, 'Database connection: disconnecting'))
      .on('disconnected', console.error.bind(console, 'Database connection: disconnected'))
      .on('reconnected', console.error.bind(console, 'Database connection: reconnected'))
      .on('fullsetup', console.error.bind(console, 'Database connection: fullsetup'))
      .on('all', console.error.bind(console, 'Database connection: all'))
      .on('error', console.error.bind(console, 'MongoDB connection: error:'));
    } catch (error) {
      logger.error(error);
    }
  }

  async connect(dbname) {
    try {
      await mongoose.connect(
        `mongodb://localhost:27017/${dbname}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
    } catch (error) {
      logger.error(error);
    }
  }

  async close() {
    try {
      await this.connection.close();
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = new Database();