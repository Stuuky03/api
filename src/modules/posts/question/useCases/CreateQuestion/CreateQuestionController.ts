import { GraphqlResponse, modelData } from "@/core/infra/GraphqlResponse";
import { CreateQuestion } from "./CreateQuestion";
import { Controller } from "@/core/infra/Controller";
import { QuestionModel } from "../../models/QuestionModel";

type CreateQuestionControllerRequest = {
  title: string;
  content: string
  createdAt: Date
  studentId: string
  isDraft: boolean
  courseId: string
  tags: string[]
}

export class CreateQuestionController implements Controller {
  constructor(
    private CreateQuestion: CreateQuestion
  ) { }

  async handle({
    title,
    content,
    createdAt,
    studentId,
    isDraft,
    courseId,
    tags }: CreateQuestionControllerRequest): Promise<GraphqlResponse<QuestionModel>> {
    const question = await this.CreateQuestion.execute({
      title,
      content,
      createdAt,
      studentId,
      isDraft,
      courseId,
      tags
    })

    return modelData(question)
  }
}