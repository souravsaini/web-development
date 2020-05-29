const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')
const date = require(__dirname + "/date.js")
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true})

//schema
const itemsSchema = new mongoose.Schema({
  name: String
})

//model
const Item = mongoose.model('Item', itemsSchema)

//Items
const item1 = new Item({ name: "Buy Food" })
const item2 = new Item({ name: "Cook Food" })
const item3 = new Item({ name: "Eat Food "})
const defaultItems = [item1, item2, item3]

//list schema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
})

//list model
const List = mongoose.model('List', listSchema)


app.get('/', function(req, res) {
  let day = date.getDate()

  Item.find({}, function(err, items) {

    if (items.length === 0) {
      //Insert default items into the DB
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Default items successfully inserted.")
        }
      })

      res.redirect('/')
    }
    else {
      console.log(items)
      res.render('list', {listTitle: day, items: items});
    }
  })
})

app.get('/:customListName', function(req, res) {
  const customListName = _.capitalize(req.params.customListName)  //lodash function

  List.findOne({name: customListName}, function(err, list) {
    if (!err) {
      if (!list) {
        console.log("Doesn't exists")
        //create new list if doesn't exists with default items
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save()
        res.redirect('/'+customListName)

      } else {
        console.log("Exists")
        res.render('list', {listTitle: list.name, items: list.items})
      }
    }
  })
})

app.post('/', function(req, res) {
  const itemName = req.body.newItem
  const listName = req.body.list
  let day = date.getDate()

  //create document
  const item = new Item({ name: itemName })

  if (listName === day) {
    //save the document in the DB
    item.save()
    res.redirect('/')
  } else {
    List.findOne({name: listName}, function(err, list) {
      list.items.push(item)
      list.save()
      res.redirect('/' + listName)
    })
  }
})

app.post('/delete', function(req, res) {
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName
  let day = date.getDate()

  if (listName === day) {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log(checkedItemId + "gets deleted")
        res.redirect('/')
      }
    })
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, list) { //delete entry from a list
      if(!err) {
        res.redirect('/' + listName)
      }
    })
  }


})

app.get('/about', function(req, res) {
  res.render('about')
})

app.listen(3000, function() {
  console.log("Server is running on port 3000")
})
