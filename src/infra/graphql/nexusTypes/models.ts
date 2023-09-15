import { DateTimeResolver } from "graphql-scalars"
import { asNexusMethod, objectType } from "nexus"

const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Student = objectType({
  name: "Student",
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.string('bio')
    t.int('leaderBoardPosition')
    t.int('badgesCount')
    t.int('stuukesCount')
    t.int('questionsCount')
    t.list.field('badges', {
      type: 'StudentBadge',
      resolve: async (parent, _, context) => {
        return await context.prisma.studentBadges.findMany({
          where: {
            studentId: parent.id,
          },
        });
      }
    })
    t.list.field('stuukes', {
      type: 'Stuuke',
      resolve: async (parent, _, context) => {
        return await context.prisma.stuuke.findMany({
          where: { studentId: parent.id }
        })
      }
    })
    t.list.field('questions', {
      type: 'Question',
      resolve: async (parent, _, context) => {
        return "My Questions"
      }
    })
  },
})

const StudentBadge = objectType({
  name: "StudentBadge",
  definition(t) {
    t.nonNull.field('earnedAt', { type: 'DateTime' })
    t.nonNull.string('badgeId')
    t.field('student', {
      type: 'Student',
      resolve: async (parent, _, context) => {
        return "Student Winner"
      }
    })
    t.field('badgeInfo', {
      type: 'BadgeInfo',
      resolve: async (parent, _, context) => {
        return await context.prisma.badge.findUnique({
          where: { id: parent.badgeId }
        })
      }
    })
  },
})

const BadgeInfo = objectType({
  name: "BadgeInfo",
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('description')
    t.string('imageUrl')
  }
})

const Stuuke = objectType({
  name: 'Stuuke',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.boolean('isDraft')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('author', {
      type: 'Student',
      resolve: async (parent, _, context) => {
        return "Stuuky Author"
      }
    })
    t.nonNull.field('question', {
      type: 'Question',
      resolve: async (parent, _, context) => {
        return "This Stuuke Question"
      }
    })
    t.list.field('references', {
      type: 'Reference',
      resolve: async (parent, _, context) => {
        return "Stuuke References"
      }
    })
  }
})
const Question = objectType({
  name: 'Question',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.boolean('isDraft')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('author', {
      type: 'Student',
      resolve: async (parent, _, context) => {
        return "Stuuky Author"
      }
    })
    t.nonNull.field('stuukes', {
      type: 'Stuuke',
      resolve: async (parent, _, context) => {
        return "This Question Stuukes"
      }
    })
  }
})

const Reference = objectType({
  name: 'Reference',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('url')
    t.nonNull.field('stuuke', {
      type: 'Stuuke',
      resolve: async (parent, _, context) => {
        return "This Stuuke References"
      }
    })
  }
})

export default { Student, Stuuke, Question, BadgeInfo, Reference, StudentBadge, DateTime }