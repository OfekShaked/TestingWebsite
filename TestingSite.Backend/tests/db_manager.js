const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

class DBManager {
  constructor() {
    this.db = null;
    this.server = null;
    this.connection = null;
  }

  async start() {
    this.server = await MongoMemoryServer.create(); 
    await mongoose.connect(this.server.getUri());   
  }

  async stop() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.server.stop();
  }

  async cleanup() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
  }
}

module.exports = DBManager;
