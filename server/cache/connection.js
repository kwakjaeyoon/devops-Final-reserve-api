
const Redis = require('ioredis');

module.exports = {

  redis: new Redis({
    host: process.env.REDIS_HOST,
    port: 6379,
  }).on('error', function(err) {
    if(err.code == 'ECONNREFUSED') {
     redis.disconnect() 
     return;
    }
  
    if(config.dev)
     console.error(err.stack) 
    else
     console.error(err.message)
   }),

 set_cache: async ( key, value ) => {
  const result = await redis.set( key, value, (err, reply) => {
    if (err) console.log(err);
    console.log(reply);
  })
  console.log('Redis set Data', result)
  redis.disconnect()
 },

 get_cache: async ( key ) => {
  const result = await redis.get( key, (err, reply) => {
    if (err) console.log(err);
      console.log(reply);
  });
  console.log('Redis get Data', result)
  redis.disconnect()
 }


}