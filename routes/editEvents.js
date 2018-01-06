var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables');


function isNumeric(value) {
    return /^\d+$/.test(value);
}

function isTodayAFuture(idate){
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

  if(!req.session.id)
  {
    res.redirect("/login?timedOut=1");
    return;
  }

  var chapterId = req.session.id;
  var sampleJson = {}
  sampleJson[variables.eeField1] = chapterId
  db.eventsTable.find(sampleJson, function(err, foundData){
    if(err)
    {
      res.send("Error Code 5004");
      return;
    }

    var newFoundDataArray = [];
    for(var i=0 ; i<foundData.length ; i++)
    {
      var event = foundData[i];
      if(isTodayAFuture(event[variables.eeweiField1]))
      {
        newFoundDataArray.push(event);
      }
    }

    res.render('seeAllEventsForEditing', {events: newFoundDataArray});

  });
  
  
});

module.exports = router;
