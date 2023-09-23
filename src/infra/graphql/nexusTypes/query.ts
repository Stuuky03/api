import { Console } from "console"
import { nullable, queryType, stringArg } from "nexus"

const Query = queryType({
  definition(t) {
    t.list.field('allStudents', {
      type: 'Student',
      resolve: (_parent, _args, context) => {
        return context.prisma.student.findMany()
      }
    })

    t.nonNull.list.nonNull.field('questionFeed', {
      type: 'Question',
      resolve: (_parent, args, { prisma }) => {
        return prisma.question.findMany({
          where: {
            isDraft: false,
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('stuukeFeed', {
      type: 'Stuuke',
      resolve: (_parent, args, { prisma }) => {
        return prisma.stuuke.findMany({
          where: {
            isDraft: false,
          },
        })
      },
    })

    t.nonNull.field('questionById', {
      type: 'Question',
      args: {
        id: stringArg()
      },
      resolve: async (_parent, args, { prisma }) => {
        return await prisma.question.findUnique({
          where: {
            id: args.id || undefined,
            isDraft: false
          }
        })
      }
    })
  },
})



export default { Query }