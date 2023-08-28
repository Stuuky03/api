import fastify from "fastify";
import { FastifyRequest } from "fastify";
import { app } from "./app";
import { env } from "./env";

app.get("/", () => {
  return "Server running!";
})

app.post("/user/create", (request: FastifyRequest) => {
  const reply = JSON.stringify(request.body);
  return reply;
})

app.listen({ port: env.PORT, host: env.HOST }).then(() => console.log('Serving is running on port ' + env.PORT));