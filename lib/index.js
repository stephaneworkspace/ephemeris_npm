const Moment = require('moment-timezone');

function add_zero(your_number, length) 
{
    var num = '' + your_number;
    while (num.length < length) {
        num = '0' + num;
    }
    return num
}

// index.js
$ns = ephemeris = {};
// https://github.com/mivion/ephemeris/blob/master/load.js
// no jquery please

var calc = function(DateAAAA,MoisMM,JourJJ,HeureHH,MinuteMM)
{
    dateObj =  new Moment.tz(add_zero(JourJJ, 2) + '.' + add_zero(MoisMM, 2) + '.' + DateAAAA + ' ' + HeureHH + ':' + MinuteMM + '00', 'DD.MM.YYYY HH:mm:ss', 'UTC');
    return dateObj;
    // return JourJJ + '.' + MoisMM + '.' + DateAAAA + ' ' + HeureHH + ':' + MinuteMM
}
exports.calc = calc; //very important line