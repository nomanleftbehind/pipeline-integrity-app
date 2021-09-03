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


function pipelineCreate({ license, segment, substance, from, from_feature, to, to_feature, status, length, type, grade, outside_diameter, wall_thickness, material, mop, internal_protection, injection_points }, cb) {
  pipelinedetail = {
    license: license,
    segment: segment,
    substance: substance,
    from: from,
    from_feature: from_feature,
    to: to,
    to_feature: to_feature,
    status: status,
    length: length,
    type: type,
    grade: grade,
    outside_diameter: outside_diameter,
    wall_thickness: wall_thickness,
    material: material,
    mop: mop,
    internal_protection: internal_protection,
    injection_points: injection_points
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
    // function (callback) {
    //   pipelineCreate({ license: 'A14488', segment: '60', substance: 'OE', '11-20-046-07W5', '14-20-046-07W5', ipArray('100/10-20-046-07W5/00'), 'Operating', callback);
    // },
    // function (callback) {
    //   pipelineCreate('A14488', '68', 'OE', '13-20-046-07W5', '13-20-046-07W5', ipArray('102/06-32-046-07W5/00', '100/05-32-046-07W5/00'), 'Operating', callback);
    // },
    // function (callback) {
    //   pipelineCreate('A62326', '05', 'SW', '06-29-046-07W5', '08-30-046-07W5', ipArray('100/08-30-046-07W5/00', '100/02-30-046-07W5/00'), 'Operating', callback);
    // },
    function (callback) {pipelineCreate({license: 'AB00035', segment: '3', substance: 'Natural Gas', from: '14-27-047-07W5', from_feature: 'Blind end', to: '04-27-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 1.43, type: '5L', grade: 'A', outside_diameter: 114.3, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '4', substance: 'Natural Gas', from: '04-33-047-07W5', from_feature: 'Blind end', to: '11-28-047-07W5', to_feature: 'Blind end', status: 'Discontinued', length: 0.87, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '5', substance: 'Natural Gas', from: '11-28-047-07W5', from_feature: 'Battery', to: '11-28-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.1, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '6', substance: 'Natural Gas', from: '07-29-047-07W5', from_feature: 'Battery', to: '08-28-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 2.029, type: '5L', grade: 'A', outside_diameter: 114.3, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '7', substance: 'Natural Gas', from: '10-21-047-07W5', from_feature: 'Battery', to: '08-28-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 1, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '8', substance: 'Natural Gas', from: '08-28-047-07W5', from_feature: 'Pipeline', to: '05-27-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.41, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.58, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '9', substance: 'Natural Gas', from: '14-22-047-07W5', from_feature: 'Battery', to: '15-22-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.1, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '11', substance: 'Natural Gas', from: '11-07-047-07W5', from_feature: 'Blind end', to: '12-07-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 0.15, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.58, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '12', substance: 'Natural Gas', from: '05-25-047-07W5', from_feature: 'Blind end', to: '05-25-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 0.21, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '13', substance: 'Natural Gas', from: '04-25-047-07W5', from_feature: 'Blind end', to: '05-25-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 0.06, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '15', substance: 'Natural Gas', from: '06-26-047-07W5', from_feature: 'Pipeline', to: '11-26-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.53, type: '5L', grade: 'A', outside_diameter: 114.3, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '16', substance: 'Natural Gas', from: '11-26-047-07W5', from_feature: 'Pipeline', to: '10-22-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 2.15, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.58, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '17', substance: 'Natural Gas', from: '14-23-047-07W5', from_feature: 'Battery', to: '13-23-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.64, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '18', substance: 'Natural Gas', from: '10-22-047-07W5', from_feature: 'Blind end', to: '10-15-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 1.6, type: '5L', grade: 'A', outside_diameter: 219.1, wall_thickness: 3.58, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '19', substance: 'Natural Gas', from: '06-08-047-06W5', from_feature: 'Blind end', to: '01-18-047-06W5', to_feature: 'Blind end', status: 'Abandoned', length: 1.51, type: '5L', grade: 'A', outside_diameter: 114.3, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '21', substance: 'Natural Gas', from: '07-18-047-06W5', from_feature: 'Battery', to: '07-13-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 1.48, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.58, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '22', substance: 'Natural Gas', from: '13-07-047-06W5', from_feature: 'Satellite', to: '05-18-047-06W5', to_feature: 'Pipeline', status: 'Operating', length: 0.87, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '23', substance: 'Natural Gas', from: '10-13-047-07W5', from_feature: 'Battery', to: '07-13-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.12, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '24', substance: 'Natural Gas', from: '05-19-047-06W5', from_feature: 'Battery', to: '02-24-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.82, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '25', substance: 'Natural Gas', from: '08-24-047-07W5', from_feature: 'Battery', to: '08-24-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.15, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '26', substance: 'Natural Gas', from: '06-24-047-07W5', from_feature: 'Pipeline', to: '02-24-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.67, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '27', substance: 'Natural Gas', from: '02-24-047-07W5', from_feature: 'Pipeline', to: '06-13-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 1.27, type: '5L', grade: 'A', outside_diameter: 114.3, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '28', substance: 'Natural Gas', from: '07-13-047-07W5', from_feature: 'Pipeline', to: '10-15-047-07W5', to_feature: 'Compressor station', status: 'Operating', length: 3.09, type: '5L', grade: 'A', outside_diameter: 219.1, wall_thickness: 3.58, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '29', substance: 'Natural Gas', from: '10-14-047-07W5', from_feature: 'Blind end', to: '10-14-047-07W5', to_feature: 'Blind end', status: 'Discontinued', length: 0.25, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '30', substance: 'Natural Gas', from: '10-01-047-07W5', from_feature: 'Blind end', to: '03-12-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 1.07, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '32', substance: 'Natural Gas', from: '03-12-047-07W5', from_feature: 'Blind end', to: '03-11-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 1.01, type: '5L', grade: 'A', outside_diameter: 114.3, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '33', substance: 'Natural Gas', from: '06-11-047-07W5', from_feature: 'Blind end', to: '03-11-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 0.16, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '34', substance: 'Natural Gas', from: '03-11-047-07W5', from_feature: 'Blind end', to: '10-10-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 1.27, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.58, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '35', substance: 'Natural Gas', from: '07-02-047-07W5', from_feature: 'Blind end', to: '06-11-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 2, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '36', substance: 'Natural Gas', from: '16-33-046-07W5', from_feature: 'Pipeline', to: '06-03-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.53, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.4, material: 'Steel', mop: 1970, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '37', substance: 'Natural Gas', from: '08-04-047-07W5', from_feature: 'Battery', to: '06-03-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.43, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 1970, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '38', substance: 'Natural Gas', from: '06-03-047-07W5', from_feature: 'Pipeline', to: '10-10-047-07W5', to_feature: 'Pipeline', status: 'Operating', length: 1.68, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.58, material: 'Steel', mop: 1970, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '39', substance: 'Natural Gas', from: '06-10-047-07W5', from_feature: 'Blind end', to: '06-10-047-07W5', to_feature: 'Blind end', status: 'Abandoned', length: 0.17, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '40', substance: 'Natural Gas', from: '10-10-047-07W5', from_feature: 'Pipeline', to: '10-15-047-07W5', to_feature: 'Compressor station', status: 'Operating', length: 1.57, type: '5L', grade: 'A', outside_diameter: 219.1, wall_thickness: 3.58, material: 'Steel', mop: 1970, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '44', substance: 'Natural Gas', from: '06-16-047-08W5', from_feature: 'Battery', to: '07-09-047-08W5', to_feature: 'Pipeline', status: 'Operating', length: 1.6, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '47', substance: 'Natural Gas', from: '11-08-047-08W5', from_feature: 'Pipeline', to: '07-09-047-08W5', to_feature: 'Pipeline', status: 'Operating', length: 1.96, type: '5L', grade: 'A', outside_diameter: 168.3, wall_thickness: 3.58, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', segment: '48', substance: 'Natural Gas', from: '07-09-047-08W5', from_feature: 'Pipeline', to: '06-11-047-08W5', to_feature: 'Pipeline', status: 'Operating', length: 2.72, type: '5L', grade: 'A', outside_diameter: 219.1, wall_thickness: 3.58, material: 'Steel', mop: 410, internal_protection: 'Uncoated'} , callback); },
function (callback) {pipelineCreate({license: 'AB00035', substance: 'Natural Gas', segment: '49', from: '08-10-047-08W5', from_feature: 'Blind end', to: '08-10-047-08W5', to_feature: 'Blind end', status: 'Discontinued', length: 0.24, type: '5L', grade: 'A', outside_diameter: 88.9, wall_thickness: 3.4, material: 'Steel', internal_protection: 'Uncoated'} , callback); },

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
      injectionPointCreate('', 0, 0, 0, callback);
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