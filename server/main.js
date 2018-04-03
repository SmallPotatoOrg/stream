const express = require('express');
const bodyParser = require('body-parser');
let AipSpeech = require("baidu-aip-sdk").speech;

let client = new AipSpeech(0, 's40mGTGktq2wbim4wdI9Wedh', 'pwoUyUrgvjgs1VlefH9S5xS6IOvj9eo6');

const app = express();
app.use(bodyParser.json());

// 静态资源挂载
app.use('/', express.static(__dirname + '/../html'));

app.post('/media', function (req, res) {
  client.recognizeByUrl(req.body.audio.substring(5), function(){}, 'pcm', 16000).then(function (result) {
    console.log('语音识别远程音频文件结果: ' + JSON.stringify(result));
  }, function (err) {
    console.log(err);
  });
  res.send('成功长传图片');
});

app.listen(7777)