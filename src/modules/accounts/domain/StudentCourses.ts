import { WatchedList } from "@/core/domain/WatchedList";
import { StudentCourse } from "./StudentCourse";


export class StudentCourses extends WatchedList<StudentCourse> {
  private constructor(courses: StudentCourse[]) {
    super(courses)
  }

  public compareItems(a: StudentCourse, b: StudentCourse): boolean {
    return a.equals(b)
  }

  static create(courses: StudentCourse[]): StudentCourses {
    const studentCourses = new StudentCourses(courses)

    return studentCourses
  }
}