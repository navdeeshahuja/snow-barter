var express = require('express');
var router = express.Router();
var db = require('../config_db');


router.post('/', function (req, res, next) {

    var platform = req.body.platform;
    var deviceId = req.body.deviceId;

    if(platform == "" || platform == undefined ||
        deviceId == "" || deviceId == undefined)
    {
        res.send('{"code":"5005", "message":"Error"}');
        return;
    }


    var sampleJson = {}
    sampleJson[variables.pdiField1] = platform
    db.deviceIdsTable.find(sampleJson, function(err, foundData){

        if(err)
        {
            res.send('{"code":"5006", "message":"Error"}');
        }
        else if(foundData.length != 0)
        {   
            var sampleJson2 = {}
            sampleJson2[variables.pdiField4] = platform
            var sampleJson3 = {}
            sampleJson3[variables.pdiField2] = deviceId
            db.deviceIdsTable.update(sampleJson2, {$set:sampleJson3}, function(err, result) {

              if(err)
              {
                res.send('{"code":"5007", "message":"Error"}');
              }
              else
              {
                res.send('{"code":"200", "message":"OK"}');
              }

            });
        }
        else
        {
            var newDeviceId = new db.deviceIdsTable();
            newDeviceId[variables.pdiField4] = platform;
            newDeviceId[variables.pdiField2] = deviceId;
            newDeviceId.save(function(err, savedObject){

                if(err)
                {
                    res.send('{"code":"5006", "message":"Error"}');
                }
                else
                {
                    res.send('{"code":"200", "message":"OK"}');
                }
            });
        }

    });


    


   
});

module.exports = router;
