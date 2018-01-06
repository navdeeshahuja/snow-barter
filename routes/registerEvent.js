var express = require('express');
var router = express.Router();
var db = require('../config_db');

var cheerio = require('cheerio');

var getResponseFromLink = require('./getResponseFromLink');

router.post('/', function (req, res, next)
{


    var name = req.body.name;
    var regno = req.body.regno;
    var password = req.body.password;
    var fields = req.body.fields;
    var eventId = req.body.eventId;

    if(
        name == "" || name ==  undefined ||
        regno == "" || regno ==  undefined ||
        password == "" || password ==  undefined || 
        fields ==  undefined ||
        eventId == "" || eventId ==  undefined
        )
    {
        res.send('{"data":"error_code_1"}');
        return;
    }

    db.eventsTable.findById(eventId, function(err, foundObject){

        if(err || foundObject == undefined)
        {
            res.send('{"data":"error_code_2"}');
            return
        }

        if(foundObject[variables.reField1].length != fields.length)
        {
            res.send('{"data":"error_code_3"}');
            return;
        }

        var secretVariable = foundObject[variables.reField2];
        going = Number(secretVariable) + 1;

        var link = "https://vtop.vit.ac.in/student/home.asp";

        getResponseFromLink("GET", {}, link, regno, password, function(response){
            if(typeof response == 'string')
            {
                res.send('{"data":"error_code_4"}');
                return;
            }
            else
            {
                var sampleJson = {}
                sampleJson[variables.reField4] = eventId
                sampleJson[variables.reField5] = regno
                db.registeredStudentsTable.find(sampleJson, function(err, foundData){
                    if(err)
                    {
                        res.send('{"data":"error_code_5"}');
                        return
                    }

                    if(foundData.length != 0)
                    {
                        res.send('{"data":"success", "code":"200"}');
                        return;
                    }

                    var newRegistration = new db.registeredStudentsTable();
                    newRegistration[variables.reField7] = eventId;
                    newRegistration[variables.reField8] = regno;
                    newRegistration[variables.reField9] = name;
                    newRegistration[variables.reField10] = fields;
                    newRegistration.save();

                    var sampleJson2 = {}
                    sampleJson2[variables.reField15] = eventId
                    var sampleJson3 = {}
                    sampleJson3[variables.reField12] = going
                    db.eventsTable.update(sampleJson2, {$set:sampleJson3}, function(err, result) {
                        //do something.
                    });


                    res.send('{"data":"success"}');

                });
            }
        });




    });
    


});

module.exports = router;
