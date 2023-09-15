import { queryType } from "nexus"

const Query = queryType({
  definition(t) {
    t.list.field('allStudents', {
      type: 'Student',
      resolve: (_parent, _args, context) => {
        return context.prisma.student.findMany()
      }
    })
  }
})

export default { Query }