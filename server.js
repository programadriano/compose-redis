var express = require('express')
var app = express()
var redis = require('redis')

var client = redis.createClient(6379, 'redis')
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  client.get('allpeople', function (err, reply) {
    res.status(200).send({
      title: "Participantes Meetup #27",
      total: reply
    });
  });
})


app.post('/', function (req, res) {
  const p = req.body;
  client.set('allpeople', p.total);
  res.status(200).send(p);
});




app.listen(3000, function () {
  console.log(`app listening on port ${3000}`)
})
