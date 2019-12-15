var express = require('express');
var router = express.Router();
var fs = require('fs');

var alarm = false;
var timestamp = Date.now();
var isAlarmActive = true;
var chosenSound = "cane.mp3";
var player = require("play-sound")((opts = {}));
var audio = undefined;
var TelegramBot = require("node-telegram-bot-api");
var fs = require("fs");
var path = require("path");

var token;
var botUserList = [];

try {
  token = fs.readFileSync(path.join(__dirname, "../token.txt"), "utf8");
  let chatList = path.join(__dirname, "../chat_list.txt");
  if (fs.existsSync(chatList)) {
    botUserList = JSON.parse(fs.readFileSync(chatList, "utf8"));
  }
} catch (err) {
  token = "your-token";
}

const bot = new TelegramBot(token, { polling: true });

bot.on("message", msg => {
  if (msg.text == "/start") {
    botUserList.push(msg.chat.id);
    fs.writeFileSync(
      path.join(__dirname, "chat_list.txt"),
      JSON.stringify(botUserList)
    );
  }
});

router.get('/', function(req, res, next) {
  if (Date.now() - timestamp > 20000) {
    alarm = false;
  }
  res.send(alarm);
});

router.post('/on', function (req, res, next) {

  if (!isAlarmActive) {
    res.send(false);
    return;
  }

  for (let id of botUserList) {
    bot.sendMessage(
      id,
      "Intrusion detected! At " +
        new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "")
    );
  }

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

router.post("/enable", function(req, res, next) {
  isAlarmActive = true;
  res.send("Ok");
});

router.get("/enabled", function(req, res, next) {
  res.send(isAlarmActive);
});

router.get('/sounds', function (req, res, next) {
  fs.readdir('./public/sounds', (err, files) => {
    res.send(files);
  });
});

router.get("/sound", function(req, res, next) {
  res.send(chosenSound);
});

router.post("/sound", function(req, res, next) {
  chosenSound = req.body.fileName;
  res.send("Ok");
});

module.exports = router;
