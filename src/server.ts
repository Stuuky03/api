import { FastifyRequest, FastifyReply } from "fastify";
import { app } from "./app";
import { env } from "./env";
import { createStudentController } from "./index";

app.get("/", () => {
  return "Server running!";
})

app.post("/user/create", (request: FastifyRequest, reply: FastifyReply) => {
  return createStudentController.handle(request, reply)
})

app.listen({ port: env.PORT, host: env.HOST }).then(() => console.log('Serving is running on port ' + env.PORT));