import Express, { Request, Response } from "express";
import { Redis } from "ioredis";
const app = Express();
const PORT: number = 8000;

//sentinel Nodes
const sentinelNodes = [
  {
    host: "test-redis-node-0.test-redis-headless.em-svc-dev.svc.cluster.local",
    port: 26379,
  },
  {
    host: "test-redis-node-1.test-redis-headless.em-svc-dev.svc.cluster.local",
    port: 26379,
  },
];
//redis client
const redisClient = new Redis({
  sentinels: sentinelNodes,
  name: "mymaster",
});

setInterval(async () => {
  await redisClient.set("timeStamp", new Date().toISOString());
}, 5000);

async function getTimeStampFromRedis() {
  return await redisClient.get("timeStamp");
}
//get data

app.get("/station", async (req: Request, res: Response) => {
  const redisTimeStamp = await getTimeStampFromRedis();

  return res.status(200).json({
    success: true,
    data: redisTimeStamp,
  });
});

//catch all routes
app.use("*", (req: Request, res: Response) => {
  return res.status(400).send("Invalid routes, please try later");
});

//listen for incomming requests
app.listen(PORT, () => {
  console.log("Server running");
});
