import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
const { PrismaClient } = require('@prisma/client')

const app = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

const schema = `
  type General {
    createUser(username: String!, email: String!, password: String!): Student
    Stuuke(id: String!): Student
  }

  type Student {
    username: String
    email: String, 
    password: String
  }

  type Query{
    students: [Student]
    stuukes: [Stuuke]
  }
`

const resolvers = {
  Query: {
    students: async ( prisma ) => {
      return prisma.student.findMany({
        where:{
          Stuuke: true
        }
      })
    },
    stuukes: async ( prisma ) => {
      return await  prisma.student.findMany({
        where: {
          Stuuke : false
        }
      })
    }
  }
}

app.register(cors, {
  origin: true,
});

app.register(mercurius, {})

export { app };