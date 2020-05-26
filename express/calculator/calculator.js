const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.get('/bmicalculator', (req, res) => res.sendFile(__dirname + '/bmiCalculator.html'))

app.post('/', function(req, res) {
  var num1 = parseInt(req.body.num1)
  var num2 = parseInt(req.body.num2)
  console.log(num1 + num2)
  res.send("Thank you for posting that!")
});

app.post('/bmicalculator', function(req, res) {
    var weight = parseFloat(req.body.weight)
    var height = parseFloat(req.body.height)
    res.send("Your BMI is " + weight / (height * height))
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
