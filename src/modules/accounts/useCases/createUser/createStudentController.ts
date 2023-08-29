import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateStudent } from "./createStudent"
import { z } from 'zod';
import { Controller } from '@/core/infra/Controller';
import { HttpResponse, clientError, created } from '@/core/infra/HttpResponse';

type CreateStudentControllerRequest = {
  username: string,
  email: string,
  password: string
}

export class CreateStudentController implements Controller {
  constructor(
    private CreateStudent: CreateStudent
  ) { }

  async handle({ username, email, password }: CreateStudentControllerRequest): Promise<HttpResponse> {

    try {
      await this.CreateStudent.execute({
        username,
        email,
        password,
      });

      return created();
    } catch (err: any) {
      return clientError(err);
    }
  }
}