import fastify from "fastify";
import { FastifyRequest } from "fastify";
import { app } from "./app";
require ("dotenv").config();

app.get("/", () => {
  return "Server running!";
})

app.post("/user/create", ( request:FastifyRequest ) => {
  const reply = JSON.stringify(request.body);
  return reply;
})
 
const port = process.env.PORT;
const host = process.env.HOST;

app.listen({ port: Number(port), host: String(host) }).then(() => console.log('Serving is running on port ' + port));