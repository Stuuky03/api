import { objectType } from "nexus"

const Question = objectType({
  name: 'Question',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.boolean('isDraft')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.string('studentId')
    t.nonNull.string('courseId')
    t.nonNull.field('course', {
      type: 'Course',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.course.findUnique({
          where: { name: parent.courseId }
        })
      }
    })
    t.nonNull.field('tags', {
      type: 'Tag',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.tagsOnPosts.findMany({
          where: { stuukeId: parent.id }
        })
      }
    })
    t.nonNull.field('student', {
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

export default { Question }