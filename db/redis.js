const redis = require('redis');

const connectRedis = async () => {
  const redisClient = redis.createClient();
  redisClient.on('error', (error) =>
    console.error(`Error : ${error} from redis connection....`)
  );
  await redisClient.connect();

  return redisClient;
};

module.exports = connectRedis;
