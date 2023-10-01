import { objectType } from "nexus"

const Student = objectType({
  name: "Student",
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('bio')
    t.nonNull.int('leaderBoardPosition')
    t.nonNull.int('badgesCount')
    t.nonNull.int('stuukesCount')
    t.nonNull.int('questionsCount')
    t.nonNull.field('courses', {
      type: 'Course',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.studentCourse.findMany({
          where: {
            studentId: parent.id
          }
        })
      }
    })
    t.nonNull.list.nonNull.field('badges', {
      type: 'StudentBadge',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.studentBadges.findMany({
          where: {
            studentId: parent.id,
          },
        });
      }
    })
    t.nonNull.list.nonNull.field('stuukes', {
      type: 'Stuuke',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.stuuke.findMany({
          where: { studentId: parent.id }
        })
      }
    })
    t.nonNull.list.nonNull.field('questions', {
      type: 'Question',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.question.findMany({
          where: { studentId: parent.id }
        })
      }
    })
  },
})

export default { Student }