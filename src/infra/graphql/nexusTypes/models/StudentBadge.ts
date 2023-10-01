import { objectType } from "nexus"

const StudentBadge = objectType({
  name: "StudentBadge",
  definition(t) {
    t.nonNull.field('earnedAt', { type: 'DateTime' })
    t.nonNull.string('badgeId')
    t.nonNull.string('studentId')
    t.field('student', {
      type: 'Student',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.student.findUnique({
          where: { id: parent.studentId }
        })
      }
    })
    t.field('badgeInfo', {
      type: 'BadgeInfo',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.badge.findUnique({
          where: { id: parent.badgeId }
        })
      }
    })
  },
})

export default { StudentBadge }