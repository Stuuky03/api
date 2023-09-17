import { queryType } from "nexus"

const Query = queryType({
  definition(t) {
    t.list.field('allStudents', {
      type: 'Student',
      resolve: (_parent, _args, context) => {
        return context.prisma.student.findMany()
      }
    })

    t.list.field('points',{
      type: 'Student',
      resolve: (_parent, _args, context) => {
        return context.prisma.studentPoints.findMany()
      }
    })

    t.list.field('badges', {
      type: 'Student',
      resolve: (_parent, _args, context) => {
        return context.prisma.studentBadges.findMany()
      }
    })
  }
})



export default { Query }