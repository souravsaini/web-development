const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post('/', function(req, res) {
  const city = req.body.city
  const appKey = "911417d1ae8579b5f27d292aced6b560"
  const units = "metric"
  console.log(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=${units}`)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=${units}`
  https.get(url, function(response){
    console.log(response.statusCode)

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      res.write("<p>The weather is currently " + weatherDescription + ".</p>")
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees celcius.</h1>")
      res.write("<img src=" + imageUrl + ">")
      res.send()
    })
  })
});

app.listen(3000, () => console.log("Server is running on port 3000."))
