var express = require('express');
var router = express.Router();
var db = require('../config_db');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest : './public/posters/'});
var im = require('imagemagick');
var variables = require('../../variables')

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function removeSpaces(str)
{
  str = str.split(" ").join("");
  return str;
}

function isFutureDate(idate){
    var today = new Date(),
        idate = idate.split("-");

    if(idate.length != 3)
    {
      return false;
    }

    if(!isNumeric(idate[0]) || !isNumeric(idate[1] || !isNumeric[2]))
    {
      return false;
    }



    idate = new Date(idate[2], idate[1] - 1, idate[0]);
    today.setHours(0,0,0,0);
    idate.setHours(0,0,0,0);
    return (today - idate) <= 0 ? true : false;
}

function validateTime(timeStr)
{
  var timeRegex = /^([0]\d|\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;

  return timeRegex.test(timeStr);
}


router.post('/', upload.any(), function(req, res, next) {
  

  var venue = req.body.venue;
  var description = req.body.description;
  var date = req.body.date;
  var time = req.body.timepicker;
  var eventid = req.body.encryptedId;

  if( venue == "" || venue == undefined ||
  	 description == "" || description == undefined ||
     time == "" || time == undefined ||
  	 date == "" || date == undefined ||
     eventid == "" || eventid == undefined
     )
  {
  	//res.send("Please fill all the fields! ERR_CODE 1");
    res.render("chapterDidPostAnEvent", {message:"Please fill all the fields!\n ERR_CODE 1"});
  	return;
  }

  description = description.split("\r\n").join("\n");


  if(!req.session.id)
  {
    //res.send("Session Timed out. Please Login again.");
    res.render("chapterDidPostAnEvent", {message:"Session Timed out. Please Login again."});
    return;
  }

  var chapterId = req.session.id;

  if(!isFutureDate(date))
  {
    //res.send("Please specify the today or the future date.");
    res.render("chapterDidPostAnEvent", {message:"Please specify the today or the future date."});
    return;
  }

  time = removeSpaces(time);

  if(!validateTime(time))
  {
    //res.send("Please give the correct time.");
    res.render("chapterDidPostAnEvent", {message:"Please give the correct time."});
    return;
  }

  db.eventsTable.findById(eventid, function(err, foundObject){

    if(err)
    {
      res.send("Error Code 5004");
      return;
    }
    var eventChapterId = foundObject[variables.cdeaeField1];
    var eventName = foundObject[variables.cdeaeField2];

    if(eventChapterId != chapterId)
    {
      res.send("Error Code 5005");
      return;
    }

    if(!isFutureDate(foundObject[variables.cdeaeField3]))
    {
      res.send("Error Code 5009");
      return;
    }

    var newData = {
        venue: venue
      };
      newData[variables.cdeaeField4] = date
      newData[variables.cdeaeField5] = time
      newData[variables.cdeaeField6] = description

    var sampleJson = {}
    sampleJson[variables.cdeaeField7] = eventid

    db.eventsTable.update(sampleJson, newData, {upsert: true}, function(err){
      if(err)
      {
        res.send("Error Code 5006");
      }
      else
      {
        var message = "The changes to "+eventName+" has been successfully done";
        res.redirect("/home?message="+message);
      }
    });

  })


  

});

module.exports = router;
