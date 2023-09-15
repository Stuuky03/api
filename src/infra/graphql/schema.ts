import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, makeSchema, objectType, queryType } from "nexus";
import { join } from "path";
import { Context } from "./context";

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = queryType({
  definition(t) {
    t.list.field('allStudents', {
      type: 'Student',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.student.findMany()
      }
    })
  }
})

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
      type: 'Badge',
      resolve: (parent, _, context) => {
        return 'My Badges'
      }
    })
    t.list.field('stuukes', {
      type: 'Stuuke',
      resolve: (parent, _, context) => {
        return "my Stuukes"
      }
    })
    t.list.field('questions', {
      type: 'Question',
      resolve: (parent, _, context) => {
        return "My Questions"
      }
    })
  },
})

const Badge = objectType({
  name: "Badge",
  definition(t) {
    t.id('id')
    t.string('title')
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
      resolve: (parent, _, context) => {
        return "Stuuky Author"
      }
    })
    t.nonNull.field('question', {
      type: 'Question',
      resolve: (parent, _, context) => {
        return "This Stuuke Question"
      }
    })
    t.list.field('references', {
      type: 'Reference',
      resolve: (parent, _, context) => {
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
      resolve: (parent, _, context) => {
        return "Stuuky Author"
      }
    })
    t.nonNull.field('stuukes', {
      type: 'Stuuke',
      resolve: (parent, _, context) => {
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
      resolve: (parent, _, context) => {
        return "This Stuuke References"
      }
    })
  }
})

export const schema = makeSchema({
  types: [
    Student,
    Badge,
    Question,
    Reference,
    Stuuke,
    DateTime,
    Query
  ],
  outputs: {
    schema: join(__dirname, '../graphql/', 'schema.graphql')
  },
  contextType: {
    module: require.resolve('./context.ts'),
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prismaClient',
      },
    ],
  },
})