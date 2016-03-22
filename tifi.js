var request = require('request');

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var reqText = req.body.text;
  var postedChannel = req.body.channel_id;
  var trigger = req.body.trigger_word;

  var botPayload = {
    text : null,
    channel : null
  };

  if (trigger && trigger.toUpperCase() == "TFS[") {
    reqText = reqText.slice(reqText.indexOf("[") + 1, reqText.indexOf("]"));
    botPayload.text = "Here is your link : " + getLinkFrom(reqText);
  }else{

    var itemNumber = reqText.substr(0,reqText.indexOf(' '));
    var title = reqText.substr(reqText.indexOf(' ')+1);

    botPayload = {
      text : 'Hello, <!everyone|everyone> ! ' + userName + ' asked me to warn you that item ' + linkifyItem(itemNumber, title) + ' is ready to be bashed! ',
      channel : postedChannel
    };
  }

  sendLink(botPayload, function (error, status, body) {
    if (error) {
      return next(error);
    } else if (status !== 200) {
      // inform user that our Incoming WebHook failed
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));
    } else {
      return res.status(200).end();
    }
  });
}

function sendLink (payload, callback) {
  var linkIncomingWebHookPath = "/T09E3N32N/B0P9K77JS/P5aaSCNNJRcLw2cKjZddLDP9";
  var uri = 'https://hooks.slack.com/services' + linkIncomingWebHookPath;

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}

function linkifyItem (itemNumber, title){
  return "<http://endeavour:8080/tfs/Open%20Seas/Open%20Seas/_workitems#_a=edit&id=" + itemNumber + "|" + title | itemNumber + ">";
}

function getLinkFrom (itemNumber){
  return "http://endeavour:8080/tfs/Open%20Seas/Open%20Seas/_workitems#_a=edit&id=" + itemNumber;
}