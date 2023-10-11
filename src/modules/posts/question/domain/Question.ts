import { Entity } from "@/core/domain/Entity"
import { QuestionTags } from "./QuestionTags"
import { QuestionTag } from "./QuestionTag"

interface IQuestionProps {
  title: string
  content: string
  createdAt: Date
  studentId: string
  isDraft: boolean
  tags?: QuestionTags
  courseId: string
}

export class Question extends Entity<IQuestionProps> {
  private constructor(props: IQuestionProps, id?: string) {
    super(props, id)
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get studentId() {
    return this.props.studentId;
  }

  get isDraft() {
    return this.props.isDraft;
  }

  get tags() {
    return this.props.tags;
  }

  get courseId() {
    return this.props.courseId;
  }

  public setTags(tags: QuestionTag[]) {
    this.props.tags = QuestionTags.create(tags)
  }

  public publish() {
    this.props.isDraft = false
  }

  static create(props: IQuestionProps, id?: string): Question {
    const question = new Question(props, id)

    return question
  }
}