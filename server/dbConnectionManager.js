// Import dependencies.
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dbUrl = "mongodb://localhost:27017/data_store";
var dbName = "data_store";
var dbConnectionCache = {};

/**
 * Function to get database connection.
 * @param next - err/connection.
 */
function getConnection(next) {
  let dbObject = null;
  if (dbConnectionCache.dbUrl === dbUrl) {
    dbObject = dbConnectionCache.db;
  }
  if (dbObject) {
    next(null, dbObject);
  } else {
    mongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
      if (err) {
        return next(err, null);
      }
      const db = client.db(dbName);
      dbConnectionCache = {dbUrl: dbUrl, db: db};
      next(null, db);
    });
  }
}

/**
 * Exports publicly used functions.
 * @type {{getConnection: getConnection}}
 */
module.exports = {
  getConnection: getConnection
};