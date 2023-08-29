import { Student } from "../../domain/Student";
import { IStudentRepository } from "../../repositories/IStudentRepository";
import { ICreateStudentRequestDTO } from "./createStudentDTO";

type errorMessages = {
  email: string;
  username: string;
}
export class CreateStudent {
  constructor(
    private studentRepository: IStudentRepository
  ) { }

  async execute(data: ICreateStudentRequestDTO) {

    const userEmailAlreadyExists = await this.studentRepository.findByEmail(data.email);
    if (userEmailAlreadyExists) {
      throw new Error('Usuário com este e-mail já existe');
    }
    const userUsernameAlreadyExists = await this.studentRepository.findByUser(data.username);
    if (userUsernameAlreadyExists) {
      throw new Error('Usuário com este nome de usuário já existe');
    }

    const student = new Student(data)

    await this.studentRepository.create(student);
  }
}