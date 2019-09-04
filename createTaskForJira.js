const log4js = require('log4js');
const logger = log4js.getLogger();

// ログ出力設定
log4js.configure({
  appenders: {
    logFile: { type: 'file', filename: 'error.log' }
  },
  categories: {
    default: { appenders: [ 'logFile' ], level: 'trace' }
  }
});

//getUserProperties()
main()

function main(){
    // requestモジュールの読み込み
    const request = require('request');
    var strAuth = get_token();

    // 基本認証やCookieの認証は受け付けなくったのでAPIトークンもしくはOAuth（APIアクセスを認可する方法）を使う必要がある。
    const options = {
        uri: 'https://kengo.atlassian.net/rest/api/2/issue',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + strAuth
        },
        method: 'POST',
        body: 
        { 
            fields: 
            { 
                project:
                {
                    key: 'AP' 
                },
                summary: 'API活用',  // タイトル
                description: 'テストテストテスト',  // 説明
                issuetype:
                {
                    name: 'Bug'
                },
                assignee:  // 担当者
                {
                    name: 'admin'
                }
            } 
        },
        json: true
    };

    request(options, function(error, response, data) {
        if(!error && response.statusCode == 201) {
            console.log('JIRA Create Task Success!');
            console.log(data);
        } else {
            console.log('error: ' + response.statusCode + ': ' + data.errorMessages);
            console.log(data);
        }
    });
}

function get_token() {
    var id = "kengo.tsunoda11@gmail.com";
    var api_token = "G4oubhE8f2Xzs532uoxR5340";
    //var token = Utilities.base64Encode(id + ":" + api_token);
    var token = "a2VuZ28udHN1bm9kYTExQGdtYWlsLmNvbTpHNG91YmhFOGYyWHpzNTMydW94UjUzNDA=";
    return token;
}


function getUserProperties(){
    var request = require('request');
    var strAuth = get_token();

    var options = {
        method: 'GET',
        url: 'https://kengo.atlassian.net/rest/api/2/project/',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + strAuth
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(
            'Response: ' + response.statusCode + ' ' + response.statusMessage
        );
        //console.log(body);
        logger.trace(response);
    });
}