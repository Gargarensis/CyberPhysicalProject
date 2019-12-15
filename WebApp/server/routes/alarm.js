var express = require('express');
var router = express.Router();
var fs = require('fs');

var alarm = false;
var timestamp = Date.now();
var isAlarmActive = true;
var chosenSound = "cane.mp3";
var player = require("play-sound")((opts = {}));
var audio = undefined;

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
  audio = player.play('./public/sounds/' + chosenSound, function(err) {
    if (err && !err.killed) throw err;
  });
  res.send("Ok");
});

router.post('/off', function (req, res, next) {
  alarm = false;

  if (audio) {
    audio.kill();
  }

  res.send("Ok");
});

router.post('/disable', function (req, res, next) {
  isAlarmActive = false;
  res.send("Ok");
});

router.get('/sounds', function (req, res, next) {
  fs.readdir('./public/sounds', (err, files) => {
    res.send(files);
  });
});

router.post("/sound", function(req, res, next) {
  console.log(req.body.fileName);
  console.log(req.body)
  chosenSound = req.body.fileName;
  res.send("Ok");
});

module.exports = router;
