import Fastify from "fastify";
import cors from "@fastify/cors";
import { ApolloServer, BaseContext } from "@apollo/server";
import fastifyApollo, { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import { fastifyApolloHandler } from "@as-integrations/fastify";
import { gql } from "apollo-server";
import { Student } from "./modules/Student";

const app = Fastify({
  logger: true,
})

async function Bootstrap(){
  
  const typeDefs = gql`
  type Student {
    id: String
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    profileImgUrl: String
    description: String
  }
  type Query {
    student: [Student]
  }
  `
  
  const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers:{
      Query: {
        student: () => Student
      }
    },
    plugins: [fastifyApolloDrainPlugin(app)],
  });
  
  await apollo.start();
  
  app.register(cors, {
    origin: true,
  });
  
  app.register(
    fastifyApollo(apollo)
  );

  app.route({
    url: "/graphql",
    method: ["POST", "OPTIONS"],
    handler: fastifyApolloHandler(apollo),
  });
}

export { app };