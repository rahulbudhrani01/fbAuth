var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/passport-social-auth";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
