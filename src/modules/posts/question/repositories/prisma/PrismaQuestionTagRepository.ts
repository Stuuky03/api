import { PrismaClient } from "@prisma/client";
import { IQuestionTagRepository } from "../IQuestionTagRepository";
import { createId } from "@paralleldrive/cuid2";
import { QuestionTag } from "../../domain/QuestionTag";

const prisma = new PrismaClient({
  log: ["query"]
})

export class PrismaQuestionTagRepository implements IQuestionTagRepository {
  async create(questionTag: QuestionTag): Promise<void | null> {

    const tagId = await prisma.tag.findFirst({
      where: {
        title: questionTag.tagId
      },
      select: {
        id: true
      }
    })

    if (tagId === null) return null

    await prisma.tagsOnPosts.create({
      data: {
        id: createId(),
        questionId: questionTag.questionId,
        tagId: tagId.id
      }
    })
  }
}