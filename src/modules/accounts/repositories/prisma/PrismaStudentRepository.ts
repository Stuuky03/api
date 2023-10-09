import { IStudentCoursesRepository } from './../IStudentCoursesRepository';
import { PrismaClient } from "@prisma/client";
import { IStudentRepository } from "../../repositories/IStudentRepository";
import { Student } from "../../domain/Student";
import { StudentMapper } from "../../mappers/StudentMapper";

const prisma = new PrismaClient({
  log: ["query"]
})

export class PrismaStudentRepository implements IStudentRepository {
  constructor(private studentCoursesRepository: IStudentCoursesRepository) { }

  async findByEmail(email: string): Promise<boolean> {
    const user = await prisma.student.findFirst({
      where: { email }
    })

    return user ? true : false
  }

  async findByUsername(username: string): Promise<boolean> {
    const user = await prisma.student.findFirst({
      where: { username }
    })

    return user ? true : false
  }

  async findById(id: string): Promise<Student | null> {
    const user = await prisma.student.findFirst({
      where: { id }
    })

    if (!user) {
      return null
    }

    const data = StudentMapper.toDomain(user)

    return data
  }

  async save(Student: Student): Promise<void> {

  }

  async create(student: Student): Promise<void> {
    const data = StudentMapper.toPersistence(student)

    await prisma.student.create({
      data: {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        bio: data.bio,
        points: data.points,
        stuukesCount: data.stuukesCount,
        questionsCount: data.questionsCount,
      }
    })

    if (student.courses) {
      await this.studentCoursesRepository.create(student.courses)
    }
  }
}