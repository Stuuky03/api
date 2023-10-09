import { StudentCourses } from "../domain/StudentCourses";

export interface IStudentCoursesRepository {
  save(studentCourses: StudentCourses): Promise<void>;
  create(studentCourses: StudentCourses): Promise<void>;
}