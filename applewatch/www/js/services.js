angular.module('starter.services', [])

    .factory('WeatherInfo', function ($http, WeatherUtil) {
        var obj = {
            cities: [],
            towns: [],
            cityIndex: 0, // 최초 지역은 현재 위치가 보여지도록 함
            loadIndex: -1 // 초기 로드 중인 city index
        };

        //region APIs

        obj.addCity = function (city) {
            var that = this;

            if (that.indexOf(city) === -1) {
                that.cities.push(city);
                that.saveCities();
                return true;
            }
            return false;
        };

        obj.removeCity = function (index) {
            var that = this;

            if (index !== -1) {
                that.cities.splice(index, 1);
                that.saveCities();
                return true;
            }
            return false;
        };

        obj.updateCity = function (index, weatherData) {
            var that = this;
            var city = that.cities[index];

            if (weatherData.address) {
                city.address = weatherData.address;
            }
            if (weatherData.location) {
                city.location = weatherData.location;
            }
            if (weatherData.currentWeather) {
                city.currentWeather = weatherData.currentWeather;
            }
            if (weatherData.timeTable) {
                city.timeTable = weatherData.timeTable;
            }
            if (weatherData.timeChart) {
                city.timeChart = weatherData.timeChart;
            }
            if (weatherData.dayTable) {
                city.dayTable = weatherData.dayTable;
            }
            if (weatherData.dayChart) {
                city.dayChart = weatherData.dayChart;
            }

            that.saveCities();
        };

        obj.getCityOfIndex = function (index) {
            var that = this;

            if (index < 0 || index >= that.cities.length) {
                return null;
            }
            return that.cities[index];
        };

        obj.getCityCount = function () {
            var that = this;
            return that.cities.length;
        };

        obj.indexOf = function (city) {
            var that = this;

            for (var i = 0; i < that.cities.length; i += 1) {
                if (that.cities[i].currentPosition === true && city.currentPosition === true) {
                    return i;
                }
                if (that.cities[i].address === city.address) {
                    return i;
                }
            }
            return -1;
        };

        obj.loadCities = function() {
            if (typeof(Storage) === "undefined") {
                return false;
            }

            var that = this;
            that.cities = JSON.parse(localStorage.getItem("cities"));
            if (that.cities === null) { // set guide data
                var city = {};
                city.currentPosition = true;
                city.address = "대한민국 하늘시 중구 구름동";
                city.location = null;
                city.currentWeather = {time: 7, t1h: 19, sky: "SunWithCloud", tmn: 14, tmx: 28, summary: "어제보다 1도 낮음"};

                var timeData = [];
                timeData[0] = {day: "", time: "6시", t3h: 17, sky:"Cloud", pop: 10, tempIcon:"Temp-01", tmn: 17};
                timeData[1] = {day: "", time: "9시", t3h: 21, sky:"Lightning", pop: 20, tempIcon:"Temp-02"};
                timeData[2] = {day: "", time: "12시", t3h: 26, sky:"Moon", pop: 30, tempIcon:"Temp-03"};
                timeData[3] = {day: "", time: "15시", t3h: 28, sky:"MoonWithCloud", pop: 40, tempIcon:"Temp-04", tmx: 28};
                timeData[4] = {day: "", time: "18시", t3h: 26, sky:"Rain", pop: 50, tempIcon:"Temp-05"};
                timeData[5] = {day: "", time: "21시", t3h: 21, sky:"RainWithLightning", pop: 60, tempIcon:"Temp-06"};
                timeData[6] = {day: "어제", time: "0시", t3h: 18, sky:"RainWithSnow", pop: 70, tempIcon:"Temp-07"};
                timeData[7] = {day: "", time: "3시", t3h: 16, sky:"Snow", pop: 80, tempIcon:"Temp-08"};
                timeData[8] = {day: "", time: "6시", t3h: 15, sky:"SnowWithLightning-Big", pop: 90, tempIcon:"Temp-09", tmn: 15};
                timeData[9] = {day: "", time: "9시", t3h: 21, sky:"Sun", pop: 10, tempIcon:"Temp-10"};
                timeData[10] = {day: "", time: "12시", t3h: 26, sky:"SunWithCloud", pop: 20, tempIcon:"Temp-10"};
                timeData[11] = {day: "", time: "15시", t3h: 28, sky:"WindWithCloud", pop: 30, tempIcon:"Temp-01"};
                timeData[12] = {day: "", time: "18시", t3h: 29, sky:"Rain", pop: 50, tempIcon:"Temp-04", tmx: 29};
                timeData[13] = {day: "", time: "21시", t3h: 21, sky:"RainWithLightning", pop: 60, tempIcon:"Temp-05"};
                timeData[14] = {day: "오늘", time: "0시", t3h: 18, sky:"RainWithSnow", pop: 70, tempIcon:"Temp-06"};
                timeData[15] = {day: "", time: "3시", t3h: 15, sky:"Snow", pop: 80, tempIcon:"Temp-07"};
                timeData[16] = {day: "", time: "지금", t3h: 14, sky:"SnowWithLightning-Big", pop: 90, tempIcon:"Temp-08", tmn: 14};
                timeData[17] = {day: "", time: "9시", t3h: 21, sky:"Cloud", pop: 10, tempIcon:"Temp-09"};
                timeData[18] = {day: "", time: "12시", t3h: 26, sky:"Lightning", pop: 20, tempIcon:"Temp-10"};
                timeData[19] = {day: "", time: "15시", t3h: 29, sky:"Moon", pop: 30, tempIcon:"Temp-01", tmx: 29};
                timeData[20] = {day: "", time: "18시", t3h: 28, sky:"MoonWithCloud", pop: 50, tempIcon:"Temp-04"};
                timeData[21] = {day: "", time: "21시", t3h: 22, sky:"Rain", pop: 60, tempIcon:"Temp-05"};
                timeData[22] = {day: "내일", time: "0시", t3h: 20, sky:"RainWithSnow", pop: 70, tempIcon:"Temp-06"};
                timeData[23] = {day: "", time: "3시", t3h: 18, sky:"RainWithLightning", pop: 80, tempIcon:"Temp-07"};
                timeData[24] = {day: "", time: "6시", t3h: 17, sky:"SnowWithLightning-Big", pop: 90, tempIcon:"Temp-08", tmn: 17};
                timeData[25] = {day: "", time: "9시", t3h: 21, sky:"Sun", pop: 10, tempIcon:"Temp-09"};
                timeData[26] = {day: "", time: "12시", t3h: 27, sky:"SunWithCloud", pop: 20, tempIcon:"Temp-10"};
                timeData[27] = {day: "", time: "15시", t3h: 29, sky:"WindWithCloud", pop: 30, tempIcon:"Temp-01", tmn: 29};
                timeData[28] = {day: "", time: "18시", t3h: 28, sky:"Rain", pop: 50, tempIcon:"Temp-04"};
                timeData[29] = {day: "", time: "21시", t3h: 24, sky:"RainWithLightning", pop: 60, tempIcon:"Temp-05"};
                timeData[30] = {day: "모레", time: "0시", t3h: 21, sky:"RainWithSnow", pop: 70, tempIcon:"Temp-06"};
                timeData[31] = {day: "", time: "3시", t3h: 18, sky:"Snow", pop: 80, tempIcon:"Temp-07"};
                //timeData[32] = {day: "", time: "6시", t3h: 17, sky:"SnowWithLightning-Big", pop: 90, tempIcon:"Temp-08"};
                //timeData[33] = {day: "", time: "9시", t3h: 21, sky:"Sun", pop: 10, tempIcon:"Temp-09"};
                //timeData[34] = {day: "", time: "12시", t3h: 26, sky:"SunWithCloud", pop: 20, tempIcon:"Temp-10"};
                //timeData[35] = {day: "", time: "15시", t3h: 29, sky:"WindWithCloud", pop: 30, tempIcon:"Temp-01"};
                //timeData[36] = {day: "", time: "18시", t3h: 26, sky:"Rain", pop: 50, tempIcon:"Temp-04"};
                //timeData[37] = {day: "", time: "21시", t3h: 23, sky:"RainWithLightning", pop: 60, tempIcon:"Temp-05"};
                //timeData[38] = {day: "글피", time: "0시", t3h: 18, sky:"RainWithSnow", pop: 70, tempIcon:"Temp-06"};
                //timeData[39] = {day: "", time: "3시", t3h: 18, sky:"Snow", pop: 80, tempIcon:"Temp-07"};

                city.timeTable = timeData.slice(8);
                city.timeChart = [
                    {
                        name: "yesterday",
                        values: timeData.slice(0, timeData.length - 8).map(function (d) {
                            return { name: "yesterday", value: d };
                        })
                    },
                    {
                        name: "today",
                        values: timeData.slice(8).map(function (d) {
                            return { name: "today", value: d };
                        })
                    }
                ];

                var dayData = [];
                dayData[0] = {week: "목", sky:"Cloud", pop: 10, humidityIcon:"Humidity-10", reh: 10, tmn: 10, tmx: 28};
                dayData[1] = {week: "금", sky:"Lightning", pop: 20, humidityIcon:"Humidity-20", reh: 10, tmn: 17, tmx: 26};
                dayData[2] = {week: "토", sky:"Moon", pop: 30, humidityIcon:"Humidity-30", reh: 10, tmn: 16, tmx: 23};
                dayData[3] = {week: "일", sky:"MoonWithCloud", pop: 40, humidityIcon:"Humidity-40", reh: 10, tmn: 14, tmx: 22};
                dayData[4] = {week: "월", sky:"Rain", pop: 50, humidityIcon:"Humidity-50", reh: 10, tmn: 14, tmx: 22};
                dayData[5] = {week: "화", sky:"RainWithLightning", pop: 60, humidityIcon:"Humidity-60", reh: 10, tmn: 12, tmx: 22};
                dayData[6] = {week: "수", sky:"RainWithSnow", pop: 70, humidityIcon:"Humidity-70", reh: 10, tmn: 15, tmx: 27};
                dayData[7] = {week: "오늘", sky:"Snow", pop: 80, humidityIcon:"Humidity-80", reh: 10, tmn: 15, tmx: 25};
                dayData[8] = {week: "금", sky:"SnowWithLightning-Big", pop: 90, humidityIcon:"Humidity-90", reh: 10, tmn: 15, tmx: 22};
                dayData[9] = {week: "토", sky:"Sun", pop: 10, humidityIcon:"Humidity-10", reh: 10, tmn: 12, tmx: 22};
                dayData[10] = {week: "일", sky:"SunWithCloud", pop: 20, humidityIcon:"Humidity-10", reh: 10, tmn: 17, tmx: 28};
                dayData[11] = {week: "월", sky:"WindWithCloud", pop: 30, humidityIcon:"Humidity-10", reh: 10, tmn: 17, tmx: 27};
                dayData[12] = {week: "화", sky:"Rain", pop: 50, humidityIcon:"Humidity-40", reh: 10, tmn: 17, tmx: 26};
                dayData[13] = {week: "수", sky:"RainWithLightning", pop: 60, humidityIcon:"Humidity-50", reh: 10, tmn: 16, tmx: 24};
                dayData[14] = {week: "목", sky:"RainWithSnow", pop: 70, humidityIcon:"Humidity-60", reh: 10, tmn: 15, tmx: 28};
                dayData[15] = {week: "금", sky:"Snow", pop: 80, humidityIcon:"Humidity-70", reh: 10, tmn: 17, tmx: 26};
                dayData[16] = {week: "토", sky:"SnowWithLightning-Big", pop: 90, humidityIcon:"Humidity-80", reh: 10, tmn: 13, tmx: 24};
                dayData[17] = {week: "일", sky:"Cloud", pop: 10, humidityIcon:"Humidity-90", reh: 10, tmn: 12, tmx: 25};

                city.dayTable = dayData;
                city.dayChart = [{
                    values: dayData,
                    temp: city.currentWeather.t1h
                }];

                that.cities = [];
                that.cities.push(city);
            }
        };

        obj.saveCities = function() {
            if (typeof(Storage) === "undefined") {
                return false;
            }

            var that = this;
            localStorage.setItem("cities", JSON.stringify(that.cities));
        };

        obj.updateCities = function() {
            var that = this;
            var city = that.cities[++that.loadIndex];

            if (city) {
                WeatherUtil.getWeatherInfo(city.address).then(function (weatherData) {
                    var city = WeatherUtil.convertWeatherData(weatherData);
                    that.updateCity(that.loadIndex, city);
                    that.updateCities();
                });
            }
        };

        obj.loadTowns = function() {
            var that = this;
            $http.get('data/town.json')
                .then(function (res) {
                    that.towns = res.data;
                });
        };

        //endregion

        return obj;
    })
    .factory('WeatherUtil', function ($q, $http) {
        var obj = {};

        //region Function

        /**
         *
         * @param {Number} sky 맑음(1) 구름조금(2) 구름많음(3) 흐림(4) , invalid : -1
         * @param {Number} pty 없음(0) 비(1) 비/눈(2) 눈(3), invalid : -1
         * @param {Number} lgt 없음(0) 있음(1), invalid : -1
         * @param {Boolean} isNight
         */
        function parseSkyState(sky, pty, lgt, isNight) {
            var skyIconName = "";

            switch (pty) {
                case 1:
                    skyIconName = "Rain";
                    if (lgt) {
                        skyIconName += "WithLightning";
                    }
                    return skyIconName;
                case 2:
                    return skyIconName = "RainWithSnow"; //Todo need RainWithSnow icon";
                case 3:
                    return skyIconName = "Snow";
            }

            if (lgt) {
                return skyIconName = "Lightning";
            }

            if (isNight) {
                skyIconName = "Moon";
            }
            else {
                skyIconName = "Sun";
            }

            switch (sky) {
                case 1:
                    return skyIconName;
                case 2:
                    return skyIconName += "WithCloud";
                case 3:
                    return skyIconName = "Cloud"; //Todo need new icon
                case 4:
                    return skyIconName = "Cloud";
            }

            return skyIconName;
        }

        /**
         *
         * @param pm10Value
         * @returns {*}
         */
        function parsePm10Value(pm10Value) {
            if (pm10Value <= 30) {
                return "좋음";
            }
            else if (pm10Value <= 80) {
                return "보통";
            }
            else if (pm10Value <= 150) {
                return "나쁨";
            }
            else if (pm10Value > 150) {
                return "매우 나쁨";
            }
            return "-";
        }

        /**
         *
         * @param dailyInfoList
         * @param date
         * @returns {*}
         */
        function getDayInfo(dailyInfoList, date) {
            if (dailyInfoList.length === 0) {
                return undefined;
            }

            for (var i = 0; i < dailyInfoList.length; i++) {
                if (dailyInfoList[i].date === date) {
                    return dailyInfoList[i];
                }
            }

            return undefined;
        }

        /**
         *
         * @param currentHours
         * @returns {number}
         */
        function getPositionHours(currentHours) {
            return Math.floor(currentHours / 3) * 3;
        }

        /**
         *
         * @param {Date} target
         * @param {Date} current
         * @returns {number}
         */
        function getDiffDays(target, current) {
            if (!target || !current) {
                console.log("target or current is invalid");
                return 0;
            }
            var date = new Date(current.getFullYear(), current.getMonth(), current.getDate());
            return Math.ceil((target - date) / (1000 * 3600 * 24));
        }

        /**
         * YYYYMMDD
         * @param {String} str
         * @returns {*}
         */
        function convertStringToDate(str) {
            var y = str.substr(0, 4),
                m = str.substr(4, 2) - 1,
                d = str.substr(6, 2);
            var data = new Date(y, m, d);
            return (data.getFullYear() == y && data.getMonth() == m && data.getDate() == d) ? data : undefined;
        }

        /**
         * @param day
         * @param hours
         * @returns {*}
         */
        function getDayString(day, hours) {
            if (hours !== 0) {
                return "";
            }

            var dayString = ["그제", "어제", "오늘", "내일", "모레", "글피"];
            if (-2 <= day && day <= 3) {
                return dayString[day + 2];
            }
            console.error("Fail to get day string day=" + day + " hours=" + hours);
            return "";
        }

        /**
         *
         * @param {number} positionHours
         * @param {number} day
         * @param {number} hours
         * @returns {String}
         */
        function getTimeString(positionHours, day, hours) {
            if (positionHours === hours && day === 0) {
                return "지금";
            }
            return hours + "시";
        }

        /**
         *
         * @param temp
         * @param tmx
         * @param tmn
         * @returns {string}
         */
        function decideTempIcon(temp, tmx, tmn) {
            var max = tmx - tmn;
            var cur = temp - tmn;
            var p = Math.max(1, Math.ceil(cur / max * 10));

            if (p > 9) {
                return "Temp-" + p;
            }
            else {
                return "Temp-0" + p;
            }
        }

        function dayToString(day) {
            switch (day) {
                case 0:
                    return "일";
                    break;
                case 1:
                    return "월";
                    break;
                case 2:
                    return "화";
                    break;
                case 3:
                    return "수";
                    break;
                case 4:
                    return "목";
                    break;
                case 5:
                    return "금";
                    break;
                case 6:
                    return "토";
                    break;
            }
            return "";
        }

        function parseSensoryTem(sensoryTem) {
            if (sensoryTem >= 0 ) {
                return "";
            }
            else if ( -10 < sensoryTem < 0) {
                return "관심";
            }
            else if ( -25 < sensoryTem <= -10) {
                return "주의";
            }
            else if ( -45 < sensoryTem <= -25) {
                return "경고";
            }
            else if (sensoryTem <= -45) {
                return "위험";
            }
            return "";
        }

        function convertMidSkyString(skyInfo) {
            switch (skyInfo) {
                case "맑음":
                    return "Sun";
                    break;
                case "구름조금":
                    return "SunWithCloud";
                    break;
                case "구름많음":
                    return "SunWithCloud";
                    break;
                case "흐림":
                    return "Cloud";
                    break;
                case "구름적고 비":
                    return "Rain";
                    break;
                case "구름많고 비":
                    return "Rain";
                    break;
                case "흐리고 비":
                    return "Rain";
                    break;
                case "구름적고 눈":
                    return "Snow";
                    break;
                case "구름많고 눈":
                    return "Snow";
                    break;
                case "흐리고 눈":
                    return "Snow";
                    break;
            }

            console.log("Fail to convert skystring=" + skyInfo);
            return "";
        }

        function getHighPrioritySky(sky1, sky2) {
            if (sky2 === "Rain") {
                return sky2;
            }

            return sky1;
        }

        function parseUltrv(ultrv) {
            if (0 <= ultrv  && ultrv <= 2) return "낮음";
            else if(3 <= ultrv && ultrv <= 5) return "보통";
            else if(6 <= ultrv && ultrv <= 7) return "높음";
            else if(8 <= ultrv && ultrv <= 10) return "매우 높음";
            else if(11 <= ultrv) return "위험";
            return "";
        }

        function decideHumidityIcon(reh) {
            var tempIconName = "Humidity-";

            if (reh == 100) {
                tempIconName += "90";
            }
            else {
                tempIconName += parseInt(reh / 10) * 10;
            }
            return tempIconName;
        }

        /**
         *
         * @param {Object} current
         * @param {Object} yesterday
         * @returns {String}
         */
        function makeSummary(current, yesterday) {
            var str = "어제";
            var diffTemp = current.t1h - yesterday.t3h;

            if (diffTemp == 0) {
                str += "와 동일";
            }
            else {
                str += "보다 " + Math.abs(diffTemp);
                if (diffTemp < 0) {
                    str += "도 낮음";
                }
                else if (diffTemp > 0) {
                    str += "도 높음";
                }
            }

            //current.arpltn = {};
            //current.arpltn.pm10Value = 80;
            //current.arpltn.pm10Str = "나쁨";
            if (current.arpltn && current.arpltn.pm10Value && current.arpltn.pm10Value >= 80) {
                str += ", " + "미세먼지 " + current.arpltn.pm10Str;
            }

            //current.ultrv = 6;
            //current.ultrvStr = "높음";
            if (current.ultrv && current.ultrv >= 6) {
                str += ", " + "자외선 " + current.ultrvStr;
            }

            //current.sensorytmp = -10;
            //current.sensorytmeStr = "관심";
            if (current.sensorytem && current.sensorytem <= -10) {
                str += ", " + "체감온도 " + current.sensorytemStr;
            }

            return str;
        }

        /**
         * It's supporting only korean lang
         * @param {Object[]} results
         * @returns {string}
         */
        function findDongAddressFromGoogleGeoCodeResults(results) {
            var dongAddress = "";
            var length = 0;

            results.forEach(function (result) {
                var lastChar = result.formatted_address.slice(-1);
                if (lastChar === "동" || lastChar === "읍" || lastChar === "면")  {
                    if(length < result.formatted_address.length) {
                        dongAddress = result.formatted_address;
                        length = result.formatted_address.length;
                    }
                }
            });

            if (dongAddress.length === 0) {
                console.log("Fail to find index of dong from="+results[0].formatted_address);
            }
            return dongAddress;
        }

        /**
         *
         * @param {Object[]} results
         * @returns {string}
         */
        function findLocationFromGoogleGeoCodeResults(results) {
            var location = {}; //{"lat": Number, "long": Number};

            results.forEach(function (result) {
                location.lat = result.geometry.location.lat;
                location.long = result.geometry.location.lng;
            });
            return location;
        }

        //endregion

        //region APIs

        /**
         * wsd : 풍속 4~8 약간 강, 9~13 강, 14~ 매우강
         * pm10Value, pm10Grade
         * {date: String, lgt: Number, mx: Number, my: Number, pty: Number, reh: Number, rn1: Number,
         *          sky: Number, t1h: Number, time: String, uuu: Number, vec: Number, vvv: Number,
         *          wsd: Number}
         * @param {Object} currentTownWeather
         * @returns {{}}
         */
        obj.parseCurrentTownWeather = function (currentTownWeather) {
            var currentForecast = {};
            var time = parseInt(currentTownWeather.time.substr(0, 2));
            var isNight = time < 7 || time > 18;

            currentForecast.time = time;
            currentForecast.t1h = currentTownWeather.t1h;
            currentForecast.sky = parseSkyState(currentForecast.sky, currentTownWeather.pty,
                currentTownWeather.lgt, isNight);
            currentForecast.wsd = currentTownWeather.wsd;

            if (currentTownWeather.arpltn && currentTownWeather.arpltn.pm10Value) {
                currentForecast.pm10Value = currentTownWeather.arpltn.pm10Value;
                currentForecast.pm10Grade = currentTownWeather.arpltn.pm10Grade;
                currentForecast.pm10Str = parsePm10Value(currentTownWeather.arpltn.pm10Value);
            }
            return currentForecast;
        };

        /**
         *
         * @param shortForecastList
         * @returns {Array}
         */
        obj.parsePreShortTownWeather = function (shortForecastList) {
            // {date: String, sky: String, tmx: Number, tmn: Number, reh: Number}
            var dailyTemp = [];

            shortForecastList.forEach(function (shortForecast) {
                var dayInfo = getDayInfo(dailyTemp, shortForecast.date);
                if (!dayInfo) {
                    var data = {date: shortForecast.date, sky: "Sun", tmx: null, tmn: null, pop: 0, reh: 0};
                    dailyTemp.push(data);
                    dayInfo = dailyTemp[dailyTemp.length - 1];
                    dayInfo.sky = parseSkyState(shortForecast.sky, shortForecast.pty, shortForecast.lgt, false);
                }
                if (shortForecast.tmx != -50 && shortForecast.tmx != 0) {
                    dayInfo.tmx = shortForecast.tmx;
                }
                //sometimes, t3h over tmx;
                if (shortForecast.t3h > dayInfo.tmx) {
                    dayInfo.tmx = shortForecast.t3h;
                }

                if (shortForecast.tmn != -50 && shortForecast.tmn != 0) {
                    dayInfo.tmn = shortForecast.tmn;
                }
                if (shortForecast.t3h < dayInfo.tmn) {
                    dayInfo.tmn = shortForecast.t3h;
                }

                if (shortForecast.pty > 0) {
                    dayInfo.sky = parseSkyState(shortForecast.sky, shortForecast.pty, shortForecast.lgt, false);
                }
                dayInfo.pop = shortForecast.pop > dayInfo.pop ? shortForecast.pop : dayInfo.pop;
                dayInfo.reh = shortForecast.reh > dayInfo.reh ? shortForecast.reh : dayInfo.reh;
            });

            console.log(dailyTemp);
            return dailyTemp;
        };

        /**
         * r06 6시간 강수량, s06 6시간 신적설, Sensorytem 체감온도, 부패, 동상가능, 열, 불쾌, 동파가능, 대기확산
         * @param {Object[]} shortForecastList
         * @param {Date} currentForecast
         * @param {Date} current
         * @param {Object[]} dailyInfoList
         * @returns {{timeTable: Array, timeChart: Array}}
         */
        obj.parseShortTownWeather = function (shortForecastList, currentForecast, current, dailyInfoList) {
            var data = [];
            var positionHours = getPositionHours(current.getHours());

            shortForecastList.every(function (shortForecast) {
                var tempObject = {};
                var time = parseInt(shortForecast.time.slice(0, -2));
                var diffDays = getDiffDays(convertStringToDate(shortForecast.date), current);
                var day = getDayString(diffDays, time);
                var isNight = time < 7 || time > 18;
                var dayInfo = getDayInfo(dailyInfoList, shortForecast.date);
                if (!dayInfo) {
                    console.log("Fail to find dayInfo date=" + shortForecast.date);
                    dayInfo = {date: shortForecast.date, tmx: 100, tmn: -49};
                }

                if (diffDays <= -2 && time < positionHours) {
                    //skip object
                    return true;
                }
                if (positionHours === 0 && diffDays <= -3) {
                    //when current time is 0, skip all -3
                    return true;
                }

                tempObject.day = day;
                tempObject.time = getTimeString(positionHours, diffDays, time);
                //It means invalid data
                if (!shortForecast.pop && !shortForecast.sky && !shortForecast.pty && !shortForecast.reh && !shortForecast.t3h) {
                    tempObject.t3h = undefined;
                    tempObject.pop = undefined;
                    tempObject.sky = "Sun";
                    tempObject.tempIcon = "Temp-01";
                }
                else {
                    tempObject.t3h = shortForecast.t3h;
                    tempObject.sky = parseSkyState(shortForecast.sky, shortForecast.pty, shortForecast.lgt, isNight);
                    tempObject.pop = shortForecast.pop;
                    tempObject.tempIcon = decideTempIcon(shortForecast.t3h, dayInfo.tmx, dayInfo.tmn);
                }

                // 단기 예보의 현재(지금) 데이터를 currentForecast 정보로 업데이트
                if (diffDays === 0 && time === positionHours &&
                    (time <= currentForecast.time && currentForecast.time < time + 3)) {
                    tempObject.t3h = currentForecast.t1h;
                    tempObject.sky = currentForecast.sky;
                    tempObject.tempIcon = decideTempIcon(currentForecast.t1h, dayInfo.tmx, dayInfo.tmn);
                }

                // 하루 기준의 최고, 최저 온도 찾기
                // t3h를 tmx, tmn로 대처함
                if (shortForecast.tmx !== 0) {
                    if (tempObject.t3h < shortForecast.tmx) {
                        tempObject.t3h = shortForecast.tmx;
                    }
                    tempObject.tmx = shortForecast.tmx;
                }
                else if (shortForecast.tmn !== 0) {
                    if (tempObject.tmn < tempObject.t3h) {
                        tempObject.t3h = tempObject.tmn;
                    }
                    tempObject.tmn = shortForecast.tmn;
                }

                if (diffDays === 0 && time === positionHours) {
                    currentForecast.sensorytem = shortForecast.sensorytem;
                    currentForecast.sensorytemStr = parseSensoryTem(shortForecast.sensorytem);
                }
                if (diffDays === 0 && time === positionHours + 3) {
                   if (!currentForecast.sensorytem) {
                       currentForecast.sensorytem = shortForecast.sensorytem;
                       currentForecast.sensorytemStr = parseSensoryTem(shortForecast.sensorytem);
                   }
                }

                data.push(tempObject);

                return data.length < 32;
            });

            if (data.length < 32) {
                var i;
                for (i = 0; data.length < 32; i++) {
                    var tempObject = {};
                    tempObject.day = "";
                    tempObject.time = "";
                    //tempObject.t3h = data[data.length-1].t3h;
                    tempObject.t3h = undefined;
                    tempObject.sky = "Sun";
                    tempObject.pop = 0;
                    tempObject.tempIcon = "Temp-01";
                    data.push(tempObject);
                }
            }

            var timeTable = data.slice(8);
            var timeChart = [
                {
                    name: "yesterday",
                    values: data.slice(0, data.length - 8).map(function (d) {
                        return {name: "yesterday", value: d};
                    })
                },
                {
                    name: "today",
                    values: data.slice(8).map(function (d) {
                        return {name: "today", value: d};
                    })
                }
            ];

            return {timeTable: timeTable, timeChart: timeChart};
        };
        
        /**
         * 식중독, ultra 자외선,
         * @param midData
         * @param dailyInfoList
         * @param currentTime
         * @param currentWeather
         * @returns {Array}
         */
        obj.parseMidTownWeather = function (midData, dailyInfoList, currentTime, currentWeather) {
            var tmpDayTable = [];
            midData.dailyData.forEach(function (dayInfo) {
                var data = {};
                data.date = dayInfo.date;

                var diffDays = getDiffDays(convertStringToDate(data.date), currentTime);
                if (diffDays < -7 || diffDays > 10) {
                    return;
                }
                if (diffDays == 0) {
                    data.week = "오늘";
                }
                else {
                    data.week = dayToString(convertStringToDate(data.date).getDay());
                }

                var skyAm = convertMidSkyString(dayInfo.wfAm);
                var skyPm = convertMidSkyString(dayInfo.wfPm);
                data.sky = getHighPrioritySky(skyAm, skyPm);
                if (diffDays === 0) {
                    data.tmx = currentWeather.t1h>dayInfo.taMax?currentWeather.t1h:dayInfo.taMax;
                    data.tmn = currentWeather.t1h<dayInfo.taMin?currentWeather.t1h:dayInfo.taMin;
                }
                else {
                    data.tmx = dayInfo.taMax;
                    data.tmn = dayInfo.taMin;
                }

                if (diffDays === 0) {
                    currentWeather.ultrv = dayInfo.ultrv;
                    currentWeather.ultrvStr = parseUltrv(dayInfo.ultrv);
                }
                data.humidityIcon = "Humidity-00";
                tmpDayTable.push(data);
            });

            console.log(tmpDayTable);

            var index = 0;
            for (var i = 0; i < tmpDayTable.length; i++) {
                var tmpDate = dailyInfoList[0].date;
                //console.log(tmpDate);
                if (tmpDayTable[i].date === tmpDate) {
                    index = i;
                    break;
                }
            }

            //{week: "목", sky:"Cloud", pop: 10, humidityIcon:"Humidity-10", reh: 10, tmn: 10, tmx: 28};
            dailyInfoList.forEach(function (dayInfo) {
                var data;
                if (tmpDayTable[index].date === dayInfo.date) {
                    data = tmpDayTable[index];
                    data.sky = dayInfo.sky;
                    data.pop = dayInfo.pop;
                    data.reh = dayInfo.reh;
                    data.humidityIcon = decideHumidityIcon(data.reh);
                    index++;
                }
                else {
                    console.log("Date was mismatched index:" + index + " date:" + tmpDayTable[index].date +
                    " dayInfo.date=" + dayInfo.date);
                }
            });

            return tmpDayTable;
        };

        /**
         *
         * @param date
         * @returns {string}
         */
        obj.convertTimeString = function (date) {
            var timeString;
            timeString = (date.getMonth()+1)+"월 "+date.getDate()+ "일";
            timeString += "("+dayToString(date.getDay()) +") ";

            if (date.getHours() < 12) {
                timeString += " "+ date.getHours()+":"+date.getMinutes() + " AM";
            }
            else {
                timeString += " "+ (date.getHours()-12) +":"+date.getMinutes() + " PM";
            }

            return timeString;
        };

        /**
         *
         * @param {String} fullAddress 대한민국 천하도 강남시 하늘구 가내동 33-2, 대한민국 서울특별시 라임구 마라동
         * @returns {String[]}
         */
        obj.convertAddressArray = function (fullAddress) {
            var splitAddress = [];

            if (fullAddress && fullAddress.split) {
                splitAddress = fullAddress.split(" ");
            }
            return splitAddress;
        };

        /**
         * It's supporting only korean lang
         * return only city namd and dong name
         * @param {String} fullAddress
         * @returns {string}
         */
        obj.getShortenAddress = function (fullAddress) {
            var that = this;
            var parsedAddress = that.convertAddressArray(fullAddress);

            if (!parsedAddress || parsedAddress.length < 2) {
                console.log("Fail to split full address="+fullAddress);
                return "";
            }
            if (parsedAddress.length === 5) {
                //대한민국, 경기도, 성남시, 분당구, 수내동
                parsedAddress.splice(0, 2);
            }
            else if (parsedAddress.length === 4) {
                //대한민국, 서울특별시, 송파구, 잠실동
                parsedAddress.splice(0, 1);
            }
            else if (parsedAddress.length === 3) {
                //대한민국, 세종특별자치시, 금난면,
                parsedAddress.splice(0, 1);
            }
            else {
                console.log("Fail to get shorten from ="+fullAddress);
            }
            parsedAddress.splice(1, 1);
            parsedAddress.splice(2, 1);

            console.log(parsedAddress.toString());
            return parsedAddress.toString();
        };

        /**
         *
         * @param addressArray
         * @returns {{first: string, second: string, third: string}}
         */
        obj.getTownFromFullAddress = function (addressArray) {
            var town = {first: "", second: "", third: ""};
            if (!Array.isArray(addressArray) || addressArray.length === 0) {
                console.log("addressArray is invalid");
                return town;
            }

            if (addressArray.length === 5) {
                town.first = addressArray[1];
                town.second = addressArray[2]+addressArray[3];
                town.third = addressArray[4];
            }
            else if (addressArray.length === 4) {
                town.first = addressArray[1];
                town.second = addressArray[2];
                town.third = addressArray[3];
            }
            else if (addressArray.length === 3) {
                town.first = addressArray[1];
                town.second = addressArray[1];
                town.third = addressArray[2];
            }
            else {
                var err = new Error("Fail to parse address array="+addressArray.toString());
                console.log(err);
            }
            return town;
        };

        /**
         *
         * @param {String} address
         */
        obj.getAddressToGeolocation = function (address) {
            var deferred = $q.defer();
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address;

            $http({method: 'GET', url: url}).success(function (data) {
                if (data.status === 'OK') {
                    var location = findLocationFromGoogleGeoCodeResults(data.results);
                    console.log(location);
                    deferred.resolve(location);
                }
                else {
                    //'ZERO_RESULTS', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED',  'INVALID_REQUEST', 'UNKNOWN_ERROR'
                    deferred.reject(new Error(data.status));
                }
            }).error(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        /**
         *
         * @param {Number} lat
         * @param {Number} long
         */
        obj.getAddressFromGeolocation = function (lat, long) {
            var deferred = $q.defer();
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long +
                "&sensor=true&language=ko";

            $http({method: 'GET', url: url}).success(function (data) {
                if (data.status === "OK") {
                    var address = findDongAddressFromGoogleGeoCodeResults(data.results);
                    if (!address || address.length === 0) {
                        deferred.reject(new Error("Fail to find dong address from " + data.results[0].formatted_address));
                    }
                    console.log(address);
                    deferred.resolve(address);
                }
                else {
                    //'ZERO_RESULTS', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED',  'INVALID_REQUEST', 'UNKNOWN_ERROR'
                    deferred.reject(new Error(data.status));
                }
            }).error(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        obj.getCurrentPosition = function () {
            var deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function(position) {
                //경기도,광주시,오포읍,37.36340556,127.2307667
                //deferred.resolve({latitude: 37.363, longitude: 127.230});
                //세종특별자치시,세종특별자치시,연기면,36.517338,127.259247
                //deferred.resolve({latitude: 36.51, longitude: 127.259});

                deferred.resolve(position.coords);
            }, function(error) {
                console.log(error);
                deferred.reject();
            },{timeout:3000});

            return deferred.promise;
        };

        /**
         *
         * @param {String} address
         * @param {cbWeatherInfo} callback
         */
        obj.getWeatherInfo = function (address) {
            var that = this;
            var deferred = $q.defer();

            //var url = "town";
            //var url = "https://todayweather1-wizardfactory.rhcloud.com/town";
            //var url = "https://todayweather2-wizardfactory.rhcloud.com/town";
            var url = "https://d2ibo8bwl7ifj5.cloudfront.net/town";
            var addressArray = that.convertAddressArray(address);

            if (addressArray.length === 0) {
                deferred.reject("address is empty");
                return deferred.promise;
            }

            var town = that.getTownFromFullAddress(addressArray);
            url += "/" + town.first + "/" + town.second + "/" + town.third;

            console.log(url);

            $http({method: 'GET', url: url})
                .success(function(data) {
                    console.log(data);
                    deferred.resolve(data);
                })
                .error(function(error) {
                    if (!error) {
                        error = new Error("Fail to get weatherInfo");
                    }
                    console.log(error);
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        /**
         *
         * @param weatherData
         */
        obj.convertWeatherData = function (weatherData) {
            var that = this;
            var data = {};
            var currentTime = new Date();
            var currentForecast = that.parseCurrentTownWeather(weatherData.current);
            var dailyInfoArray = that.parsePreShortTownWeather(weatherData.short);

            /*
             parseShortWeather에서 currentForcast에 체감온도를 추가 함, scope에 적용전에 parseShortTownWeather를 해야 함
             */
            var shortTownWeather = that.parseShortTownWeather(weatherData.short, currentForecast, currentTime, dailyInfoArray);
            console.log(shortTownWeather);

            /*
             parseMidTownWeather에서 currentForecast에 자외선지수를 추가 함
             */
            var midTownWeather = that.parseMidTownWeather(weatherData.midData, dailyInfoArray, currentTime, currentForecast);
            console.log(midTownWeather);

            currentForecast.summary = makeSummary(currentForecast, shortTownWeather.timeTable[0]);

            data.currentWeather = currentForecast;
            data.timeTable = shortTownWeather.timeTable;
            data.timeChart = shortTownWeather.timeChart;
            data.dayTable = midTownWeather;
            data.dayChart = [{
                values: midTownWeather,
                temp: currentForecast.t1h
            }];

            return data;
        };

        //endregion

        return obj;
    });