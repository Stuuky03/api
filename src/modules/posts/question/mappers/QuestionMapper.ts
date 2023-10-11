import { Question } from "../domain/Question";

export class QuestionMapper {
  static toPersistence(question: Question) {
    return {
      id: question.id,
      title: question.title,
      content: question.content,
      createdAt: question.createdAt,
      studentId: question.studentId,
      isDraft: question.isDraft,
      courseId: question.courseId
    }
  }
}