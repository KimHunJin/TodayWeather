/**
 * Created by aleckim on 2015. 12. 29..
 */

var async = require('async');
var req = require('request');

var town = require('../models/town');
var modelCurrent = require('../models/modelCurrent');
var config = require('../config/config');

function PastConditionGather() {
    this.pubDateList; //{date: String, time: String}
    this.mCoordList = [];
    this.updateList = []; //{mCoord: {mx,my}, baseTimeList: {date, time}}
}

/**
 * kma 1.2부터는 23시간 전까지만 제공함, kma 1.0도 8일에 한시간 부족하게 있음
 * @param days
 * @returns {Array}
 */
PastConditionGather.prototype.makePubDateList = function (days) {
    var pubDateList = [];
    var counts = days*24;
    var currentMins = (new Date()).getUTCMinutes();
    var startOffset;
    var currentDate;
    var dateString;

    counts -= 1;

    if (currentMins > 40) {
        startOffset = 9;
    }
    else {
        startOffset = 8;
    }
    for (var i=0; i<counts; i++) {
        currentDate = manager.getWorldTime(startOffset--);

        dateString = {};
        dateString.date = currentDate.slice(0, 8);
        dateString.time = currentDate.slice(8,10) + '00';

        pubDateList.push(dateString);
    }
    return pubDateList;
};

PastConditionGather.prototype.getCoordList = function (callback) {
    var self = this;

    town.getCoord(function(err, listTownDb) {
        if (err) {
            if (callback) {
                callback(err);
            }
            else {
                log.error(err);
            }
            return;
        }
        self.mCoordList = listTownDb;
        callback(err);
    });

    return this;
};

PastConditionGather.prototype._checkBaseTimeByCoord = function (callback) {
    var self = this;
    var updateObject;

    async.mapLimit(self.mCoordList, 400, function(mCoord, cb) {
        modelCurrent.find({"mCoord.mx":mCoord.mx, "mCoord.my":mCoord.my}, {_id:0}).lean().exec(function (err, modelList) {
            if (err)  {
                return cb(err);
            }

            var model = modelList[0]||{};

            updateObject = {mCoord: mCoord, baseTimeList: []};

            self.pubDateList.forEach(function (pubDate) {
                if (Array.isArray(model.currentData)) {
                    for (var i=0; i<model.currentData.length; i++) {
                        if (pubDate.date === model.currentData[i].date && pubDate.time === model.currentData[i].time) {
                            if (model.currentData[i].t1h === -50 || model.currentData[i].reh === -1) {
                                log.info('baseTime='+JSON.stringify(pubDate)+' data is invalid. so retry!');
                                break;
                            }
                            else {
                                log.debug('baseTime='+JSON.stringify(pubDate)+' is skipped');
                                return;
                            }
                        }
                    }
                }
                log.silly('baseTime='+JSON.stringify(pubDate)+' needs to get data');
                updateObject.baseTimeList.push(pubDate);
            });
            if (updateObject.baseTimeList.length) {
                self.updateList.push(updateObject);
            }
            else {
                log.debug('mCoord='+JSON.stringify(updateObject.mCoord)+' is already updated');
            }
            cb();
        });
    }, function(err) {
        callback(err);
    });

    return this;
};

/**
 * I will remove this function by aleckim
 * @param callback
 * @private
 */
PastConditionGather.prototype._checkBaseTime = function (callback) {
    var self = this;
    var updateObject;
    modelCurrent.find(null, {_id: 0}).lean().exec(function(err, modelList) {
        err = err || modelList.length===0?new Error("Fail get current="+JSON.stringify(mCoord)):undefined;
        if (err) {
            return callback(err);
        }
        modelList.forEach(function (model) {
            updateObject = {mCoord: model.mCoord, baseTimeList: []};
            self.pubDateList.forEach(function (pubDate) {
                if (Array.isArray(model.currentData)) {
                    for (var i=0; i<model.currentData.length; i++) {
                        if (pubDate.date === model.currentData[i].date && pubDate.time === model.currentData[i].time) {
                            if (model.currentData[i].t1h === -50 || model.currentData[i].reh === -1) {
                                log.info('baseTime='+JSON.stringify(pubDate)+' data is invalid. so retry!');
                                break;
                            }
                            else {
                                log.debug('baseTime='+JSON.stringify(pubDate)+' is skipped');
                                return;
                            }
                        }
                    }
                }
                log.silly('baseTime='+JSON.stringify(pubDate)+' needs to get data');
                updateObject.baseTimeList.push(pubDate);
            });
            if (updateObject.baseTimeList.length) {
                self.updateList.push(updateObject);
            }
            else {
                log.debug('mCoord='+JSON.stringify(updateObject.mCoord)+' is already updated');
            }
        });
        callback();
    });
};

PastConditionGather.prototype.start = function (days, key, callback) {
    var self = this;

    async.waterfall([
        function(callback) {
            self.pubDateList = self.makePubDateList(days);
            callback();
        },
        function (callback) {
            self.getCoordList(function (err) {
              callback(err);
            });
        },
        function (callback) {
            self._checkBaseTimeByCoord(function (err) {
                callback(err);
            });
        },
        //function (callback) {
        //    self._checkBaseTime(function (err) {
        //        callback(err);
        //    });
        //},
        function (callback) {
            manager.requestDataByUpdateList(manager.DATA_TYPE.TOWN_CURRENT, key, self.updateList, 10, function (err, results) {
                callback(err);
            });
        }
    ], function(err, results) {
        if (callback) {
            return callback(err);
        }
        if (err) {
            log.error(err);
        }
        log.silly(results);
    });

    return this;
};

module.exports = PastConditionGather;

