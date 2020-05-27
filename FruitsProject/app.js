const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //for testing

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
    // Insert multiple documents
    db.collection('fruits').insertMany(
      [
        {
          name: "Apple",
          score: 8,
          review: "Great fruit"
        },
        {
          name: "Orange",
          score: 6,
          review: "Kinda sour"
        },
        {
          name: "Banana",
          score: 9,
          review: "Awesome fruit"
        }
      ],
      function(err, r) {
      assert.equal(null, err);
      assert.equal(3, r.insertedCount);
      console.log("Inserted 3 documents into the collection.")


      // Get first two documents that match the query
      db.collection('fruits').find({name: "Apple"}).toArray(function(err, fruits) {
        assert.equal(null, err);
        assert.equal(1, fruits.length);
        console.log(fruits)
        client.close();
      });

  });
});
