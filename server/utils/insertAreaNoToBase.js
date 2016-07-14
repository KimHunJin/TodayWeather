/**
 * Created by aleckim on 2015. 10. 19..
 */

"use strict";

var fs = require('fs');
var targetName = './utils/data/part.csv';
var indexList = fs.readFileSync('./utils/data/areaNoKma.csv').toString().split('\n');
var baseList = fs.readFileSync(targetName).toString().split('\n');

function addAreaCodeToBase() {

  //remove head
  indexList.shift();
  baseList.shift();

  //remove last blank line
  baseList = baseList.slice(0, baseList.length-1);

  indexList.forEach(function(indexArea) {
    var area = indexArea.split(',');

    for(var i=0; i<baseList.length; i++) {
      var base = baseList[i].split(',');
      if (base[0] === area[0] && base[1] === area[1] && base[2] === area[2]) {
        baseList[i] += ','+area[5];
        return;
      }
    }
    if (i >= baseList.length) {

      //console.log("Fail to find " + area.toString());
      //if use base.csv, have to push new data
      //baseList.push(indexArea);
    }
  });
}

function saveBaseWithAreaCode() {
  baseList.sort();
  baseList.unshift('대분류,중분류,소분류,위도,경도,지점코드');
  fs.writeFile(targetName, baseList.join('\n'), function (err) {
    if(err) {
      throw err;
    }
    console.log('File write completed');
  });
}

addAreaCodeToBase();
saveBaseWithAreaCode();

