import { RegisterStudent } from "./RegisterStudent"
import { Controller } from '@/core/infra/Controller';
import { HttpResponse, clientError, created } from '@/core/infra/HttpResponse';

type RegisterStudentControllerRequest = {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export class RegisterStudentController implements Controller {
  constructor(
    private RegisterStudent: RegisterStudent
  ) { }

  async handle({ username, firstName, lastName, email, password }: RegisterStudentControllerRequest): Promise<HttpResponse> {
    try {
      await this.RegisterStudent.execute({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      return created();
    } catch (err: any) {
      return clientError(err);
    }
  }
}