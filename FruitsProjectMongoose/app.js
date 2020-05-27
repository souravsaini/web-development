const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true })

//new schema
const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
})

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitsSchema
})

//convert schema to a model. "Fruit" is a collection which will turn into "fruits" at the backend.
const Fruit = mongoose.model("Fruit", fruitsSchema)

const Person = mongoose.model("Person", personSchema)

//create a document from the model
const apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Great fruit"
})

const orange = new Fruit({
  name: "Orange",
  rating: 6,
  review: "Sour in taste"
})

const banana = new Fruit({
  name: "Banana",
  rating: 9,
  review: "Awesome fruit"
})

const peach = new Fruit({
  name: "Peach",
  review: "Yummy"
})

const amy = new Person({
  name: "Amy",
  age: 20,
  favFruit: banana
})

//save the document in the mongodb
//fruit.save()
amy.save()

//Insert multiple documents into db
// Fruit.insertMany([apple, orange, banana, peach], function(err) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log("successfully saved all the fruits")
//   }
// })

//find in db
// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err)
//   } else {
//     //Close the connection
//     mongoose.connection.close()
//     console.log(fruits)
//     fruits.forEach(function(fruit) {
//       console.log(fruit.name)
//     })
//   }
// })

//Update a document
// Fruit.updateOne({_id: "5ece9b95de7c350764b677dd"}, {rating: 10}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully updated the document")
//   }
// })
//
// //Delete a document
// Fruit.deleteOne({name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully deleted the document")
//   }
// })
