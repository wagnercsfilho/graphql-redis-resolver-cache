import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import redis from "redis";
import bluebird from "bluebird";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import dataloaders from "./dataloaders";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on("error", err => {
  console.log("Error " + err);
});

// Limpa os dados para testar o cache
client.flushall();

const app = express();

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
    context: { client, dataloaders: dataloaders({ client }) }
  }))
);

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(8080);
