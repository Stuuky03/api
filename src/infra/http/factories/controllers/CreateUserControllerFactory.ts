import { PrismaStudentRepository } from "@/modules/accounts/repositories/prisma/PrismaStudentRepository";
import { CreateStudent } from "@/modules/accounts/useCases/createUser/createStudent";
import { CreateStudentController } from "@/modules/accounts/useCases/createUser/createStudentController";

const prismaStudentRepository = new PrismaStudentRepository();

const createStudent = new CreateStudent(prismaStudentRepository);

const createStudentController = new CreateStudentController(createStudent);

export { createStudentController };