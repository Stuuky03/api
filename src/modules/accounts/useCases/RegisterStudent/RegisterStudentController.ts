import { RegisterStudent } from "./RegisterStudent"
import { Controller } from '@/core/infra/Controller';
import { GraphqlResponse, modelData } from "@/core/infra/GraphqlResponse";
import { created, clientError } from "@/core/infra/HttpResponse";
import { StudentModel } from "../../models/StudentModel";

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

  async handle({ username, firstName, lastName, email, password }: RegisterStudentControllerRequest): Promise<GraphqlResponse<StudentModel>> {
    try {
      const student = await this.RegisterStudent.execute({
        username,
        firstName,
        lastName,
        email,
        password,
      });

      return modelData(student)
    } catch (err: any) {
      return clientError(err);
    }
  }
}