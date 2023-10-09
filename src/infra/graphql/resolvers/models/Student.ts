import { Course, Question, StudentCourse, Stuuke } from "@prisma/client"
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
    t.string('bio')
    t.nonNull.int('stuukesCount')
    t.nonNull.int('questionsCount')
    t.nonNull.list.field('courses', {
      type: 'Course',
      resolve: async (parent, _, { prisma }): Promise<Course[]> => {
        const courses = await prisma.studentCourse.findMany({
          where: {
            studentId: parent.id
          },
          select: {
            course: true
          }
        })

        return courses.map(course => course.course)
      }
    })
    t.nonNull.list.field('stuukes', {
      type: 'Stuuke',
      resolve: async (parent, _, { prisma }): Promise<Stuuke[]> => {
        return await prisma.stuuke.findMany({
          where: { studentId: parent.id }
        })
      }
    })
    t.nonNull.list.field('questions', {
      type: 'Question',
      resolve: async (parent, _, { prisma }): Promise<Question[]> => {
        return await prisma.question.findMany({
          where: { studentId: parent.id }
        })
      }
    })
  },
})

export default { Student }