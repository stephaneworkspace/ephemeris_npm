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

var calc = function(JourJJ, MoisMM, DateAAAA , HeureHH, MinuteMM)
{
    dateObj =  new Moment.tz(add_zero(JourJJ, 2) + '.' + add_zero(MoisMM, 2) + '.' + add_zero(DateAAAA, 4) + ' ' + add_zero(HeureHH, 2) + ':' + add_zero(MinuteMM, 2) + '00', 'DD.MM.YYYY HH:mm:ss', 'UTC');
    return dateObj;
    // return JourJJ + '.' + MoisMM + '.' + DateAAAA + ' ' + HeureHH + ':' + MinuteMM
}
exports.calc = calc; //very important line