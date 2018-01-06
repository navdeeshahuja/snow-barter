var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var getResponseFromLink = require('./getResponseFromLink');






router.post('/', function(req, res, next) {
  
  	var regno = req.body.regno;
  	var password = req.body.password;
  	var link = "https://vtop.vit.ac.in/student/getfacdet.asp?faculty=";
  	getResponseFromLink("GET", {}, link, regno, password, function(response){

      var $ = cheerio.load(response.body);

      var trs = $('tr');

      var mainArray = [];

      var mainJson = {
        data : []
      }

      for(var i=1 ; i<trs.length ; i++)
      {
        var employee = {
          "empid" : "",
          "name" : "",
          "school" : ""
        }
        var tr = $(trs).eq(i);
        var tds = $(tr).children();
        var facultyName = $(tds).eq(0).text();
        var schoolName = $(tds).eq(2).text();
        var a = $(tds).eq(3).children().eq(0);
        var link = $(a)[0].attribs.href;
        var empid = link.split('=')[1];
        employee = {
          "empid" : empid,
          "name" : facultyName,
          "school" : schoolName
        }
        mainArray.push(employee);
      }

      fNameArray = [];
      fSchoolArray = [];
      fIdArray = [];

      for (var i=0 ; i<mainArray.length ; i++)
      {
        fNameArray.push(mainArray[i].name);
        fSchoolArray.push(mainArray[i].school);
        fIdArray.push(mainArray[i].empid);
      }

      for (var i=0 ; i<mainArray.length ; i++)
      {
        for (var j=0 ; j<mainArray.length-1 ; j++)
        {
          if(fNameArray[j]>fNameArray[j+1])
          {
            var temp = fNameArray[j];
            fNameArray[j] = fNameArray[j+1];
            fNameArray[j+1] = temp;

            temp = fSchoolArray[j];
            fSchoolArray[j] = fSchoolArray[j+1];
            fSchoolArray[j+1] = temp;

            temp = fIdArray[j];
            fIdArray[j] = fIdArray[j+1];
            fIdArray[j+1] = temp;

          }
        }
      }

      String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
      };

      mainArray = [];

      for (var i=0 ; i<fNameArray.length ; i++)
      {
        var tempJson = {
          "name" : fNameArray[i].capitalize(), //replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
          "school" : fSchoolArray[i],
          "empid" : fIdArray[i]
        };
        mainArray.push(tempJson);
      }

      mainJson.data = mainArray;
      res.send(mainJson);

    });


});


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}







module.exports = router;
