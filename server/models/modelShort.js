/**
 * Created by kay on 2015-11-27.
 */

var mongoose = require("mongoose");

var shortSchema = new mongoose.Schema({
    mCoord :{
        mx : Number,
        my : Number
    },
    pubDate : String, //YYYYMMDDHHMM last baseDate+baseTime
    shortData : [{
        date : String, //fcstDate
        time : String, //fcstTime
        mx : {type : Number, default : -1},
        my : {type : Number, default : -1},
        pop: {type : Number, default : -1},
        pty: {type : Number, default : -1},
        r06: {type : Number, default : -1},
        reh: {type : Number, default : -1},
        s06: {type : Number, default : -1},
        sky: {type : Number, default : -1},
        t3h: {type : Number, default : -50},
        tmn: {type : Number, default : -50},
        tmx: {type : Number, default : -50},
        uuu: {type : Number, default : -100},
        vvv: {type : Number, default : -100},
        wav: {type : Number, default : -1},
        vec: {type : Number, default : -1},
        wsd: {type : Number, default : -1}
    }]
});

shortSchema.index({mCoord:1});
shortSchema.index({"mCoord.mx" : 1, "mCoord.my" : 1});

module.exports = mongoose.model('short', shortSchema);
