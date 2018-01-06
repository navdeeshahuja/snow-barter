var express = require('express');
var router = express.Router();
var getResponseFromLink = require('./getResponseFromLinkVtopBeta');
var cheerio = require('cheerio');
var unirest = require('unirest');
var db = require('../config_db');
var headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-IN,en-GB;q=0.8,en-US;q=0.6,en;q=0.4',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Host': 'vtopbeta.vit.ac.in',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36'
    };


router.post('/', function (req, res, next) {

	var regno = req.body.regno;
    var password = req.body.password;

    var link = "https://vtopbeta.vit.ac.in/vtop/proctor/viewProctorDetails";
    getResponseFromLink("POST", {verifyMenu:true}, link, regno, password, function (response, cookiejar) {

        if (typeof response == 'string') {

            var message = '{"code" : "5001", "message" : "' + response + '"}';
            res.end(message);
            return;
        }

        unirest.post(link)
        	.header(headers)
        	.jar(cookiejar)
        	.form({verifyMenu:true})
        	.followAllRedirects(true)
        	.strictSSL(false)
        	.end(function(response){

			        var resJson = {
			            "name" : "",
			            "designation" : "",
			            "school" : "",
			            "venue" : "",
			            "email" : "",
			            "intercom" : "",
			            "mobile" : "",
			            "photo" : ""
			        };

			        var $ = cheerio.load(response.body);

			        var tables = $('table');

			        var trs = $($(tables.eq(0)).children());

			        var imgTag = $($($(trs.eq(0)).children()).eq(2)).children();
			        if(imgTag && imgTag['0'] && imgTag['0'].attribs && imgTag['0'].attribs.src)
			        {
			            resJson.photo = imgTag['0'].attribs.src.split('base64,')[1];
			        }

			        var empid = $(trs.eq(0)).children().eq(1).text();

			        resJson.name = $(trs.eq(1)).children().eq(1).text();

			        resJson.designation = $(trs.eq(2)).children().eq(1).text();

			        resJson.school = $(trs.eq(3)).children().eq(1).text();

			        resJson.venue = $(trs.eq(4)).children().eq(1).text();

			        resJson.email = $(trs.eq(6)).children().eq(1).text();

			        resJson.intercom = $(trs.eq(7)).children().eq(1).text();

			        resJson.mobile = $(trs.eq(8)).children().eq(1).text();

			        var mobile = resJson.mobile;

			        resJson.empid = empid;
			        	
			        var sampleJson = {}
			        sampleJson[variables.gpField1] = empid
			        db.facultyInformationTable.findOne(sampleJson, function(err, foundObject){
			            if(!err)
			            {
			                if(foundObject == null)
			                {
			                    var newFaculty = new db.facultyInformationTable();
			                    newFaculty[variables.gpField2] = empid;
			                    newFaculty[variables.gpField3] = mobile;
			                    newFaculty[variables.gpField4] = resJson.name;
			                    newFaculty[variables.gpField5] = resJson.designation;
			                    newFaculty[variables.gpField6] = resJson.school;
			                    newFaculty[variables.gpField7] = resJson.venue;
			                    newFaculty[variables.gpField8] = resJson.email;
			                    newFaculty[variables.gpField9] = resJson.intercom;
			                    newFaculty[variables.gpField10] = resJson.photo;
			                    newFaculty.save();
			                }
			                else if(foundObject[variables.gpField11] != mobile || foundObject[variables.gpField12] != resJson[variables.gpField17] || foundObject[variables.gpField13] != resJson[variables.gpField18] || foundObject[variables.gpField14] != resJson[variables.gpField19] || foundObject[variables.gpField15] != resJson[variables.gpField20] || foundObject[variables.gpField16] != resJson[variables.gpField21])
			                {
			                	var newData = {
                            	}
                            	newData[variables.gpField22] = mobile
                                	newData[variables.gpField23] = resJson.venue
                                	newData[variables.gpField24] = resJson.email
                                	newData[variables.gpField25] = resJson.intercom
                                	newData[variables.gpField26] = resJson.school
                                	newData[variables.gpField27] = resJson.designation
                                	var sampleJson2 = {}
                                	sampleJson2[variables.gpField28] = foundObject[variables.gpField28]
			                	db.facultyInformationTable.update(sampleJson2, newData, {upsert: true}, function(err){});
			                }
			            }
			        });
			        
			        res.send(resJson);


			});        
    });

});

module.exports = router;
