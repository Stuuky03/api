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
    console.log(`data execute: ${JSON.stringify(data)}`);

    const emailAlreadyExists = await this.studentRepository.findByEmail(data.email);
    if (emailAlreadyExists) {
      throw new Error('Usuário com este e-mail já existe');
    }
    const usernameAlreadyExists = await this.studentRepository.findByUser(data.username);
    if (usernameAlreadyExists) {
      throw new Error('Usuário com este nome de usuário já existe');
    }

    const student = new Student(data)

    await this.studentRepository.create(student);
  }
}