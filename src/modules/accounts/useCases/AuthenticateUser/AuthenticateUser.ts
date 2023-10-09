
import { IStudentRepository } from "../../repositories/IStudentRepository";

type TokenResponse = {
  token: string
}

type AuthenticateUserRequest = {
  email: string
  password: string
}

export class AuthenticateUser {
  constructor(private usersRepository: IStudentRepository) { }

  async execute({ email, password }: AuthenticateUserRequest): TokenResponse {
    const user = this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordValid = await user
  }
}