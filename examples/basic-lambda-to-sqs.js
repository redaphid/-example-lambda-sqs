const AWS = require('aws-sdk');
const sqs = new AWS.SQS()
exports.handler = async (event) => {
    const {QueueUrl} = await sqs.getQueueUrl({QueueName: "meshnu-dispatcher-in"}).promise()
    const msg = await sqs.sendMessage({QueueUrl, MessageBody: "hi"}).promise()
    return event.Records[0].cf.request
}