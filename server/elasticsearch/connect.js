const es = require('elasticsearch')
require('dotenv').config()

// .env 에 ELASTIC_PASSWORD 설정 
let user = 'elastic';
let password = process.env.ELASTIC_PASSWORD;
let host = process.env.ELASTIC_HOST;

const client = new es.Client({
  host: `${user}:${password}@${host}:9200`
})


client.ping({
  requestTimeout: 30000,
  }, function(error) {
  if (error) {
    console.error('Cannot connect to Elasticsearch.');
  } else {
    console.log('Connected to Elasticsearch was successful!');
  }
  });


module.exports = client; 