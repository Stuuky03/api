import { Course, Question, Student, Tag } from "@prisma/client"
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
    t.field('course', {
      type: 'Course',
      resolve: async (parent, _, { prisma }): Promise<Course> => {
        const course = await prisma.course.findUnique({
          where: { id: parent.courseId },
        })

        return course
      }
    })
    t.nonNull.list.nonNull.field('tags', {
      type: 'Tag',
      nullable: true,
      resolve: async (parent, _, { prisma }): Promise<Tag[]> => {
        const rawTags = await prisma.tagsOnPosts.findMany({
          where: { stuukeId: parent.id },
          select: {
            tag: true
          }
        })
        return rawTags.map(rawTag => rawTag.tag);
      }
    })
    t.nonNull.field('student', {
      type: 'Student',
      resolve: async (parent, _, { prisma }): Promise<Student> => {
        const student = await prisma.student.findUnique({
          where: { id: parent.studentId }
        })

        return student
      }
    })
    t.field('question', {
      type: 'Question',
      resolve: async (parent, _, { prisma }): Promise<Question> => {
        const question = await prisma.question.findUnique({
          where: { id: parent.questionId }
        })

        return question
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