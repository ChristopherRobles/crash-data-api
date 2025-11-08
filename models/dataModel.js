const mongoose = require('mongoose');

const crashSchema = new mongoose.Schema({
  type: { type: String, default: 'Feature' },

  properties: {
    CRIMEID: String,
    CCN: String,
    REPORTDATE: Date,
    ROUTEID: String,
    MEASURE: Number,
    OFFSET: Number,
    STREETSEGID: Number,
    ROADWAYSEGID: Number,
    FROMDATE: Date,
    TODATE: Date,
    ADDRESS: String,
    LATITUDE: Number,
    LONGITUDE: Number,
    XCOORD: Number,
    YCOORD: Number,
    WARD: String,
    EVENTID: String,
    MAR_ADDRESS: String,
    MAR_SCORE: Number,

    // Injuries
    MAJORINJURIES_BICYCLIST: Number,
    MINORINJURIES_BICYCLIST: Number,
    UNKNOWNINJURIES_BICYCLIST: Number,
    FATAL_BICYCLIST: Number,

    MAJORINJURIES_DRIVER: Number,
    MINORINJURIES_DRIVER: Number,
    UNKNOWNINJURIES_DRIVER: Number,
    FATAL_DRIVER: Number,

    MAJORINJURIES_PEDESTRIAN: Number,
    MINORINJURIES_PEDESTRIAN: Number,
    UNKNOWNINJURIES_PEDESTRIAN: Number,
    FATAL_PEDESTRIAN: Number,

    MAJORINJURIESPASSENGER: Number,
    MINORINJURIESPASSENGER: Number,
    UNKNOWNINJURIESPASSENGER: Number,
    FATALPASSENGER: Number,

    MAJORINJURIESOTHER: Number,
    MINORINJURIESOTHER: Number,
    UNKNOWNINJURIESOTHER: Number,
    FATALOTHER: Number,

    // Totals
    TOTAL_VEHICLES: Number,
    TOTAL_BICYCLES: Number,
    TOTAL_PEDESTRIANS: Number,
    TOTAL_TAXIS: Number,
    TOTAL_GOVERNMENT: Number,

    // Impairment
    PEDESTRIANSIMPAIRED: Number,
    BICYCLISTSIMPAIRED: Number,
    DRIVERSIMPAIRED: Number,

    SPEEDING_INVOLVED: Number,

    // Intersection & Location
    NEARESTINTROUTEID: String,
    NEARESTINTSTREETNAME: String,
    OFFINTERSECTION: Number,
    INTAPPROACHDIRECTION: String,
    LOCATIONERROR: mongoose.Schema.Types.Mixed,
    LASTUPDATEDATE: Date,
    MPDLATITUDE: Number,
    MPDLONGITUDE: Number,
    MPDGEOX: Number,
    MPDGEOY: Number,

    // Metadata
    MAR_ID: Number,
    BLOCKKEY: String,
    SUBBLOCKKEY: String,
    CORRIDORID: String,
    NEARESTINTKEY: String,
    OBJECTID: Number
  },

  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: {
      type: [Number], // [longitude, latitude, elevation]
      index: '2dsphere' // Enables geospatial queries
    }
  }
});

module.exports = mongoose.model('Crash', crashSchema);