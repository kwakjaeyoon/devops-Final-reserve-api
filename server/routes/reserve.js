const express = require('express');
const { get_cache, set_cache } = require('../cache/connection');
const db = require('../db/connection');
const router = express.Router();
const es = require('../elasticsearch/index');


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

    //es.insertDoc('log', data);

    db.query(sql, function (err,result){
        if (err) {
            const resp = es.insertDoc('log', error);
            console.log(err);
        }else{
            const resp = es.insertDoc('log', data);
            console.log('insert data Success!');
        }
    });

});



router.get('/:id', function(req, res){
    let id = req.params.id;
    const getCache = get_cache(id);
    console.log(getCache);
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
    if(getCache === undefined || getCache === null){
        let sql = `SELECT *FROM reserve WHERE id=${id};`;
        db.query(sql, function (err,result){
            if (err) {
                const resp = es.insertDoc('log', error);
                console.log(err);
            }else{
                const resp = es.insertDoc('log', data);
                console.log('Find data Success!', result);
                res.status(200).send(result);
            }
        });
        set_cache(id, JSON.stringify(sql));
    }else{
        res.status(200).send(getCache);
    }
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


module.exports = router; 