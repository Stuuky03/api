import { StudentCourse as PersistenceStudentCourse } from "@prisma/client"
import { StudentCourse } from "../domain/StudentCourse"

export class StudentCourseMapper {
  static toDomain(raw: PersistenceStudentCourse): StudentCourse {
    const studentCourse = StudentCourse.create({
      courseId: raw.courseId,
      studentId: raw.studentId,
    }, raw.id)

    return studentCourse
  }

  static toPersistence(studentCourse: StudentCourse) {
    return {
      id: studentCourse.id,
      courseId: studentCourse.courseId,
      studentId: studentCourse.studentId,
    }
  }
}