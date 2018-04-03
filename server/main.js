const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let AipSpeech = require("baidu-aip-sdk").speech;
const multer = require('multer');
const {
  spawn
} = require('child_process');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

var upload = multer({
  storage: storage
})

let client = new AipSpeech(0, 's40mGTGktq2wbim4wdI9Wedh', 'pwoUyUrgvjgs1VlefH9S5xS6IOvj9eo6');

const app = express();
app.use(bodyParser.json());

// 静态资源挂载
app.use('/', express.static(__dirname + '/../html'));

app.post('/media', upload.single('mp3'), function (req, res) {
  const resizeImg = spawn('ffmpeg', ['-y', '-i', 'mp3', '-acodec', 'pcm_s16le', '-f', 's16le', '-ac', 1, '-ar', 16000, 'test.pcm']);
  
  resizeImg.on('close', (code) => {
    let voice = fs.readFileSync('./test.pcm');

    let voiceBase64 = new Buffer(voice);
  
    // 识别本地语音文件
    client.recognize(voiceBase64, 'pcm', 16000).then(function (result) {
      res.end(JSON.stringify(result));
      console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
    }, function (err) {
      console.log(err);
    });
  });
});

app.listen(7777)