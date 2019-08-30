const log4js = require('log4js')
const logger = log4js.getLogger();

log4js.configure({
  appenders: {
    logFile: { type: 'file', filename: 'error.log' }
  },
  categories: {
    default: { appenders: [ 'logFile' ], level: 'trace' }
  }
});

getUserProperties()

function main(){
    // requestモジュールの読み込み
    const request = require('request');
    //const JIRA_URI = 'https://id.atlassian.com/login'

    const options = {
        uri: 'https://kengo.atlassian.net/rest/auth/1/session',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username: 'admin',
            password: 'ktkt1816'
        },
        method: 'POST',
        json: true
    };

    request(options, function(error, response, data) {
        if(!error && response.statusCode == 200) {
            console.log('JIRA login success!' + data.session.name + ' = ' + data.session.value);
        } else {
            console.log('error: ' + response.statusCode + ': ' + data.errorMessages);
            console.log(data)
        }
    });
}

function getUserProperties(){
    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://kengo.atlassian.net/rest/api/3/user/properties?accountId=5d67e53b388d780dac242832',
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(
            'Response: ' + response.statusCode + ' ' + response.statusMessage
        );
        console.log(body);
        logger.trace(request);
        logger.trace(response);
    });
}