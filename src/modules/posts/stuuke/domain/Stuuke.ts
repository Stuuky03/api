import { Entity } from "@/core/domain/Entity"
import { Student } from "@/modules/accounts/domain/Student"
import { Course } from "@/modules/course/domain/Course"
import { Tag } from "../../tag/domain/Tag"
import { Question } from "@/modules/posts/question/domain/Question"

interface IStuukeProps {
  _id: string
  title: string
  content: string
  createdAt: Date
  student: Student
  isDraft: boolean
  tags: Tag[]
  course: Course
  question: Question
}

export class Stuuke extends Entity<IStuukeProps> {
  private constructor(props: IStuukeProps) {
    super(props)
  }

  public publish() {
    this.props.isDraft = false
  }

  static create(props: IStuukeProps): Stuuke {
    const stuuke = new Stuuke(props)

    return stuuke
  }
}