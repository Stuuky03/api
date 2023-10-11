import { Student as PersistenceStudent } from "@prisma/client"
import { Student } from "../domain/Student";
import { Password } from "../domain/Password";

export class StudentMapper {
  static toDomain(raw: PersistenceStudent): Student {
    const password = new Password(raw.password)

    const student = Student.create({
      username: raw.username,
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      password: password,
      points: raw.points,
      stuukesCount: raw.stuukesCount,
      questionsCount: raw.questionsCount,
    }, raw.id)

    return student
  }

  static toPersistence(student: Student) {
    return {
      id: student.id,
      username: student.username,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: student.password.value,
      points: student.points,
      stuukesCount: student.stuukesCount,
      questionsCount: student.questionsCount,
    }
  }
}