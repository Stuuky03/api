import { QuestionTag } from "../domain/QuestionTag";

export interface IQuestionTagRepository {
  create(questionTag: QuestionTag): Promise<void | null>
}