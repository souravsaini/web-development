const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send("<h1> Hello World! </h1>");
    //console.log(res);
});
//app.get('/', (req, res) => res.send('Hello World!'))

app.get('/contact', function(req, res) {
    res.send("<h1> Contact me! </h1>");
});

app.get('/about', function(req, res) {
    res.send("<h1> About me! </h1>");
});

app.listen(3000, () => console.log("App listening on port 3000."))
