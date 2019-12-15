var express = require('express');
var router = express.Router();
var fs = require('fs');

var alarm = false;
var timestamp = Date.now();
var isAlarmActive = true;
var chosenSound = "cane.mp3";

router.get('/', function(req, res, next) {

  if (!isAlarmActive) {
    res.send(false);
    return;
  }

  if (Date.now() - timestamp > 20000) {
    alarm = false;
  }
  res.send(alarm);
});

router.post('/on', function (req, res, next) {
  alarm = true;
  timestamp = Date.now();
  res.send("Ok");
});

router.post('/off', function (req, res, next) {
  alarm = false;
  res.send("Ok");
});

router.post('/disable', function (req, res, next) {
  isAlarmActive = false;
  res.send("Ok");
});

router.get('/sounds', function (req, res, next) {
  fs.readdir('./public/sounds', (err, files) => {
    console.log(files)
    res.send(files);
  });
});

module.exports = router;
