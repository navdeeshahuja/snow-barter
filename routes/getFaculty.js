var express = require('express');
var router = express.Router();
var getResponseFromLink = require('./getResponseFromLink');
var cheerio = require('cheerio');
var db = require('../config_db');

router.post('/', function (req, res, next) {

    var empid = req.body.empid;

	var resJsonjsonObj = {
        "code" : "200",
    };
        resJsonjsonObj[variables.gfFieldSecret1] = " "
        resJsonjsonObj[variables.gfFieldSecret2] = " "
        resJsonjsonObj[variables.gfFieldSecret3] = " "
        resJsonjsonObj[variables.gfFieldSecret4] = " "
        resJsonjsonObj[variables.gfFieldSecret5] = []
        resJsonjsonObj[variables.gfFieldSecret6] = " "
        resJsonjsonObj[variables.gfFieldSecret7] = " "
        resJsonjsonObj[variables.gfFieldSecret8] = " "

    db.facultyInformationTable.findOne({empid : empid}, function(err, foundObject){

        if(!err && foundObject!=null)
        {
            resJsonjsonObj[variables.gfFieldSecret9] = foundObject[variables.gfFieldSecret12];
            resJsonjsonObj[variables.gfFieldSecret10] = foundObject[variables.gfFieldSecret15];
            resJsonjsonObj[variables.gfFieldSecret11] = foundObject[variables.gfFieldSecret16];
            resJsonjsonObj[variables.gfFieldSecret4] = foundObject[variables.gfFieldSecret13];
            resJsonjsonObj[variables.gfFieldSecret18] = foundObject[variables.gfFieldSecret19];
            resJsonjsonObj[variables.gfFieldSecret67] = foundObject[variables.gfFieldSecret14];
            resJsonjsonObj[variables.gfFieldSecret77] = foundObject[variables.gfFieldSecret17];
        }

        res.send(resJsonjsonObj);

    });

});

module.exports = router;
