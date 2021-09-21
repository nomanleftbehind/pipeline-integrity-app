#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async');
const InjectionPoint = require('./models/injectionPoint');
const Facility = require('./models/facility');
const Satellite = require('./models/satellite');
const { Pipeline } = require('./models/pipeline');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var pipelines = [];
var injectionpoints = [];
var facilities = [];
var satellites = [];


function pipelineCreate({ license, segment, substance, from, from_feature, to, to_feature, status, length, type, grade, outside_diameter, wall_thickness, material, mop, internal_protection, injection_points, facility }, cb) {
  pipelinedetail = {
    license,
    segment,
    substance,
    from,
    from_feature,
    to,
    to_feature,
    status,
    length,
    type,
    grade,
    outside_diameter,
    wall_thickness,
    material,
    mop,
    internal_protection,
    injection_points,
    satellite
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


function injectionPointCreate({ source, oil, gas, water, first_production, last_production, first_injection, last_injection, pv_unit_id, pv_node_id }, cb) {
  injectionpointdetail = {
    source,
    oil,
    water,
    gas,
    first_production,
    last_production,
    first_injection,
    last_injection,
    pv_unit_id,
    pv_node_id
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


function facilityCreate({ name }, cb) {
  facilitydetail = {
    name
  }

  var facility = new Facility(facilitydetail);
  facility.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Facility: ' + facility);
    facilities.push(facility)
    cb(null, facility)
  });
}

function satelliteCreate({ name, facility }, cb) {
  satellitedetail = {
    name,
    facility
  }

  var satellite = new Satellite(satellitedetail);
  satellite.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Satellite: ' + satellite);
    satellites.push(satellite)
    cb(null, satellite)
  });
}

function ipArray(...sources) {
  arr = [];
  sources.forEach(source => arr.push(
    injectionpoints[injectionpoints.findIndex(inj_pt => inj_pt.pv_unit_id === source.pv_unit_id && inj_pt.pv_node_id === source.pv_node_id)]
  ));
  return arr;
}

function identifyFacility(name) {
  return facilities[facilities.findIndex(facility => facility.name === name)];
}
function identifySatellite(name) {
  return satellites[satellites.findIndex(satellite => satellite.name === name)];
}

