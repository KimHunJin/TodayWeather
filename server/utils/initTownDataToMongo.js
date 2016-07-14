/**
 * Created by kay
 * */

"use strict";

var mongoose = require('mongoose');
var config = require('../config/config');
var convert = require('./coordinate2xy');
var targetName = './utils/data/part.csv';

mongoose.connect(config.db.path, config.db.options, function(err){
    if(err){
        console.error('could net connect to MongoDB');
        console.error(err);
    }
});

var fs = require('fs');
console.log('load '+targetName);

var lineList = fs.readFileSync(targetName).toString().split('\n');
// header remove
lineList.shift();

//remove last blank line
lineList = lineList.slice(0, lineList.length-1);

var tDoc = require('../models/town');

function createDocRecurse (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    if (lineList.length) {
        var line = lineList.shift();
        var doc = new tDoc();

        //remove enter
        line = line.replace(/\r/g, "");
        line.split(',').forEach(function (entry, i) {
            if(i === 0) {doc.town.first = entry; }
            else if(i === 1) {doc.town.second = entry;}
            else if(i === 2) {doc.town.third = entry;}
            else if(i === 3) {doc.gCoord.lat = entry;}
            else if(i === 4) {doc.gCoord.lon = entry;}
            else if(i === 5) {doc.areaNo = entry;}

            //first mx, my data is lon, lat then changed
            if(doc.gCoord.lon !== null && doc.gCoord.lat !== null){
                var conv = new convert(doc.gCoord, {}).toLocation();
                doc.mCoord.mx = conv.getLocation().x;
                doc.mCoord.my = conv.getLocation().y;
            }
            else {
                console.log("Invaild coord lon="+doc.gCoord.lon+ " lat="+doc.gCoord.lat);
            }
        });
        doc.save(createDocRecurse);
    } else {
        console.log('Finish');
        tDoc.find({},function(err,docs){
            if (err) {throw err;}
            console.log(docs.length);
            mongoose.disconnect();
        });
    }
}

createDocRecurse(null);

