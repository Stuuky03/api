import { Entity } from "@/core/domain/Entity"

export type IQuestionTagProps = {
  questionId: string
  tagId: string
}

export class QuestionTag extends Entity<IQuestionTagProps> {
  get questionId() {
    return this.props.questionId
  }
  get tagId() {
    return this.props.tagId
  }

  private constructor(props: IQuestionTagProps, id?: string) {
    super(props, id)
  }

  static create(props: IQuestionTagProps, id?: string): QuestionTag {
    const questionTag = new QuestionTag(props, id)

    return questionTag
  }
}