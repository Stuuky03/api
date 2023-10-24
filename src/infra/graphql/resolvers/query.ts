import { queryType, stringArg } from "nexus"

const Query = queryType({
  definition(t) {
    t.list.field('allStudents', {
      type: 'Student',
      resolve: async (_parent, _args, context) => {
        return await context.prisma.student.findMany()
      }
    })

    t.nonNull.list.nonNull.field('questionFeed', {
      type: 'Question',
      resolve: async (_parent, args, { prisma }) => {
        return await prisma.question.findMany({
          where: {
            isDraft: false,
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('stuukeFeed', {
      type: 'Stuuke',
      resolve: async (_parent, args, { prisma }) => {
        return await prisma.stuuke.findMany({
          where: {
            isDraft: false,
          },
        })
      },
    })

    t.field('questionById', {
      type: 'Question',
      args: {
        id: stringArg()
      },
      resolve: async (_parent, args, { prisma }) => {
        return await prisma.question.findUnique({
          where: {
            id: args.id ?? undefined,
            isDraft: false
          }
        })
      }
    })
  },
})



export default { Query }