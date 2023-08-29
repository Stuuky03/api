import { FastifyRequest, FastifyReply } from "fastify";
import { app } from "./app";
import { env } from "@/config/env";
import { makeCreateStudentController } from "./factories/controllers/CreateStudentControllerFactory";
import { adaptRoute } from "@/core/infra/adapters/FastifyRouteAdapter";

app.get("/", () => {
  return "Server running!";
})

app.post("/user/create", adaptRoute(makeCreateStudentController()))

app.listen({ port: env.PORT, host: env.HOST }).then(() => console.log('Serving is running on port ' + env.PORT));