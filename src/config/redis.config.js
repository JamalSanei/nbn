require("dotenv").config();
const { env } = process;
const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient({
  host: env.redis_host,
  port: env.redis_port,
});

const password = env.redis_password || null;
if (password && password != "null") {
  redisClient.auth(password, (err, res) => {
    console.log("res", res);
    console.log("err", err);
  });
}

try {
  redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
  redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
  redisClient.lpushAsync = promisify(redisClient.lpush).bind(redisClient);
  redisClient.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
  redisClient.llenAsync = promisify(redisClient.llen).bind(redisClient);
  redisClient.lremAsync = promisify(redisClient.lrem).bind(redisClient);
  redisClient.lsetAsync = promisify(redisClient.lset).bind(redisClient);
  redisClient.hmsetAsync = promisify(redisClient.hmset).bind(redisClient);
  redisClient.hmgetAsync = promisify(redisClient.hmget).bind(redisClient);
  redisClient.clear = promisify(redisClient.del).bind(redisClient);
} catch (e) {
  console.log("redis error", e);
}
redisClient.on("connected", function () {
  console.log("Redis is connected");
});
redisClient.on("error", function (err) {
  console.log("Redis error.", err);
});
global.cache = redisClient;
module.exports = redisClient;
