import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
})

app.register(cors, {
  origin: true,
});

export { app };