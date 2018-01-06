var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables')


function isNumeric(value) {
    return /^\d+$/.test(value);
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


router.get('/', function(req, res, next) {

  var eventid = req.query.encryptedId;

  if(!req.session.id || eventid == undefined || eventid == "")
  {
    res.redirect("/login?timedOut=1");
    return;
  }

  var chapterId = req.session.id;

  db.eventsTable.findById(eventid, function(err, foundObject){

    if(err)
    {
      res.send("Error Code 5004");
      return;
    }
    if(!isFutureDate(foundObject[variables.eeweiField1]))
    {
      res.send("Error Code 5009");
      return;
    }
    var eventChapterId = foundObject[variables.eeweiField2];

    if(eventChapterId != chapterId)
    {
      res.send("Error Code 5005");
      return;
    }

    foundObject[variables.eeweiField3] = foundObject[variables.eeweiField3].split("\n").join("\r\n");
    res.render('editEventForm', foundObject);

  });
  
  
});

module.exports = router;
