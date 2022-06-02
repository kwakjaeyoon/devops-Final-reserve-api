'use strict'; 

const aws = require('aws-sdk');
const queueUrl = process.env.NOTIFY_QUEUE_URL;  // NOTIFY_QUEUE_URL
aws.config.loadFromPath({ 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,   // AWS_ACCESS_KEY_ID
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,  // AWS_SECRET_ACCESS_KEY
    region: "ap-northeast-2"
});
const sqs = new aws.SQS();


async function send_queue(params){
    const sendList = sqs.sendMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
}


module.exports = send_queue(params);


