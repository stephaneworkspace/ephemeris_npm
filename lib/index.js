'use strict'

var eph = require('./../build/')
/*
const Moment = require('moment-timezone');

function add_zero(your_number, length) 
{
    var num = '' + your_number;
    while (num.length < length) {
        num = '0' + num;
    }
    return num
}*/

// inspiration de https://github.com/hemantgoswami/ephemeris/blob/master/index.js

//var setUp = function(JourJJ, MoisMM, DateAAAA , HeureHH, MinuteMM, geodeticalLongitude, geodeticalLatitude, height)
function setUp (iDate, geodeticalLongitude, geodeticalLatitude, height, ascSigne, ascDegre) {
    var date
    // dateObj =  new Moment.tz(add_zero(JourJJ, 2) + '.' + add_zero(MoisMM, 2) + '.' + add_zero(DateAAAA, 4) + ' ' + add_zero(HeureHH, 2) + ':' + add_zero(MinuteMM, 2) + '00', 'DD.MM.YYYY HH:mm:ss', 'UTC');
    

    eph.const.tlong = geodeticalLongitude;
    eph.const.glat = geodeticalLatitude;
    eph.const.height = height;

    //eph.const.date = add_zero(JourJJ, 2) + '.' + add_zero(MoisMM, 2) + '.' + add_zero(DateAAAA, 4) + ' ' + add_zero(HeureHH, 2) + ':' + add_zero(MinuteMM, 2) + '00';
    eph.const.date = iDate;

    if (eph.const.date) {
        var tokens = eph.const.date.split(' ');
        tokens[0] = tokens[0].split('.');
        tokens[1] = tokens[1].split(':');
        date = {
            day: parseFloat(tokens[0][0]), // parseFloat strips leading zeros
            month: parseFloat(tokens[0][1]),
            year: parseFloat(tokens[0][2]),
            hours: parseFloat(tokens[1][0]),
            minutes: parseFloat(tokens[1][1]),
            seconds: parseFloat(tokens[1][2])
        }
        eph.const.date = date;
    }
    eph.processor.init();

    // return dateObj;
}

function getAllPlanets (iDate, geodeticalLongitude, geodeticalLatitude, height, ascSigne, ascDegre) {
    setUp(iDate, geodeticalLongitude, geodeticalLatitude, height);

    var ret = {
        date: undefined,
        observer: undefined,
        observed: {},
    }

    var date = eph.const.date
    var observables = Object.keys(eph.moshier.body)
   
    for (var i = 0; i < observables.length; i++) {
        var observeMe = observables[i];
        if (['earth', 'init'].indexOf(observeMe) >= 0) {
            continue
        }
        eph.const.body = eph.moshier.body[observeMe];
        eph.processor.calc(date, eph.const.body);  
        if (ret.date === undefined) {
            ret.date = {
                gregorianTerrestrial: [date.day, date.month, date.year].join('.') + ' ' + [date.hours, date.minutes, date.seconds].join(':'),
                gregorianTerrestrialRaw: date,
                gregorianUniversal: (eph.const.date.universalDateString),
                gregorianDelta: ('00:00:' + (eph.const.date.delta)),
                julianTerrestrial: (eph.const.date.julian),
                julianUniversal: (eph.const.date.universal),
                julianDelta: (eph.const.date.delta / 86400)
            }
        }
    
        if (ret.observer === undefined) {
            ret.observer = {
                name: 'earth',
                longitueGeodetic: (eph.const.tlong),
                longitudeGeodecentric: (eph.const.tlong),
                latitudeGeodetic: (eph.const.glat),
                latitudeGeodecentric: (eph.const.tlat),
                heightGeodetic: (eph.const.height),
                heightGeodecentric: (eph.const.trho * eph.const.aearth / 1000),
            }
        }
  
        var body = {
            name: eph.const.body.key,
            raw: eph.const.body,
            apparentLongitudeDms30: (eph.const.body.position.apparentLongitude30String),
            apparentLongitudeDms360: (eph.const.body.position.apparentLongitudeString),
            apparentLongitudeDd: (eph.const.body.position.apparentLongitude),
            geocentricDistanceKm: (eph.const.body.position.geocentricDistance),
            ascSigne: ascSigne,
            ascDegre: ascDegre
        }

        ret.observed[body.name] = body  
    }
  
    return ret
}

//exports.calc = calc; //very important line
module.exports = {
    ephemeris: eph,
    getAllPlanets
    // getPlanet
}