function createPipelines(cb) {
  async.parallel([
    function (callback) { pipelineCreate({ license: 'AB14631', segment: '59', substance: 'Oil Well Effluent', from: '06-27-046-07W5', from_feature: 'Well', to: '08-27-046-07W5', to_feature: 'Satellite', status: 'Operating', length: 1.03, type: 'Z245.1', grade: '3592', outside_diameter: 88.9, wall_thickness: 3.2, material: 'Steel', mop: 4960, internal_protection: 'Uncoated', injection_points: ipArray({ pv_unit_id: '85C3512C6881443492AE9A03EA903D9B', pv_node_id: '39DFC50F75BF4FB083A6A73679378466' }), satellite: identifySatellite('08-27-046-07W5'), }, callback); },
    function (callback) { pipelineCreate({ license: 'AB14631', segment: '60', substance: 'Oil Well Effluent', from: '04-24-046-07W5', from_feature: 'Satellite', to: '04-24-046-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.11, type: 'Z245.1', grade: '3592', outside_diameter: 88.9, wall_thickness: 4, material: 'Steel', mop: 4960, internal_protection: 'Uncoated', injection_points: ipArray({ pv_unit_id: '929FF25772B4483094CFE2A65467F710', pv_node_id: '24040F3433524B008040F1D067932BD4' }), satellite: identifySatellite('04-24-046-07W5'), }, callback); },
    function (callback) { pipelineCreate({ license: 'AB14631', segment: '61', substance: 'Oil Well Effluent', from: '14-24-046-07W5', from_feature: 'Satellite', to: '04-25-046-07W5', to_feature: 'Pipeline', status: 'Operating', length: 0.76, type: 'Z245.1', grade: '3592', outside_diameter: 88.9, wall_thickness: 4, material: 'Steel', mop: 4960, internal_protection: 'Uncoated', injection_points: ipArray({ pv_unit_id: 'AF5F44AA440A49CC97C868362C02F0F5', pv_node_id: 'BF2987EAAE3C4C72A6757F29B73074FF' }, { pv_unit_id: '4B56A9B2FA784EB4AEC8967F1242D821', pv_node_id: 'B334099A9212447DA53B8FBFD09A7DEF' }), satellite: identifySatellite('14-24-046-07W5'), }, callback); },
    function (callback) { pipelineCreate({ license: 'AB14631', segment: '62', substance: 'Oil Well Effluent', from: '02-34-046-07W5', from_feature: 'Satellite', to: '16-27-046-07W5', to_feature: 'Pipeline', status: 'Operating', length: 1.36, type: 'Z245.1', grade: '3592', outside_diameter: 88.9, wall_thickness: 4, material: 'Steel', mop: 4960, internal_protection: 'Uncoated', injection_points: ipArray({ pv_unit_id: 'FE79D65A39DE46B9AA0C278D8B0E0608', pv_node_id: 'C99080133DCE47FDB84322CA553C83B2' }, { pv_unit_id: '1A10F08C66524977920C3F4CA54484E6', pv_node_id: 'ED900FC704674093A3E452675A7539D0' }, { pv_unit_id: 'BBD6B9BD78E14281B6E6BEB283C48B1D', pv_node_id: '947CF81AEFFD46C586110B464F06FC5D' }), satellite: identifySatellite('02-34-046-07W5'), }, callback); },
    function (callback) { pipelineCreate({ license: 'AB14797', segment: '1', substance: 'Salt Water', from: '11-26-047-08W5', from_feature: 'Blind end', to: '14-26-047-08W5', to_feature: 'Blind end', status: 'Discontinued', length: 0.23, type: 'Z245.3', grade: '2901', outside_diameter: 60.3, wall_thickness: 3.91, material: 'Steel', mop: undefined, internal_protection: 'Unknown', injection_points: ipArray({ pv_unit_id: 'BDB34FD0025C40A290E48406FFD96A5E', pv_node_id: 'B102A914AF0D4506819E1568AA1F31B2' }), satellite: identifySatellite('11-26-047-08W5'), }, callback); },
    function (callback) { pipelineCreate({ license: 'AB15033', segment: '1', substance: 'Oil Well Effluent', from: '02-05-047-07W5', from_feature: 'Well', to: '02-05-047-07W5', to_feature: 'Battery', status: 'Operating', length: 0.24, type: '5L', grade: 'B', outside_diameter: 88.9, wall_thickness: 4.78, material: 'Steel', mop: 10340, internal_protection: 'Uncoated', injection_points: ipArray({ pv_unit_id: '99FF955850C641B6A05C365921BD5196', pv_node_id: '6FE5291B35374A47A52E9462312333A0' }), satellite: identifySatellite('04-31-046-07W5'), }, callback); },
  ],
    // optional callback
    cb);
}


function createInjectionPoints(cb) {
  async.series([
    function (callback) { injectionPointCreate({ source: '', oil: 0, water: 0, gas: 0, first_production: undefined, last_production: undefined, first_injection: undefined, last_injection: undefined, pv_unit_id: '', pv_node_id: '', }, callback); },
    function (callback) { injectionPointCreate({ source: '11-28-047-07W5 ARC - Sales Gas', oil: 0, water: 0, gas: 0, first_production: undefined, last_production: undefined, first_injection: undefined, last_injection: undefined, pv_unit_id: 'B99DA295BB1E4DD8950286AFD7F06CA7', pv_node_id: 'D87BF22EC2ED40CCAE96E1C38F43B78D', }, callback); },
  ],
    // optional callback
    cb);
}

function createFacilities(cb) {
  async.parallel([
    function (callback) { facilityCreate({ name: '10-15-047-07W5 GP', }, callback); },
    function (callback) { facilityCreate({ name: '07-12-049-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-31-047-06W5', }, callback); },
    function (callback) { facilityCreate({ name: '16-07-048-05W5', }, callback); },
    function (callback) { facilityCreate({ name: '08-02-048-06W5', }, callback); },
    function (callback) { facilityCreate({ name: '14-16-048-06W5', }, callback); },
    function (callback) { facilityCreate({ name: '09-25-048-07W5 GP', }, callback); },
    function (callback) { facilityCreate({ name: '09-02-048-06W5 CS', }, callback); },
    function (callback) { facilityCreate({ name: '11-17-049-04W5 GP', }, callback); },
    function (callback) { facilityCreate({ name: '05-35-048-04W5 GP', }, callback); },
    function (callback) { facilityCreate({ name: '11-17 & 5-35 COM. SUC.', }, callback); },
    function (callback) { facilityCreate({ name: '01-15-048-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '15-12-048-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '02-21-047-02W5', }, callback); },
    function (callback) { facilityCreate({ name: '03-01-050-05W5', }, callback); },
    function (callback) { facilityCreate({ name: '04-25-047-03W5', }, callback); },
    function (callback) { facilityCreate({ name: '04-30-048-04W5', }, callback); },
    function (callback) { facilityCreate({ name: '08-24-048-05W5', }, callback); },
    function (callback) { facilityCreate({ name: '05-35-048-04W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-24-048-04W5', }, callback); },
    function (callback) { facilityCreate({ name: '14-32-048-04W5', }, callback); },
    function (callback) { facilityCreate({ name: '02-13-047-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '16-28-046-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-07-047-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '08-22-046-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '10-11-047-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '14-28-046-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-15-047-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '02-23-047-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '07-08-047-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '14-25-046-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '08-06-047-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '07-01-047-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '15-36-046-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '08-04-047-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '10-13-047-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '14-22-047-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '01-28-050-12W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-11-056-20W4', }, callback); },
    function (callback) { facilityCreate({ name: '06-24-047-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '15-04-048-07W5', }, callback); },
    function (callback) { facilityCreate({ name: '11-26-047-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '04-21-048-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-03-048-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '07-04-048-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '08-12-048-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '01-23-047-11W5', }, callback); },
    function (callback) { facilityCreate({ name: '14-30-047-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '16-22-047-10W5', }, callback); },
    function (callback) { facilityCreate({ name: '14-14-047-10W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-03-050-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '09-22-048-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '10-10-048-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '10-33-049-08W5', }, callback); },
    function (callback) { facilityCreate({ name: '06-16-048-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '04-34-047-09W5 Stn 7', }, callback); },
    function (callback) { facilityCreate({ name: '06-19-040-05W5', }, callback); },
    function (callback) { facilityCreate({ name: '03-36-043-09W5', }, callback); },
    function (callback) { facilityCreate({ name: '07-18-047-06W5', }, callback); },
    function (callback) { facilityCreate({ name: 'UMBACH', }, callback); },
    function (callback) { facilityCreate({ name: 'BUICK', }, callback); },
    function (callback) { facilityCreate({ name: 'SIRIUS', }, callback); },
    function (callback) { facilityCreate({ name: 'SIRIUS', }, callback); },
    function (callback) { facilityCreate({ name: 'SIRIUS', }, callback); },
    function (callback) { facilityCreate({ name: 'SIRIUS', }, callback); },

  ],
    // optional callback
    cb);
}

function createSatellites(cb) {
  async.parallel([
    function (callback) { satelliteCreate({ name: 'satellite', facility: identifyFacility('10-15-047-07W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: 'WEST QUAD', facility: identifyFacility('10-15-047-07W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SOUTH QUAD', facility: identifyFacility('10-15-047-07W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: 'EAST QUAD', facility: identifyFacility('10-15-047-07W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: 'NORTH QUAD', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'N,N WEST QUAD', facility: identifyFacility('10-15-047-07W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: 'NORTH WEST QUAD', facility: identifyFacility('10-15-047-07W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-01-049-07W5', facility: identifyFacility('07-12-049-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-12-049-07W5', facility: identifyFacility('07-12-049-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-09-048-06W5', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-08-048-06W5', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-06-048-06W5', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-06-048-06W5', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '09-36-047-07W5', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-32-047-06W5', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-31-047-06W5', facility: identifyFacility('06-31-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-34-047-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-05-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL: 13-22&5-23-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '05-23-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '13-22-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-16-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-07-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-18-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-07-048-05W5', facility: identifyFacility('16-07-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'NORTH ', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'EAST', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Deadleg', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-02-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL: 16-12,14-12,8-11', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-11-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-12-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-12-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '12-01-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'WEST NEW GL:', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'NORTH VOL INC.', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-02-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-15-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-10-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-03-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL: 16-10, 6-3 & 6-15', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-35-047-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'EAST GL:', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-01-048-06W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-06-048-05W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '05-05-048-05W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-05-048-05W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL: 16-33, 13-34,1-28,16-28&11-3', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-33-047-05W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-03-048-05W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-28-047-05W5', facility: identifyFacility('08-02-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-08-048-06W5', facility: identifyFacility('14-16-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-17-048-06W5', facility: identifyFacility('14-16-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-16-048-06W5', facility: identifyFacility('14-16-048-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '7-12 BA', facility: identifyFacility('09-25-048-07W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SUCTION', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '1-15-48-7 SALES', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '15-12 & 1-15-48-7 SALES', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-16-48-6 SALES', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-16, 15-12 & 1-15-48-7 SALES', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-7 SALES', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Gl:for all including 8-2', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '9-2 SALES  ', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '9-2 SALES  13-16 S.S.', facility: identifyFacility('09-02-048-06W5 CS'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-17 SALES', facility: identifyFacility('11-17-049-04W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: '5-35 SALES', facility: identifyFacility('05-35-048-04W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-17 INLET', facility: identifyFacility('11-17 & 5-35 COM. SUC.'), }, callback); },
    function (callback) { satelliteCreate({ name: '5-35 WEST INLET', facility: identifyFacility('11-17 & 5-35 COM. SUC.'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Jou/ecl/3-1', facility: identifyFacility('11-17 & 5-35 COM. SUC.'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Paramount ', facility: identifyFacility('05-35-048-04W5 GP'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-15-048-07W5', facility: identifyFacility('01-15-048-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '13-02-048-07W5', facility: identifyFacility('01-15-048-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-14-048-07W5', facility: identifyFacility('01-15-048-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-15-048-07W5', facility: identifyFacility('01-15-048-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '15-12-048-07W5', facility: identifyFacility('15-12-048-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-02-048-07W5', facility: identifyFacility('15-12-048-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-21-047-02W5', facility: identifyFacility('02-21-047-02W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '03-01-050-05W5', facility: identifyFacility('03-01-050-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-24-047-03W5', facility: identifyFacility('04-25-047-03W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-25-047-03W5', facility: identifyFacility('04-25-047-03W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-26-047-03W5', facility: identifyFacility('04-25-047-03W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-25-047-03W5', facility: identifyFacility('04-25-047-03W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '03-25-048-05W5', facility: identifyFacility('04-30-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-30-048-04W5', facility: identifyFacility('04-30-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-24-048-05W5', facility: identifyFacility('08-24-048-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '13-15-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-09-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-09-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-04-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-03-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-03-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '13-13-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-11-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-02-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-01-049-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-31-048-03W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-35-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '13-18-048-03W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-14-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-10-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-15-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '13-08-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-17-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '12-22-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '05-20-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-29-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-28-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-28-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-27-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '15-26-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '05-35-048-04W5', facility: identifyFacility('05-35-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-13-048-04W5', facility: identifyFacility('06-24-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-14-048-04W5', facility: identifyFacility('06-24-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-19-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-24-049-05W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-20-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-19-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-17-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-08-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '05-08-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-05-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-04-049-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '09-30-048-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-32-048-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-32-048-04W5', facility: identifyFacility('14-32-048-04W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '12-05-047-08W5', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-07-047-08W5', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL FOR 08-07-& 12-05-047-08W5', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-06-047-08W5', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-07-047-08W5', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Doesn\'t Exist?', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-01-047-09W5', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '15-36-046-09W5', facility: identifyFacility('02-13-047-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-28-046-09W5', facility: identifyFacility('16-28-046-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-34-046-09W5', facility: identifyFacility('16-28-046-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-33-046-09W5', facility: identifyFacility('16-28-046-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-28-046-09W5', facility: identifyFacility('16-28-046-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-28-046-09W5', facility: identifyFacility('16-28-046-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'OIL TRANSFER', facility: identifyFacility('16-28-046-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'FW MU', facility: identifyFacility('06-07-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-07-047-07W5', facility: identifyFacility('06-07-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-18-047-07W5', facility: identifyFacility('06-07-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'EAST QUAD.', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SOUTH QUAD.', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'NORTH QUAD.', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'OIL TRANS. TO 14-28', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-22-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL 4,6,10-24-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-24-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-24-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-24-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL 4,7-25-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-25-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-24-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-25-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-27-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-34-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-15-046-07W5', facility: identifyFacility('08-22-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-11-047-08W5', facility: identifyFacility('10-11-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SW M U', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SW DIST', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'FW INJECT.', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SW T.L.', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SW INJECT', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL 8-30,08-19-046-07W5', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-05-047-07W5 Oil Transfer', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-04-047-07W5 ', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-19-046-07W5', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-30-046-07W5', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-28-046-07W5', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-21-046-07W5', facility: identifyFacility('14-28-046-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-14-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-15-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-16-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL: 06-09,10,11-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-09-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-10-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-11-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-15-047-07W5', facility: identifyFacility('06-15-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-23-047-08W5', facility: identifyFacility('02-23-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-08-047-07W5', facility: identifyFacility('07-08-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-18-046-07W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '03-19-046-07W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-25-046-08W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-25-046-08W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-34-046-08W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-02-047-08W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-35-046-08W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-25-046-08W5', facility: identifyFacility('14-25-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-06-047-07W5', facility: identifyFacility('08-06-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-31-046-07W5', facility: identifyFacility('08-06-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-01-047-08W5', facility: identifyFacility('07-01-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '15-36-046-08W5', facility: identifyFacility('15-36-046-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-04-047-07W5', facility: identifyFacility('08-04-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-33-046-07W5', facility: identifyFacility('08-04-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-02-047-07W5', facility: identifyFacility('08-04-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-35-046-07W5', facility: identifyFacility('08-04-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-13 GL', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL: 2,8-24-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-24-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-24-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-13-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'GL: 13-07,3-12-24-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '13-07-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '03-12-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-12-047-07W5 & 08-13-047-07W5', facility: identifyFacility('10-13-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-22-047-07W5', facility: identifyFacility('14-22-047-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-33-050-12W5', facility: identifyFacility('01-28-050-12W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-33-050-12W5', facility: identifyFacility('01-28-050-12W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-34-050-12W5', facility: identifyFacility('01-28-050-12W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '09-28-050-12W5', facility: identifyFacility('01-28-050-12W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-14-050-12W5', facility: identifyFacility('01-28-050-12W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-28-050-12W5', facility: identifyFacility('01-28-050-12W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-11-056-20W4', facility: identifyFacility('06-11-056-20W4'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-24-047-08W5', facility: identifyFacility('06-24-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '15-04-048-07W5', facility: identifyFacility('15-04-048-07W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '15-22-047-08W5', facility: identifyFacility('11-26-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '11-26-047-08W5', facility: identifyFacility('11-26-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-21-048-09W5', facility: identifyFacility('04-21-048-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-03-048-09W5', facility: identifyFacility('06-03-048-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-04-048-08W5', facility: identifyFacility('07-04-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-03-048-08W5', facility: identifyFacility('07-04-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-34-047-08W5', facility: identifyFacility('07-04-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-04-048-08W5', facility: identifyFacility('07-04-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '12-01-048-09W5', facility: identifyFacility('08-12-048-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-12-048-09W5', facility: identifyFacility('08-12-048-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-23-047-11W5', facility: identifyFacility('01-23-047-11W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-18-047-08W5', facility: identifyFacility('14-30-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '05-19-047-08W5', facility: identifyFacility('14-30-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-36-047-09W5', facility: identifyFacility('14-30-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-30-047-08W5', facility: identifyFacility('14-30-047-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-23-047-10W5', facility: identifyFacility('16-22-047-10W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '04-26-047-10W5', facility: identifyFacility('16-22-047-10W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '16-22-047-10W5', facility: identifyFacility('16-22-047-10W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '14-14-047-10W5', facility: identifyFacility('14-14-047-10W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-03-050-09W5', facility: identifyFacility('06-03-050-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-04-050-09W5', facility: identifyFacility('06-03-050-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-03-050-09W5', facility: identifyFacility('06-03-050-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '09-22-048-08W5', facility: identifyFacility('09-22-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '05-14-048-08W5', facility: identifyFacility('10-10-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '12-11-048-08W5', facility: identifyFacility('10-10-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-10-048-08W5', facility: identifyFacility('10-10-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '10-33-049-08W5', facility: identifyFacility('10-33-049-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-16-048-09W5', facility: identifyFacility('06-16-048-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '7-4 BATTERY', facility: identifyFacility('04-34-047-09W5 Stn 7'), }, callback); },
    function (callback) { satelliteCreate({ name: '43748', facility: identifyFacility('10-10-048-08W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '7-4 & 10-10', facility: identifyFacility('04-34-047-09W5 Stn 7'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Being ABD Sept 2 2021', facility: identifyFacility('04-34-047-09W5 Stn 7'), }, callback); },
    function (callback) { satelliteCreate({ name: '9-22 bat', facility: identifyFacility('04-34-047-09W5 Stn 7'), }, callback); },
    function (callback) { satelliteCreate({ name: '06-19-040-05W5', facility: identifyFacility('06-19-040-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-13-040-06W5', facility: identifyFacility('06-19-040-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '02-01-040-06W5', facility: identifyFacility('06-19-040-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '08-02-042-06W5', facility: identifyFacility('06-19-040-05W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '12-24-043-09W5', facility: identifyFacility('03-36-043-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '03-36-043-09W5', facility: identifyFacility('03-36-043-09W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '01-30-047-06W5', facility: identifyFacility('07-18-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: '07-18-047-06W5', facility: identifyFacility('07-18-047-06W5'), }, callback); },
    function (callback) { satelliteCreate({ name: 'UMBACH', facility: identifyFacility('UMBACH'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Should be Discontinued?', facility: identifyFacility('BUICK'), }, callback); },
    function (callback) { satelliteCreate({ name: 'SIRIUS', facility: identifyFacility('SIRIUS'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Should be ABND?', facility: identifyFacility('SIRIUS'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Confirmed Never Constructed', facility: identifyFacility('SIRIUS'), }, callback); },
    function (callback) { satelliteCreate({ name: 'Confimred never constructed', facility: identifyFacility('SIRIUS'), }, callback); },
  ],
    // optional callback
    cb);
}


async.series([
  createFacilities,
  createSatellites,
  // createInjectionPoints,
  // createPipelines,
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('Injection Points final: ' + pipelines);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });