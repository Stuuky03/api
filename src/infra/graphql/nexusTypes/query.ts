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
      args: {
        searchString: nullable(stringArg()),
        course: nullable(stringArg()),
        tags: nullable(stringArg()),
      },
      resolve: (_parent, args, { prisma }) => {
        const or = args.searchString
          ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
            ],
          }
          : {}

        console.log("TIPOOOOO: " + typeof (args.course))

        return prisma.question.findMany({
          // select: {
          //   courses: {
          //     where: {
          //       OR: [
          //         { name: args.course || undefined }
          //       ],
          //     }
          //   },
          //   tags: {
          //     where: {
          //       OR: [
          //         { name: args.tags || undefined }
          //       ]
          //     }
          //   }
          // },
          where: {
            isDraft: false,
            ...or,
          },
        })
      },
    })
  },
})



export default { Query }