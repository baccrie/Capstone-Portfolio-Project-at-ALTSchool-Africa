import redis from 'redis'

export default async function connectRD() {
  let redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });
  redisClient.on('error', (error) =>
    console.error(`Error : ${error} from redis connection....`)
  );
  redisClient = await redisClient.connect();
  return redisClient;
}
