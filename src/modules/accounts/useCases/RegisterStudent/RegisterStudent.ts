import { Password } from "../../domain/Password";
import { Student } from "../../domain/Student";
import { StudentMapper } from "../../mappers/StudentMapper";
import { IStudentRepository } from "../../repositories/IStudentRepository";
import { IRegisterStudentRequestDTO } from "./RegisterStudentDTO";
import bcrypt from 'bcrypt';

export class RegisterStudent {
  constructor(
    private studentRepository: IStudentRepository
  ) { }

  async execute(data: IRegisterStudentRequestDTO) {
    console.log(`data execute: ${JSON.stringify(data)}`);

    const emailAlreadyExists = await this.studentRepository.findByEmail(data.email);
    if (emailAlreadyExists) {
      throw new Error('Usuário com este e-mail já existe');
    }
    const usernameAlreadyExists = await this.studentRepository.findByUsername(data.username);
    if (usernameAlreadyExists) {
      throw new Error('Usuário com este nome de usuário já existe');
    }

    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)

    const password = new Password(hashedPassword)

    const student = Student.create({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: password
    })

    await this.studentRepository.create(student);

    const studentPersistence = StudentMapper.toPersistence(student)

    return studentPersistence
  }
}