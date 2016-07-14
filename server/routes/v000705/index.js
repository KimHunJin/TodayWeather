/**
 * Created by aleckim on 2016. 2. 21..
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'TodayWeather' });
});

router.use('/gather', require('../v000001/routeGather'));
router.use('/town', require('./routeTownForecast'));
router.use('/daily', require('./dailySummary'));
router.use('/check-purchase', require('./receiptValidation'));
router.use('/push', require('./routePushNotification'));

module.exports = router;

