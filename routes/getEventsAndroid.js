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

function renderMainArray(array)
{
    for(var i=0 ; i<array.length ; i++)
    {
        var newObject = JSON.parse(JSON.stringify(array[i]));
        array[i] = newObject;
        array[i]["fieldsAndroid"] = array[i]["fields"].join("/*/");
        //console.log(array[i]["fieldsAndroid"]);
    }
}

function getJsonOfFields(array)
{
    var tempJson = {};
    for(var i=0 ; i<array.length ; i++)
    {
        var fieldName = "Field "+(i+1);
        tempJson[fieldName] = array[i];
    }
    return tempJson;
}

router.get('/', function (req, res, next)
{

    var sampleJson = {}
    sampleJson[variables.geSecretive] = variables.geField2
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
            var eveTheDataFounder = formatted(foundData[i][variables.geField8]);
            //console.log(eveTheDataFounder + " compared to " + today);
            if(Date.parse(eveTheDataFounder) >= Date.parse(today))
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

        renderMainArray(mainArray);
        var mainArrayLength = mainArray.length;

        var obj = {
            data: mainArray,
            count: mainArrayLength
        }

        res.send(afterBringingSponsoredEventInFront(obj));
    });
    


});

function afterBringingSponsoredEventInFront(object)
{

    return ({
            data: mainArray,
            count: object.count
        });
}

module.exports = router;
