// token=8SbQJcV7zInoQY9FavRchfRg
// team_id=T0001
// team_domain=example
// channel_id=C2147483705
// channel_name=test
// timestamp=1355517523.000005
// user_id=U2147483697
// user_name=Steve
// text=googlebot: What is the air-speed velocity of an unladen swallow?
// trigger_word=googlebot:

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var itemNumber = req.body.text;
  var itemLink = "http://endeavour:8080/tfs/Open%20Seas/Open%20Seas/_workitems#_a=edit&id=" + itemNumber;
  var botPayload = {
    text : 'Hello, @channel ! ' + userName + ' ask me to warn you that item ' + itemNumber + ' is ready to be bashed! ' + itemLink
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}