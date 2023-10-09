export class Password {
  private readonly password: string

  constructor(password: string) {
    this.password = password
  }

  get value() {
    return this.password
  }

  public async comparePasswords(plainTextPassword: string): Promise<boolean> {
    return this.password === plainTextPassword
  }
}