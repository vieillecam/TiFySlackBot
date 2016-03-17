# TiFy SlackBot

Simple slackBot that links item number to our TFS repository.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/vieillecam/TiFySlackBot.git # or clone your own fork
$ cd TiFySlackBot
$ npm install
$ node app.js
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deploying to Heroku

```sh
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation
### Debug
```sh
$ node-debug app.js
logging Heroku : 
$ heroku logs --tail --source app
```
