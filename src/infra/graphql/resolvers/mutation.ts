import { makeCreateQuestionController } from "@/infra/http/factories/controllers/CreateQuestionControllerFactory";
import { makeCreateStudentController } from "@/infra/http/factories/controllers/CreateStudentControllerFactory";
import { Student as StudentRaw, Question as QuestionRaw, Stuuke as StuukeRaw } from "@prisma/client";
import { arg, inputObjectType, mutationType, nonNull } from "nexus";
import bcrypt from "bcrypt"
import { AuthResponse } from "@/core/infra/AuthResponse";
import { createId } from "@paralleldrive/cuid2";

const Mutation = mutationType({
  definition(t) {
    t.field('signupStudent', {
      type: 'Student',
      args: {
        data: nonNull(
          arg({
            type: 'CreateStudentInput'
          })
        )
      },
      resolve: async (_parent, { data }, { prisma }): Promise<StudentRaw> => {
        const student = await (await makeCreateStudentController().handle(data)).data

        return student
      }
    })

    t.field('createQuestion', {
      type: 'Question',
      args: {
        data: nonNull(
          arg({
            type: 'CreateQuestionInput'
          })
        )
      },
      resolve: async (_parent, { data }, { prisma }): Promise<QuestionRaw> => {
        const question = await (await makeCreateQuestionController().handle(data)).data

        return question
      }
    })

    t.field('createStuuke', {
      type: 'Stuuke',
      args: {
        data: nonNull(
          arg({
            type: 'CreateStuukeInput'
          })
        )
      },
      resolve: async (_parent, { data }, { prisma }): Promise<StuukeRaw | null> => {

        const contentEncoded = Buffer.from(data.content).toString("base64")
        const course = await prisma.course.findFirst({
          where: {
            title: data.courseId
          },
          select: {
            id: true
          }
        })
        if (course === null) return null

        const newStuuke: StuukeRaw = {
          id: createId(),
          title: data.title,
          content: contentEncoded,
          createdAt: data.createdAt,
          isDraft: data.isDraft,
          courseId: course.id,
          questionId: data.questionId,
          studentId: data.studentId
        }

        data.tags.forEach(async tagId => {
          const tagsOnPostId = await prisma.tagsOnPosts.findFirst({
            where: {
              AND: [
                {
                  tag: {
                    title: tagId
                  }
                },
                {
                  questionId: newStuuke.questionId
                }
              ]
            },
            select: {
              id: true
            }
          })

          if (tagsOnPostId === null) return null

          console.log(tagsOnPostId)
          console.log(newStuuke.id)

          const tagOnPost = await prisma.tagsOnPosts.update({
            where: {
              id: tagsOnPostId.id
            },
            data: {
              stuukeId: newStuuke.id
            }
          })
        })

        const stuuke = await prisma.stuuke.create({
          data: {
            id: newStuuke.id,
            title: newStuuke.title,
            content: newStuuke.content,
            createdAt: newStuuke.createdAt,
            studentId: newStuuke.studentId,
            isDraft: newStuuke.isDraft,
            courseId: newStuuke.courseId,
            questionId: newStuuke.questionId,
          }
        })

        return stuuke
      }
    })

    t.field('signinStudent', {
      type: 'Student',
      args: {
        data: nonNull(
          arg({
            type: 'SignInStudentInput'
          })
        )
      },
      resolve: async (_parent, { data }, { prisma }): Promise<AuthResponse | null> => {
        const passwordHash = await prisma.student.findFirst({
          where: {
            OR: [
              {
                email: data.emailOrUsername
              },
              {
                username: data.emailOrUsername
              }
            ]
          },
          select: {
            password: true
          }
        })

        if (passwordHash?.password === null || passwordHash?.password === undefined) return null
        const match = await bcrypt.compare(data.password, passwordHash.password)

        if (match) {
          const student = await prisma.student.findFirst({
            where: {
              OR: [
                {
                  email: data.emailOrUsername
                },
                {
                  username: data.emailOrUsername
                }
              ]
            },
          })

          if (student === null || student === undefined) return null

          return student
        }
      }
    })
  }
})

export const SignInStudentInput = inputObjectType({
  name: 'SignInStudentInput',
  definition(t) {
    t.nonNull.string('emailOrUsername')
    t.nonNull.string('password')
  }
})

export const UserCreateInput = inputObjectType({
  name: 'CreateStudentInput',
  definition(t) {
    t.nonNull.string('username');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.string('password');
  }
})

export const CreateQuestionInput = inputObjectType({
  name: 'CreateQuestionInput',
  definition(t) {
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.boolean('isDraft')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.string('studentId')
    t.nonNull.string('courseId')
    t.nonNull.list.nonNull.string('tags');
  }
})
export const CreateStuukeInput = inputObjectType({
  name: 'CreateStuukeInput',
  definition(t) {
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.boolean('isDraft')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.string('studentId')
    t.nonNull.string('courseId')
    t.nonNull.string('questionId')
    t.nonNull.list.nonNull.string('tags');
  }
})

export default { Mutation, UserCreateInput, CreateQuestionInput, CreateStuukeInput }