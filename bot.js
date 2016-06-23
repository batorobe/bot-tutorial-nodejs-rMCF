var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /(mfw)|(tfw)|(Mfw)|(MFW)|(Tfw)|(TFW)/;
      botRegexDenk = /^\.denk/;
      botRegexGamb = /^\.potd/;
      botRegexMaga = /(maga)|(MAGA)|(Maga)|(kek)|(Kek)|(top kek)|(Top kek)|(Top Kek)/;
      botRegexWil = /^\/.willy/;
      
      //images for maga call
      maga1 = 'https://i.sli.mg/E3BbKK.jpg'; maga2 = 'http://trumpimages.com/TqfJA.jpg';
      maga3 = 'http://trumpimages.com/YECTD.jpg'; maga4 = 'https://i.redditmedia.com/3ajTo756OzvESMhS1uvrz4GfRgIaD-IjFrua8uHZasc.jpg?w=349&s=54ca7e69b999bd9d60ce33610b38cfee';
      maga5 = 'https://i.sli.mg/l2knjY.jpg';
 
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  } 
  
  else if(request.text && botRegexMaga.test(request.text)) {
    this.res.writeHead(200);
    if(0.6 >= Math.random() > 0.3)
      postMessage(maga1);
    else if(Math.random() >0.6)
      postMessage(maga2);
    else
      postMessage(maga3);
    this.res.end();
  }  
  
  else if(request.text && botRegexWil.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Fuck Willy.");
    this.res.end();
  }
  
  else if(request.text && botRegexGamb.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Stop gambling you degenerate fuck.");
    this.res.end();
  } 
  
  else if(request.text && botRegexDenk.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.youtube.com/playlist?list=PLFPwGmnS_lyyVY5qjqZmHGbyr8doP0PH2");
    this.res.end();
  } 
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
