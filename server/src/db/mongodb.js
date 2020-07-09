const { MongoClient } = require('mongodb');

// return connection to mongoDB
const DB_NAME = 'moonActive';
let connection;
async function getSingleClient() {
  if (!connection) {
    connection = MongoClient.connect(
      process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`,
      { useUnifiedTopology: true },
    );
    await connection;
    console.info('[db] Connected successfully to mongodb server');
  }
  return connection;
}

// return db
async function getDb() {
  return (await getSingleClient()).db();
}

module.exports = {
  getDb,
};
