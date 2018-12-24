const Moment = require('moment-timezone');

// index.js
$ns = ephemeris = {};
// https://github.com/mivion/ephemeris/blob/master/load.js
// no jquery please

var calc = function(DateAAAA,MoisMM,JourJJ,HeureHH,MinuteMM)
{
    dateObj =  new Moment.tz(JourJJ + '.' + MoisMM + '.' + DateAAAA + ' ' + HeureHH + ':' + MinuteMM + '00', 'DD.MM.YYYY HH:mm:ss', 'UTC');
    return dateObj;
    // return JourJJ + '.' + MoisMM + '.' + DateAAAA + ' ' + HeureHH + ':' + MinuteMM
}
exports.calc = calc; //very important line