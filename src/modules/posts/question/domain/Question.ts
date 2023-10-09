import { Entity } from "@/core/domain/Entity"
import { Student } from "@/modules/accounts/domain/Student"
import { Course } from "@/modules/course/domain/Course"
import { Tag } from "../../tag/domain/Tag"
import { Stuuke } from "@/modules/posts/stuuke/domain/Stuuke"

interface IQuestionProps {
  _id: string
  title: string
  content: string
  createdAt: string
  student: Student
  isDraft: boolean
  tags: Tag[]
  course: Course
  stuukes: Stuuke[]
}

export class Question extends Entity<IQuestionProps> {
  private constructor(props: IQuestionProps, id: string) {
    super(props, id)
  }

  public publish() {
    this.props.isDraft = false
  }

  static create(props: IQuestionProps, id: string): Question {
    const question = new Question(props, id)

    return question
  }
}