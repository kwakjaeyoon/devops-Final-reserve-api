const express = require('express');
// const { get_cache, set_cache } = require('../cache/connection');
// const con = require('../db/connection');
const router = express.Router();
const es = require('../elasticsearch/index');

// con.connect();

router.post('/', function (req, res) {
    // let sql = `INSERT INTO table_name (id, etc) VALUES ('1','example');`;

    const data = {
        title: "Create Data",
        levels: "INFO",
        body: `Create Data id=${id} is Success!`
    };
    const error = {
        title: "Create Data failed",
        levels: "ERROR",
        body: `id=${id} failed... `
    };

    const resp = es.insertDoc('log', data);

    // con.query(sql, function (err,result){
    //     if (err) {
    //         await es.insertDoc('log', error);
    //         console.log(err);
    //     }else{
    //         console.log('insert data Success!', result);
    //         await es.insertDoc('log', data);
    //     }
    // });

});



router.get('/', function(req, res){
    // let id = req.params.id;
    // const getCache = get_cache(id);
    // if(getCache === undefined || getCache === null){
    //     let sql = `SELECT *FROM table_name WHERE id=${id};`;
    //     con.query(sql, function (err,result){
    //         if (err) throw(err);
    //         console.log('Find data Success!', result);
    //         res.status(200).send(result);
    //     });
    //     set_cache(id, JSON.stringify(sql));
    // }else{
    //     res.status(200).send(getCache);
    // }

    const data = {
        title: "Find Data",
        levels: "INFO",
        body: `Find Data  is Success!`
    }


    const resp = es.insertDoc('log', data);

    // try {
    //     const resp = await es.insertDoc('log', data);
    //     console.log(resp);
    // } catch (e) {
    //     const err = {
    //         title: "Find Data failed",
    //         levels: "ERROR",
    //         body: `id=${id} failed... ${e}`
    //     }
    //     const resp = await es.insertDoc('log', err);
    //     console.log(e);
    // }
});


router.patch('/:id', function(req, res){
    let id = req.params.id;
    // let sql = `UPDATE table_name SET field1=data1, field2=data2 WHERE id=${id};`;

    const data = {
        title: "Update Data",
        levels: "INFO",
        body: `Update Data id=${id} is Success!`
    };
    const error = {
        title: "Update Data failed",
        levels: "ERROR",
        body: `id=${id} failed... `
    };
    const resp = es.insertDoc('log', data);

    // con.query(sql, function (err,result){
    //     if (err) {
    //         await es.insertDoc('log', error);
    //         console.log(err);
    //     }else{
    //         console.log('update data Success!', result);
    //         await es.insertDoc('log', data);
    //     }
    // });
});

router.delete('/:id', function(req, res){
    // let id = req.params.id;
    // let sql = `DELETE FROM tablename WHERE id=${id};`;
    // con.query(sql, function (err,result){
    //     if (err) throw(err);
    //     console.log('delete data Success!', result);
    // });

    const data = {
        title: "Delete Data",
        levels: "INFO",
        body: `Delete Data id=${id} is Success!`
    }
    
    const resp = es.insertDoc('log', data);
});


module.exports = router; 