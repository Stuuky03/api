import { PrismaClient } from "@prisma/client";
import { StudentCourses } from "../../domain/StudentCourses";
import { StudentCourseMapper } from "../../mappers/StudentCourseMapper";
import { IStudentCoursesRepository } from "../IStudentCoursesRepository";

const prisma = new PrismaClient({
  log: ["query"]
})

export class PrismaStudentCoursesRepository implements IStudentCoursesRepository {
  async save(studentCourses: StudentCourses): Promise<void> {

  }

  async create(studentCourses: StudentCourses): Promise<void> {
    const data = studentCourses
      .getItems()
      .map(studentCourse => StudentCourseMapper.toPersistence(studentCourse))

    data.forEach((studentCourse) => {
      prisma.studentCourse.create({
        data: {
          id: studentCourse.id,
          courseId: studentCourse.courseId,
          studentId: studentCourse.studentId,
        }
      })
    })

  }
}