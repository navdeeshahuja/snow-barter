var express = require('express');
var router = express.Router();
var getResponseFromLink = require('./getResponseFromLink');
var cheerio = require('cheerio');
var constants = require('../constants');
var unirest = require("unirest");

var headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-IN,en-GB;q=0.8,en-US;q=0.6,en;q=0.4',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Cookie': '',
      'Host': 'vtopbeta.vit.ac.in',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36'
    };

function trimArray(arr)
{
    for (var i=0 ; i<arr.length ; i++)
        arr[i] = arr[i].trim();
}

router.post('/', function (req, res, next) {

    var regno = req.body.regno;
    var password = req.body.password;
    var link = "https://vtopbeta.vit.ac.in/vtop/hostels/student/leave/status";
    var link2 = "https://vtopbeta.vit.ac.in/vtop/hostels/student/leave/history";
    var applyLink = "https://vtopbeta.vit.ac.in/vtop/hostels/student/leave/apply";


    var allLeaveIds = [];
    var allLeaves = [];
    var approvingAuthorityName = [];
    var approvingAuthorityPostValue = [];
    var resJson = {
        "code": "200",
        "leaves": [],
        "approvingAuthorities": [],
        "approvingAuthoritiesPostValues": []
    }


    function parseHistoryResponse(htmlResponse)
    {

    }

    function parseStatusResponse(htmlResponse)
    {
        
    }

    function parseApprovingAuthoritiesResponse(htmlResponse)
    {
        
    }











    getResponseFromLink("POSTTwice", {}, link, regno, password, function (response, LoggedInCookieJar) {
        if (typeof response == 'string') {
            var message = '{"code" : "5001", "message" : "' + response + '"}';
            res.end(message);
            return;
        }
       
       parseStatusResponse(response.body);

       unirest.post(link2)
        .header(headers)
        .jar(LoggedInCookieJar)
        .form({})
        .followAllRedirects(true)
        .strictSSL(false)
        .end(function(response2){ parseHistoryResponse(response2.body) });

        unirest.post(applyLink)
        .header(headers)
        .jar(LoggedInCookieJar)
        .form({})
        .followAllRedirects(true)
        .strictSSL(false)
        .end(function(response3){ parseApprovingAuthoritiesResponse(response3.body) });

        
    });

});

module.exports = router;
