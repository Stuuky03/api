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
    t.nonNull.string('bio')
    t.nonNull.int('leaderBoardPosition')
    t.nonNull.int('badgesCount')
    t.nonNull.int('stuukesCount')
    t.nonNull.int('questionsCount')
    t.list.field('badges', {
      type: 'StudentBadge',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.studentBadges.findMany({
          where: {
            studentId: parent.id,
          },
        });
      }
    })
    t.list.field('stuukes', {
      type: 'Stuuke',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.stuuke.findMany({
          where: { studentId: parent.id }
        })
      }
    })
    t.list.field('questions', {
      type: 'Question',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.question.findMany({
          where: { studentId: parent.id }
        })
      }
    })
  },
})

const StudentBadge = objectType({
  name: "StudentBadge",
  definition(t) {
    t.nonNull.date('earnedAt')
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
    t.nonNull.date('createdAt')
    t.nonNull.string('authorId')
    t.nonNull.string('studentId')
    t.nonNull.string('questionId')
    t.nonNull.field('student', {
      type: 'Student',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.student.findUnique({
          where: { id: parent.studentId }
        })
      }
    })
    t.nonNull.field('question', {
      type: 'Question',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.question.findUnique({
          where: { id: parent.questionId }
        })
      }
    })
    t.list.field('references', {
      type: 'Reference',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.stuukeReferences.findMany({
          where: { stuukeId: parent.id }
        })
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
    t.nonNull.date('createdAt')
    t.nonNull.string('authorId')
    t.nonNull.field('author', {
      type: 'Student',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.question.findUnique({
          where: { id: parent.authorId }
        })
      }
    })
    t.nonNull.field('stuukes', {
      type: 'Stuuke',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.stuuke.findMany({
          where: { questionId: parent.id }
        })
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
    t.nonNull.string('stuukeId')
    t.nonNull.field('stuuke', {
      type: 'Stuuke',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.stuuke.findUnique({
          where: { id: parent.stuukeId }
        })
      }
    })
  }
})

export default { Student, Stuuke, Question, BadgeInfo, Reference, StudentBadge, DateTime }