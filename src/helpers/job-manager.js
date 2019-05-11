class JobManager {
    constructor(sqs) {
        this.sqs = sqs
    }
    do(job, callback) {
        this.sqs.getQueueUrl({QueueName: "meshnu-dispatcher-in"}, (err, response)=>{
            if(err) return callback(err)
            const {QueueUrl} = response
            sqs.sendMessage({QueueUrl, MessageBody: JSON.stringify(job)}, callback)

        })        
    }
}
export default JobManager