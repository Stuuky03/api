import { Entity } from "@/core/domain/Entity";

interface IStudentCourseProps {
  courseId: string,
  studentId: string,
}

export class StudentCourse extends Entity<IStudentCourseProps> {
  get courseId() {
    return this.props.courseId;
  }

  get studentId() {
    return this.props.studentId;
  }

  private constructor(props: IStudentCourseProps, id?: string) {
    super(props, id)
  }

  static create(props: IStudentCourseProps, id: string): StudentCourse {
    const studentCourse = new StudentCourse(props, id)

    return studentCourse
  }
}