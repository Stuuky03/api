import { adaptResolver } from "@/core/infra/adapters/NexusResolver";
import { makeCreateStudentController } from "@/infra/http/factories/controllers/CreateStudentControllerFactory";
import { Password } from "@/modules/accounts/domain/Password";
import { Student } from "@/modules/accounts/domain/Student";
import { StudentMapper } from "@/modules/accounts/mappers/StudentMapper";
import { Student as StudentRaw } from "@prisma/client";
import { arg, inputObjectType, mutationType, nonNull } from "nexus";

const Mutation = mutationType({
  definition(t) {
    t.field('signupStudent', {
      type: 'Student',
      args: {
        data: nonNull(
          arg({
            type: 'UserCreateInput'
          })
        )
      },
      resolve: async (_parent, args, { prisma }): Promise<StudentRaw> => {
        const password = new Password(args.data.password)

        const student = Student.create({
          username: args.data.username,
          firstName: args.data.firstName,
          lastName: args.data.lastName,
          email: args.data.email,
          password: password
        })

        const dataS = StudentMapper.toPersistence(student)

        const studentt = await prisma.student.create({
          data: {
            id: dataS.id,
            username: dataS.username,
            firstName: dataS.firstName,
            lastName: dataS.lastName,
            email: dataS.email,
            password: dataS.password,
            bio: dataS.bio,
            points: dataS.points,
            stuukesCount: dataS.stuukesCount,
            questionsCount: dataS.questionsCount,
          }
        })

        return studentt
      }
    })


  }
})

export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('username');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.string('password');
  }
})

export default { Mutation, UserCreateInput }