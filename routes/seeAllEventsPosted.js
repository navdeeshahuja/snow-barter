var express = require('express');
var router = express.Router();
var db = require('../config_db');

/* GET home page. */
router.get('/', function(req, res, next) {

  if(!req.session.id)
  {
    res.redirect("/login?timedOut=1");
    return;
  }

  var chapterId = req.session.id;
  var sampleJson = {}
  sampleJson[variables.saepField1] = chapterId
  db.eventsTable.find(sampleJson, function(err, foundData){
    if(err)
    {
      res.send("Error Code 5004");
      return;
    }

    res.render('seeAllEventsPosted', {events: foundData});

  });
  
  
});

module.exports = router;
