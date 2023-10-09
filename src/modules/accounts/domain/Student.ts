import { Password } from "./Password";
import { Course } from "@/modules/course/domain/Course";
import { Question } from "@/modules/posts/question/domain/Question";
import { Stuuke } from "@/modules/posts/stuuke/domain/Stuuke";
import { Entity } from "@/core/domain/Entity";
import { StudentCourses } from "./StudentCourses";

interface IStudentProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: Password;
  bio?: string;
  points?: number;
  stuukes?: Stuuke[]
  stuukesCount?: number;
  questions?: Question[]
  questionsCount?: number;
  courses?: StudentCourses;
}

export class Student extends Entity<IStudentProps> {
  get username() {
    return this.props.username;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get bio() {
    return this.props.bio;
  }

  get points() {
    return this.props.points;
  }

  get stuukes() {
    return this.props.stuukes;
  }

  get stuukesCount() {
    return this.props.stuukesCount;
  }

  get questions() {
    return this.props.questions;
  }

  get questionsCount() {
    return this.props.questionsCount;
  }

  get courses() {
    return this.props.courses;
  }

  private constructor(props: IStudentProps, id?: string) {
    super(props, id)
  }

  static create(props: IStudentProps, id?: string): Student {
    const student = new Student({
      ...props,
      stuukes: props.stuukes ?? undefined,
      stuukesCount: props.stuukesCount ?? 0,
      questions: props.questions ?? undefined,
      questionsCount: props.questionsCount ?? 0,
      bio: props.bio ?? undefined,
      points: props.points ?? 0,
      courses: props.courses ?? undefined
    }, id)

    return student
  }
}