import { Student } from "../../modules/Student";
import { IStudentRepository } from "../../repositories/IStudentRepository";
import { ICreateStudentRequestDTO } from "./createStudentDTO";

export class CreateStudent {
  constructor(
    private studentRepository: IStudentRepository
  ) { }

  async execute(data: ICreateStudentRequestDTO) {
    const userAlreadyExists = await this.studentRepository.findByEmail(data.email);
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const student = new Student(data)

    await this.studentRepository.create(student);
  }
}