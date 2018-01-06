var express = require('express');
var router = express.Router();
var db = require('../config_db');
var variables = require('../../variables');

function getDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'-'+mm+'-'+yyyy;
    return today;
}

function formatted(stringDate)
{
    var stringDateArray = stringDate.split('-');
    var temp = stringDateArray[0];
    stringDateArray[0] = stringDateArray[2];
    stringDateArray[2] = temp;
    stringDate = stringDateArray.join('-');
    return stringDateArray.join('-');
}

router.get('/', function (req, res, next)
{

    var sampleJson = {}
    sampleJson[variables.geField1] = variables.geField2
    db.eventsTable.find(variables.secretToFindEvents).sort(sampleJson).exec(function(err, foundData){

        if(err)
        {
            res.send("{'data' : 'error'}");
            return;
        }

        var mainArray = [];

        var today = getDate();
        today = formatted(today);

        var i=0;

        if(i<foundData.length)

        for (var i = 0 ; i<foundData.length ; i++)
        {
            var eveningDating = formatted(foundData[i][variables.geField5]);
            //console.log(eveningDating + " compared to " + today);
            if(Date.parse(eveningDating) >= Date.parse(today))
            {
               mainArray.push(foundData[i]);
            }
        }

        //console.log(mainArray); // beforeSorting

        for (var i = 1 ; i<mainArray.length ; i++)
        {
            var key = mainArray[i];
            var j = i-1;

            while (j >= 0 && Date.parse(formatted(mainArray[j][variables.geSecretive])) > Date.parse(formatted(key[variables.geSecretive])))
            {
                mainArray[j+1] = mainArray[j];
                j = j-1;
            }
            mainArray[j+1] = key;
        }

        //console.log(mainArray); // afterSorting

        var obj = {
            data: mainArray
        }

        res.send(afterBringingSponsoredEventInFront(obj));
    });
    


});

function afterBringingSponsoredEventInFront(object)
{
	return ({
            data: mainArray
        });
}

module.exports = router;
