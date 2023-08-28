import { SqlLiteStudentRepository } from "./repositories/implementatios/SqlLiteStudentRepository";
import { CreateStudent } from "./useCases/createUser/createStudent";
import { CreateStudentController } from "./useCases/createUser/createStudentController";

const sqlLiteStudentRepository = new SqlLiteStudentRepository();

const createStudentUseCase = new CreateStudent(
  sqlLiteStudentRepository,
);

const createStudentController = new CreateStudentController(
  createStudentUseCase,
);

export { createStudentUseCase, createStudentController };