var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables')

/* GET home page. */
router.post('/', function(req, res, next) {
  
  var chapterId = req.body.chapterId;
  var password = req.body.password;

  var sampleJson = {}
  sampleJson[variables.oaField1] = chapterId
  db.chaptersTable.find(sampleJson, function(err, foundData){

  	if(err)
  	{
  		res.send("Some Error Occurred, please try again. ERR_CODE 5001");
  		return;
  	}

    var flag = 0;

  	for(var i=0 ; i<foundData.length ; i++)
    {
      if(foundData[i][variables.oaField3] == password)
      {
        flag = 1;
        req.session.id = foundData[i][variables.oaField6];
        break;
      }
    }

    if(flag == 0)
    {
      res.redirect("/login?notMatched=1");
      return;
    }
    else if(flag == 1)
    {
      res.redirect("/home");
    }



  });
  

});

module.exports = router;
