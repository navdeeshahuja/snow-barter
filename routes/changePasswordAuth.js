var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables')

/* GET home page. */
router.post('/', function(req, res, next) {


  var password = req.body.password;
  var newpassword = req.body.newpassword;
  var confirmnewpassword = req.body.confirmnewpassword;

  if(password == "" || password == undefined || 
  	 newpassword == "" || newpassword == undefined || 
  	 confirmnewpassword == "" || confirmnewpassword == undefined
  	 )
  {
  	res.redirect("/changePassword?message=Fields cannot be left empty.");
  	return;
  }


  if(newpassword != confirmnewpassword)
  {
  	res.redirect("/changePassword?message=New password and Confirm password does not match.");
  	return;
  }

  if(!req.session.id)
  {
  	res.redirect("/login?timedOut=1");
  	return;
  }

  var chapterId = req.session.id;

  var sampleJson = {}
  sampleJson[variables.cpaField1] = chapterId
  db.chaptersTable.findOne(sampleJson, function(err, foundData){

    if(err)
    {
      res.redirect("/changePassword?message=Some error occurred, please try again.");
    }

  	var pass = foundData[variables.cpaField2];
  	if(password != pass)
  	{
  		res.redirect("/changePassword?message=Old Password did not match. Please try again.");
  		return;
  	}

    var sampleJson2 = {}
    sampleJson2[variables.cpaField1] = chapterId
    var sampleJson3 = {}
    sampleJson3[variables.cpaField2] = newpassword
    db.chaptersTable.update(sampleJson2, {$set:sampleJson3}, function(err, result) {

      if(err)
      {
        res.redirect("/changePassword?message=Some error occurred, please try again.");
      }

      res.redirect("/home?message=Password change successfull.");


    });

  	


  });
  
  

});

module.exports = router;
