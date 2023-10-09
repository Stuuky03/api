import { Course, Student, Stuuke, Tag } from "@prisma/client"
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
      resolve: async (parent, _, { prisma }): Promise<Course> => {
        const course = await prisma.course.findUnique({
          where: { id: parent.courseId }
        })

        return course
      }
    })
    t.nonNull.list.nonNull.field('tags', {
      type: 'Tag',
      resolve: async (parent, _, { prisma }): Promise<Tag[]> => {
        const tagsOnPosts = await prisma.tagsOnPosts.findMany({
          where: { questionId: parent.id },
          select: {
            tag: true
          }
        })
        return tagsOnPosts.map(tagOnPost => tagOnPost.tag);
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
    t.nonNull.list.nonNull.field('stuukes', {
      type: 'Stuuke',
      resolve: async (parent, _, { prisma }): Promise<Stuuke[]> => {
        const stuukes = await prisma.stuuke.findMany({
          where: { questionId: parent.id }
        })

        return stuukes
      }
    })
  }
})

export default { Question }