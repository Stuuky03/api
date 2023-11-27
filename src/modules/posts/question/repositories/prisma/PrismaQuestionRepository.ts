import { PrismaClient } from "@prisma/client";
import { IQuestionRepository } from "../IQuestionRepository";
import { IQuestionTagRepository } from "../IQuestionTagRepository";
import { Question } from "../../domain/Question";
import { QuestionMapper } from "../../mappers/QuestionMapper";

const prisma = new PrismaClient({
  log: ["query"]
})

export class PrismaQuestionRepository implements IQuestionRepository {
  constructor(private prismaQuestionTagRepository: IQuestionTagRepository) { }

  async getById(id: string): Promise<Question | null> {
    const question = await prisma.question.findUnique({
      where: {
        id
      }
    })

    return QuestionMapper.toDomain(question)
  }

  async save(question: Question): Promise<void> {

  }

  async create(question: Question): Promise<void | null> {
    const data = QuestionMapper.toPersistence(question)

    try {

      const course = await prisma.course.findFirst({
        where: {
          title: data.courseId
        },
        select: {
          id: true
        }
      })

      if (course === null) return null
      console.log("course ID = ", course.id)

      await prisma.question.create({
        data: {
          id: data.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt,
          studentId: data.studentId,
          isDraft: data.isDraft,
          courseId: course.id
        }
      })

      question.tags.getItems().forEach(questionTag => {
        this.prismaQuestionTagRepository.create(questionTag)
      })

    } catch (err) {
      console.log("ERRO AO CRIAR QUESTÃO: " + err)
    }
  }
}