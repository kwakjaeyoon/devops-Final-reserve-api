const express = require('express');
const { redis } = require('../cache/connection');
const db = require('../db/connection');
const router = express.Router();
const es = require('../elasticsearch/index');
const msg = require('../sqs/message');


router.post('/', function (req, res) {
    let obj=req.body;
    let sql = `INSERT INTO reserve (id, name, etc) VALUES (${obj.id},"${obj.name}","${obj.etc}");`;

    const data = {
        title: "Create Reserve Information",
        levels: "INFO",
        body: `${JSON.stringify(req.body)}`
    };
    const error = {
        title: "Create Data failed test",
        levels: "ERROR",
        body: `create Data is failed... `
    };

    const params = {
        MessageBody: `${JSON.stringify(req.body)}`,
        QueueUrl: process.env.NOTIFY_QUEUE_URL,
        DelaySeconds: 0
    };

    db.query(sql, function (err,result){
        if (err) {
            const resp = es.insertDoc('log', error);
            console.log(err);
        }else{
            const resp = es.insertDoc('log', data);
            msg.send_queue(params);
            console.log('insert data Success!');
        }
    });

});



router.get('/', function(req, res){
    redis.get('data', (err, cached) => {
        const data = {
            title: "Find Data",
            levels: "INFO",
            body: `Find Data is Success!`
        };
        const error = {
            title: "Find Data Error",
            levels: "ERROR",
            body: `Find Data is failed...`
        }
        if(cached === undefined || cached === null){
            let sql = `SELECT * FROM reserve;`;
            db.query(sql, function (err,result){
                if (err) {
                    const resp = es.insertDoc('log', error);
                    console.log(err);
                }else{
                    const resp = es.insertDoc('log', data);
                    console.log('Find data Success!', result);
                    res.status(200).send(result);
                }
                redis.set('data', result);
            });
        }else{
            const resp = es.insertDoc('log', data);
            res.status(200).send(cached);
        }  
    });
    
});


router.patch('/:id', function(req, res){
    let id = req.params.id;
    let obj = req.body;
    let sql = `UPDATE reserve SET id=${obj.id}, name=${obj.name}, etc=${obj.etc} WHERE id=${id};`;

    const data = {
        title: "Update Data",
        levels: "INFO",
        body: `${JSON.stringify(obj)}`
    };
    const error = {
        title: "Update Data failed",
        levels: "ERROR",
        body: `Update id=${id} is failed... `
    };

    db.query(sql, function (err,result){
        if (err) {
            const resp = es.insertDoc('log', error);
            console.log(err);
        }else{
            console.log('update data Success!');
            const resp =  es.insertDoc('log', data);
        }
    });
});

router.delete('/:id', function(req, res){
    let id = req.params.id;
    let sql = `DELETE FROM reserve WHERE id=${id};`;
    db.query(sql, function (err,result){
        if (err) console.log(err);
        console.log('delete data Success!', result);
    });

    const data = {
        title: "Delete Data",
        levels: "INFO",
        body: `Delete Data id=${id} is Success!`
    };
    const error = {
        title: "Delete Data failed",
        levels: "ERROR",
        body: `Delete id=${id} is failed... `
    };
});


module.exports = router; 