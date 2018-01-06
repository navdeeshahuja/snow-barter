var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var fs = require('fs');
var getResponseFromLink = require('./getResponseFromLink');

router.post('/', function(req, res, next) {
  
  	var name = req.body.name.toLowerCase();
    var facultiesFile = fs.readFileSync("faculties.json");
    var facultyJson = JSON.parse(facultiesFile);
    var facultyArray = facultyJson.data;
    var jsonObj = {
    	"code" : "200",
    	"data" : []
    };
    var mainArray = [];
    for (var i=0 ; i<facultyArray.length ; i++)
    {
    	var faculty = facultyArray[i];
    	var facultyName = faculty.name.toLowerCase();
    	if(facultyName.match(name))
    	{
    		mainArray.push(faculty);
    	}
    }

    jsonObj.data = mainArray;

    res.send(jsonObj);

});








module.exports = router;
