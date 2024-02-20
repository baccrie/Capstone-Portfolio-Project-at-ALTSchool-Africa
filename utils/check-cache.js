const connectRedis = require('../db/redis');

const cache = async (name, query) => {
  const redisClient = await connectRedis();

  const redisData = await query;
  redisClient.set(name, JSON.stringify(redisData));
};

module.exports = cache;
