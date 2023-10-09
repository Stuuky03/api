import { Controller } from "@/core/infra/Controller";
import { PrismaStudentCoursesRepository } from "@/modules/accounts/repositories/prisma/PrismaStudentCoursesRepository";
import { PrismaStudentRepository } from "@/modules/accounts/repositories/prisma/PrismaStudentRepository";
import { RegisterStudent } from "@/modules/accounts/useCases/RegisterStudent/RegisterStudent";
import { RegisterStudentController } from "@/modules/accounts/useCases/RegisterStudent/RegisterStudentController";


export function makeCreateStudentController(): Controller {
  const studentCourseRepository = new PrismaStudentCoursesRepository()
  const prismaStudentRepository = new PrismaStudentRepository(studentCourseRepository);
  const registerStudent = new RegisterStudent(prismaStudentRepository);
  const registerStudentController = new RegisterStudentController(registerStudent);
  return registerStudentController;
}