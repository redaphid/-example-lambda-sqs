// Generated by CoffeeScript 2.4.1
var JobToHttp, SearchDeviceController, _, debug;

debug = require('debug')('meshblu-core-protocol-adapter-http:search-device-controller');

_ = require('lodash');

JobToHttp = require('../helpers/job-to-http');

SearchDeviceController = class SearchDeviceController {
  constructor({jobManager, jobToHttp}) {
    this.mydevices = this.mydevices.bind(this);
    this.searchV1 = this.searchV1.bind(this);
    this.searchV2 = this.searchV2.bind(this);
    this.searchV3 = this.searchV3.bind(this);
    this._oldFormatToJob = this._oldFormatToJob.bind(this);
    this.jobManager = jobManager;
    this.jobToHttp = jobToHttp;
  }

  mydevices(req, res) {
    var job;
    job = this._oldFormatToJob(req);
    job.data.owner = job.metadata.fromUuid;
    debug('dispatching request mydevices', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return res.status(jobResponse.metadata.code).send({
        devices: JSON.parse(jobResponse.rawData)
      });
    });
  }

  searchV1(req, res) {
    var job;
    job = this._oldFormatToJob(req);
    debug('dispatching request v1', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return res.status(jobResponse.metadata.code).send({
        devices: JSON.parse(jobResponse.rawData)
      });
    });
  }

  searchV2(req, res) {
    var job;
    job = this._oldFormatToJob(req);
    debug('dispatching request v2', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

  searchV3(req, res) {
    var error, job;
    job = this.jobToHttp.httpToJob({
      jobType: 'SearchDevices',
      request: req
    });
    if (job.metadata.projection != null) {
      try {
        job.metadata.projection = JSON.parse(job.metadata.projection);
      } catch (error1) {
        error = error1;
      }
    }
    debug('dispatching request v3', job);
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({jobResponse, res});
    });
  }

  _oldFormatToJob(req) {
    var job, token, uuid;
    req.body = _.extend({}, req.body, req.query);
    job = this.jobToHttp.httpToJob({
      jobType: 'SearchDevices',
      request: req
    });
    ({uuid, token} = req.body);
    if (req.body.online != null) {
      req.body.online = req.body.online === 'true';
    }
    _.each(req.body, (value, key) => {
      if (value === 'null' || value === '') {
        return req.body[key] = {
          $exists: false
        };
      }
    });
    if ((uuid != null) && (token != null)) {
      job.metadata.auth = {uuid, token};
      delete job.data.token;
    }
    return job;
  }

};

module.exports = SearchDeviceController;
