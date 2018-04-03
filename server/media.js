const fs = require('fs');
let AipSpeech = require("baidu-aip-sdk").speech;
let client = new AipSpeech(0, 's40mGTGktq2wbim4wdI9Wedh', 'pwoUyUrgvjgs1VlefH9S5xS6IOvj9eo6');

let voice = fs.readFileSync('./test.pcm');

let voiceBase64 = new Buffer(voice);

// 识别本地语音文件
client.recognize(voiceBase64, 'pcm', 16000).then(function(result) {
    console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
}, function(err) {
    console.log(err);
});