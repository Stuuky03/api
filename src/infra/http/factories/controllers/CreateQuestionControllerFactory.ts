import { Controller } from "@/core/infra/Controller";
import { PrismaQuestionRepository } from "@/modules/posts/question/repositories/prisma/PrismaQuestionRepository";
import { PrismaQuestionTagRepository } from "@/modules/posts/question/repositories/prisma/PrismaQuestionTagRepository";
import { CreateQuestion } from "@/modules/posts/question/useCases/CreateQuestion/CreateQuestion";
import { CreateQuestionController } from "@/modules/posts/question/useCases/CreateQuestion/CreateQuestionController";

export function makeCreateQuestionController(): Controller {
  const prismaQuestionTagRepository = new PrismaQuestionTagRepository()
  const prismaQuestionRepository = new PrismaQuestionRepository(prismaQuestionTagRepository);
  const createQuestion = new CreateQuestion(prismaQuestionRepository);
  const createQuestionController = new CreateQuestionController(createQuestion);
  return createQuestionController;
}