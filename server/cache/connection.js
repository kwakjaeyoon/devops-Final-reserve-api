const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
}).on('error', function(err) {
  if(err.code == 'ECONNREFUSED') {
   redis.disconnect() 
   return;
  }
 })

module.exports = {
  redis
}