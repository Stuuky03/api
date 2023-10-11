import { Question } from "../../domain/Question";
import { QuestionTag } from "../../domain/QuestionTag";
import { QuestionMapper } from "../../mappers/QuestionMapper";
import { IQuestionRepository } from "../../repositories/IQuestionRepository";
import { ICreateQuestionDTO } from "./CreateQuestionDTO";

export class CreateQuestion {
  constructor(private questionRepository: IQuestionRepository) { }

  async execute(data: ICreateQuestionDTO) {

    const question = Question.create({
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      studentId: data.studentId,
      isDraft: data.isDraft,
      courseId: data.courseId
    })

    const questionTags = data.tags.map(tagId => {
      return QuestionTag.create({
        tagId,
        questionId: question.id
      })
    })

    question.setTags(questionTags)

    await this.questionRepository.create(question)

    const persistedQuestion = QuestionMapper.toPersistence(question)

    return persistedQuestion
  }
}