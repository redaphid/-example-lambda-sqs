var AWS = require('aws-sdk');
var sqs = new AWS.SQS()
exports.handler = (error, context) => {
    sqs.getQueueUrl({QueueName: "meshnu-dispatcher-in"}, function(err, {QueueUrl}) {
      if (err) return context.fail(err)
      console.log("we good")
      sqs.sendMessage({QueueUrl, MessageBody: "HI"}, function(err,data){
        if (err) return context.fail(err)
        console.log("we good 2")
        return context.succeed()
      })
    })
}
