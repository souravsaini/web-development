const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const https = require('https')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post('/', function(req, res) {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email

  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)

  const url = 'https://us18.api.mailchimp.com/3.0/lists/00fe6a711e'
  const options = {
    method: "POST",
    auth: "sob:01867b7194cef4823c19a2873d27dd7e-us18"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    }else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData)
  request.end()
})

app.post('/failure', function(req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000."))



//01867b7194cef4823c19a2873d27dd7e-us18

//00fe6a711e
