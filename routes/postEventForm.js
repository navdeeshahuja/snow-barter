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
  db.chaptersTable.findById(chapterId, function(err, foundObject){
    if(err)
    {
      res.send("Error Code 5004");
      return;
    }
    var secretRandomVariable = foundObject[variables.peeField6];
    var sampleJson = {}
    sampleJson[variables.peeField1] = secretRandomVariable
    res.render('postEventForm', sampleJson);

  });
});

module.exports = router;
