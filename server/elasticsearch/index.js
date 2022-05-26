const client = require('./connect');

// create elasticsearch index
const createIndex = async function(indexName){
    return await client.indices.create({
        index: indexName
    });
}

// insert data in elasticsearch document
const insertDoc = async function(indexName, _id, data){
    return await client.index({
        index: indexName,
        id: _id,
        body: data
    });
}

// search data from elasticsearch document (사용 x)
const searchDoc = async function(indexName,  payload){
    return await client.search({
        index: indexName,
        body: payload
    });
}

module.exports={
    createIndex,
    insertDoc,
    searchDoc
}

// create index test 
async function test(){
    try {
        const resp = await createIndex('blog');
        console.log(resp);
    } catch (e) {
        console.log(e);
    }
}

// insert data test
async function test2(){
    const data = {
        title: "Learn elastic search",
        levels: "info",
        body: `Lot of content here...
                .... article`
    }
    try {
        const resp = await insertDoc('blog', 1, data);
        console.log(resp);
    } catch (e) {
        console.log(e);
    }
}


test();
test2();