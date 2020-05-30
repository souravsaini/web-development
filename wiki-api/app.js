const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
//to look for public folder to get public assets
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});

//schema
const articleSchema = new mongoose.Schema({
  'title': String,
  'content': String
})

//model
const Article = mongoose.model('Article', articleSchema)

//################ REQUESTS TARGETING ALL ARTICLES ##################

//Chaining Route Handlers
app.route('/articles')

.get(function(req, res) {  //GET request
  Article.find({}, function(err, articles) {
    if (!err) {
      res.send(articles)
    } else {
      res.send(err)
    }
  })
})

.post(function(req, res) {        //POST request
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  })
  article.save(function(err) {
    if (!err) {
      res.send("Successfully added a new article.")
    } else {
      res.send(err)
    }
  })
})

.delete(function(req, res) {        //DELETE request
  Article.deleteMany({}, function(err) {
    if (!err) {
      res.send("Successfully deleted all articles.")
    } else {
      res.send(err)
    }
  })
})

//################ REQUESTS TARGETING SPECIFIC ARTICLES ##################

app.route('/articles/:articleTitle')

.get(function(req, res) {
  Article.findOne({title: req.params.articleTitle}, function(err, article) {
    if (article) {
      res.send(article)
    } else {
      res.send("No article matching the title was found.")
    }
  })
})

.put(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: request.body.content},
    {overwrite: true},
    function(err) {
      if (!err) {
        res.send("Successfully updated the article.")
      } else {
        res.send(err)
      }
    }
  )
})

.patch(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err) {
      if (!err) {
        res.send("Successfully updated the article.")
      } else {
        res.send(err)
      }
    }
  )
})

.delete(function(req, res) {
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err) {
      if (!err) {
        res.send("Successfully deleted the article.")
      } else {
        res.send(err)
      }
    }
  )
})

app.listen(3000, function() {
  console.log("Server listens on localhost:3000")
})
