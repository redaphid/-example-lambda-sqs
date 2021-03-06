// Generated by CoffeeScript 2.4.1
var StatusController, _, debug;

debug = require('debug')('meshblu-core-protocol-adapter-http:get-status-controller');

_ = require('lodash');

StatusController = class StatusController {
  constructor({jobManager, jobToHttp}) {
    this.get = this.get.bind(this);
    this.jobManager = jobManager;
    this.jobToHttp = jobToHttp;
  }

  get(req, res) {
    var job;
    job = this.jobToHttp.httpToJob({
      jobType: 'GetStatus',
      request: req,
      toUuid: req.params.uuid
    });
    return this.jobManager.do(job, (error, jobResponse) => {
      if (error != null) {
        return res.sendError(error);
      }
      return this.jobToHttp.sendJobResponse({res, jobResponse});
    });
  }

};

module.exports = StatusController;
