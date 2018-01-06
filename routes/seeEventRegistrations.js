var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables')

/* GET home page. */
router.get('/', function(req, res, next) {

  var evncIdFieldSecret = req.query.encryptedId;

  if(!req.session.id || evncIdFieldSecret == undefined || evncIdFieldSecret == "")
  {
    res.redirect("/login?timedOut=1");
    return;
  }

  var chapterId = req.session.id;

  db.eventsTable.findById(evncIdFieldSecret, function(err, foundObject){

    if(err)
    {
      res.send("Error Code 5004");
      return;
    }
    var secretVariabkle = foundObject[variables.seRField2];

    if(secretVariabkle != chapterId)
    {
      res.send("Error Code 5005");
      return;
    }

    var secrevarial093 = foundObject[variables.seRField3];
    var secreok0914 = foundObject[variables.seRField5];
    var sampleJson = {}
    sampleJson[variables.seRField1] = evncIdFieldSecret
    db.registeredStudentsTable.find(sampleJson, function(err, foundData){

      if(err)
      {
        res.send("Error Code 5006");
        return;
      }

      var sampleJson2 = {}
      sampleJson2[variables.seRField91] = secrevarial093
      sampleJson2[variables.seRField92] = foundData
      sampleJson2[variables.seRField95] = secreok0914
      res.render('seeEventRegistrations', sampleJson2);

    });

  });
  
  
});

module.exports = router;
