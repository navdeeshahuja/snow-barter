var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables')

/* GET home page. */
router.get('/', function(req, res, next) {

  if(!req.session.id)
  {
    res.redirect("/login?timedOut=1");
    return;
  }

  var chapterId = req.session.id;
  db.chaptersTable.findById(chapterId, function(err, foundObject){
    if(err)
    {
      res.send("Error Code 5004");
      return;
    }
    var secretVariable = foundObject[variables.hField3];
    var secretVariable2 = req.query[variables.hField5] || "";
    var sampleJson = {}
    sampleJson[variables.hField1] = secretVariable
    sampleJson[variables.hField6] = secretVariable2
    res.render("home", sampleJson);

  });
  
  
});

module.exports = router;
