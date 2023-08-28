import { PrismaClient } from "@prisma/client";
import { IStudentRepository } from "../IStudentRepository";
import { Student } from "../../modules/Student";

const prisma = new PrismaClient({
  log: ["query"]
})

export class SqlLiteStudentRepository implements IStudentRepository {
  async findByEmail(email: string): Promise<boolean> {
    const user = await prisma.student.findFirst({
      where: { email },
    })

    return user ? true : false
  }

  async save(Student: Student): Promise<void> {

  }

  async create(Student: Student): Promise<void> {
    await prisma.student.create({
      data: {
        id: Student.id,
        username: Student.username,
        email: Student.email,
        password: Student.password,
      }
    })
  }
}