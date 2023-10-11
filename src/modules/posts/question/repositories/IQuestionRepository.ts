import { Question } from "../domain/Question";

export interface IQuestionRepository {
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
  getById(id: string): Promise<Question | null>
}