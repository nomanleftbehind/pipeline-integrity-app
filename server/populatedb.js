#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async');
const InjectionPoint = require('./models/injectionPoint');
const Pipeline = require('./models/pipeline');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var pipelines = [];
var injectionpoints = [];


function pipelineCreate(license, segment, substance, from, to, inj_pts, status, cb) {
  pipelinedetail = {
    license: license,
    segment: segment,
    substance: substance,
    from: from,
    to: to,
    "injection points": inj_pts,
    status: status
  }

  var pipeline = new Pipeline(pipelinedetail);
  pipeline.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Pipeline: ' + pipeline);
    pipelines.push(pipeline)
    cb(null, pipeline)
  });
}


function injectionPointCreate(source, oil, gas, water, cb) {
  injectionpointdetail = {
    source: source,
    oil: oil,
    water: water,
    gas: gas
  }

  var injectionpoint = new InjectionPoint(injectionpointdetail);
  injectionpoint.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Injection Point: ' + injectionpoint);
    injectionpoints.push(injectionpoint)
    cb(null, injectionpoint)
  });
}

function ipArray(...uwis) {
  arr = [];
  uwis.forEach(uwi => arr.push(
      injectionpoints[injectionpoints.findIndex(inj_pt => inj_pt.source === uwi)]
  ));
  return arr;
}

function createPipelines(cb) {
  async.parallel([
      function(callback) {
        pipelineCreate('A14488', '60', 'OE', '11-20-046-07W5', '14-20-046-07W5', ipArray('100/10-20-046-07W5/00'), 'Operating', callback);
      },
      function(callback) {
        pipelineCreate('A14488', '68', 'OE', '13-20-046-07W5', '13-20-046-07W5', ipArray('102/06-32-046-07W5/00','100/05-32-046-07W5/00'), 'Operating', callback);
      },
      function(callback) {
        pipelineCreate('A62326', '05', 'SW', '06-29-046-07W5', '08-30-046-07W5', ipArray('100/08-30-046-07W5/00','100/02-30-046-07W5/00'), 'Operating', callback);
      },
      ],
      // optional callback
      cb);
}


function createInjectionPoints(cb) {
  async.series([
    function (callback) {
      injectionPointCreate('103/12-33-048-04W5/00', 1.26, 0.89, "0", callback);
    },
    function (callback) {
      injectionPointCreate('100/05-19-048-04W5/00', 1.55, 0.96, 0.04, callback);
    },
    function (callback) {
      injectionPointCreate('100/10-20-046-07W5/00', 1, 0, 0.15, callback);
    },
    function (callback) {
      injectionPointCreate('102/06-32-046-07W5/00', 1.92, 3.76, 0.62, callback);
    },
    function (callback) {
      injectionPointCreate('100/05-32-046-07W5/00', 3.96, 6.27, 0.87, callback);
    },
    function (callback) {
      injectionPointCreate('100/08-30-046-07W5/00', 0, 0, 0, callback);
    },
    function (callback) {
      injectionPointCreate('100/02-30-046-07W5/00', 0, 0, 0, callback);
    },
  ],
    // optional callback
    cb);
}


async.series([
  createInjectionPoints,
  createPipelines,
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('Injection Points final: ' + injectionpoints);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });