import StatusController from './controllers/status-controller'

import LambdaRequest from './helpers/lambda-request'
import JobToHttp from './helpers/job-to-http'
import JobManager from './helpers/job-manager'

const jobManager = new JobManager()
const jobToHttp = new JobToHttp()

const controller = new StatusController({jobManager, jobToHttp})
controller.get(new LambdaRequest())
