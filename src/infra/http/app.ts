import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import { schema } from "../graphql/schema";
import { context } from "../graphql/context";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: true,
});

app.register(mercurius, {
  schema,
  graphiql: true,
  context: () => context,
})

export { app };