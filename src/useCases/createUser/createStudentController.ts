import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateStudent } from "./createStudent"
import { z } from 'zod';

const createUserBody = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export class CreateStudentController {
  constructor(
    private CreateStudent: CreateStudent
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { username, email, password } = createUserBody.parse(request.body);

    try {
      await this.CreateStudent.execute({
        username,
        email,
        password,
      });

      return reply.status(201).send();
    } catch (err: any) {
      return reply.code(400).send({
        message: err.message || 'unexpected error.'
      });
    }
  }
}