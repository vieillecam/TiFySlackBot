var request = require('request');

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var itemNumber = req.body.text;
  var postedChannel = req.body.channel_id;
  var trigger = req.body.trigger_word;
  var itemLink = linkifyItem(itemNumber);


  var botPayload = {
    text : 'Hello, <!everyone|everyone> ! ' + userName + ' ask me to warn you that item ' + itemLink + ' is ready to be bashed! ',
    channel : postedChannel
  };

  if (trigger == "TFS[") {
    itemNumber = trigger.slice(trigger.indexOf("[") + 1, trigger.indexOf("]"));
    botPayload.text = "Here is your link : " + getLinkFrom(itemNumber);
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

function linkifyItem (itemNumber){
  return "<http://endeavour:8080/tfs/Open%20Seas/Open%20Seas/_workitems#_a=edit&id=" + itemNumber + "|" + itemNumber + ">";
}

function getLinkFrom (itemNumber){
  return "http://endeavour:8080/tfs/Open%20Seas/Open%20Seas/_workitems#_a=edit&id=" + itemNumber;
}