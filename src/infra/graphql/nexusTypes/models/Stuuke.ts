import { objectType } from "nexus"

const Stuuke = objectType({
  name: 'Stuuke',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.boolean('isDraft')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.string('studentId')
    t.nonNull.string('questionId')
    t.nonNull.string('courseId')
    t.nonNull.field('course', {
      type: 'Course',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.course.findUnique({
          where: { name: parent.courseId }
        })
      }
    })
    t.nonNull.list.nonNull.field('tags', {
      type: 'Tag',
      nullable: true,
      resolve: async (parent, _, { prisma }) => {
        const tagsOnPosts = await prisma.tagsOnPosts.findMany({
          where: { stuukeId: parent.id },
          select: {
            tag: true
          }
        })
        return tagsOnPosts.map(tagOnPost => tagOnPost.tag);
      }
    })
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
    t.nonNull.list.nonNull.field('references', {
      type: 'Reference',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.stuukeReferences.findMany({
          where: { stuukeId: parent.id }
        })
      }
    })
  }
})

export default { Stuuke }