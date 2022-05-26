
const Redis = require('ioredis');

module.exports = {

  redis: new Redis({
    host: 'dev-reserv-cluster.sr25la.ng.0001.apn2.cache.amazonaws.com',
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
  const value = await redis.set( key, value, (err, reply) => {
    if (err) throw err;
    console.log(reply);
  })
  console.log('Redis set Data', value)
  redis.disconnect()
 },

 get_cache: async ( key ) => {
  const value = await redis.get( key, (err, reply) => {
      if (err) throw err;
      console.log(reply);
  });
  console.log('Redis get Data', value)
  redis.disconnect()
 }


}